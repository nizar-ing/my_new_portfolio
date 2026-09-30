/**
 * capture-screenshots.mjs
 *
 * Run locally (NOT in CI) to capture real screenshots of live sites:
 *   node scripts/capture-screenshots.mjs
 *
 * Requires Playwright to be installed:
 *   npx playwright install chromium
 *
 * Then run:  node scripts/capture-screenshots.mjs
 * Then run:  node scripts/optimize-images.mjs   (to re-process into WebP)
 *
 * The script writes PNGs to scripts/captures/ first,
 * then copies them into public/images/projects/.
 */

import { chromium } from 'playwright';
import { mkdir, copyFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const CAPTURES = join(__dirname, 'captures');
const PUBLIC = join(REPO_ROOT, 'public', 'images', 'projects');

await mkdir(CAPTURES, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

// ── AllezGoo ─────────────────────────────────────────────────────────────────
console.log('Capturing allezgoo.com …');
await page.goto('https://allezgoo.com', { waitUntil: 'networkidle', timeout: 30_000 });

// Accept cookie banner if present
const cookieBtn = page.locator('button:has-text("Accept"), button:has-text("Accepter"), button:has-text("OK")').first();
if (await cookieBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
  await cookieBtn.click();
  await page.waitForTimeout(500);
}

await page.screenshot({ path: join(CAPTURES, 'allezgoo-home.png'), fullPage: false });
console.log('✓ allezgoo-home.png');

// Attempt to capture search results (optional)
try {
  await page.goto('https://allezgoo.com', { waitUntil: 'networkidle' });
  // Try filling in a search if there's a search form
  const searchInput = page.locator('input[type="search"], input[placeholder*="earch"], input[placeholder*="estination"]').first();
  if (await searchInput.isVisible({ timeout: 3000 }).catch(() => false)) {
    await searchInput.fill('Paris');
    await page.keyboard.press('Enter');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: join(CAPTURES, 'allezgoo-search.png'), fullPage: false });
    console.log('✓ allezgoo-search.png');
  }
} catch (e) {
  console.warn('⚠  Search results capture skipped:', e.message);
}

await browser.close();

// ── Copy captures → public/images/projects ───────────────────────────────────
await mkdir(join(PUBLIC, 'allezgoo'), { recursive: true });

const copies = [
  ['allezgoo-home.png', 'allezgoo/cover-src.png'],
  ['allezgoo-search.png', 'allezgoo/01-src.png'],
];
for (const [src, dest] of copies) {
  const srcPath = join(CAPTURES, src);
  const destPath = join(PUBLIC, dest);
  try {
    await copyFile(srcPath, destPath);
    console.log(`copied → public/images/projects/${dest}`);
  } catch {
    // file may not exist (optional captures)
  }
}

console.log('\nDone. Now run: node scripts/optimize-images.mjs');
console.log('It will convert the -src.png files to optimized .webp covers.\n');
