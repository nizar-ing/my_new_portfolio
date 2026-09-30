/**
 * optimize-images.mjs
 *
 * Run once (or whenever source images change):
 *   node scripts/optimize-images.mjs
 *
 * Requires: npm install --save-dev sharp
 *
 * What it does:
 *  - Converts real source images to WebP (quality 80, max 1920 px wide)
 *  - Downloads ClinAnnotate gallery images from the GitHub repo (MIT)
 *  - Generates branded SVG covers for projects without real screenshots
 */

import sharp from 'sharp';
import { mkdir, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const WORKSPACE = join(REPO_ROOT, '..');
const PUBLIC = join(REPO_ROOT, 'public');

const Q = 80;       // WebP quality
const W = 1920;     // max width

// ── helpers ──────────────────────────────────────────────────────────────────

async function ensureDir(p) {
  await mkdir(p, { recursive: true });
}

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function toWebP(src, dest, opts = {}) {
  await ensureDir(dirname(dest));
  const pipeline = sharp(src).resize({ width: opts.width ?? W, withoutEnlargement: true });
  if (opts.cropHeight) {
    // crop to 16:9 from top
    const meta = await sharp(src).metadata();
    const w = Math.min(meta.width, opts.width ?? W);
    pipeline.resize({ width: w, height: Math.round(w * 9 / 16), fit: 'cover', position: 'top' });
  }
  await pipeline.webp({ quality: Q }).toFile(dest);
  console.log('✓', dest.replace(REPO_ROOT, ''));
}

async function svgToWebP(svg, dest, width = 1200, height = 630) {
  await ensureDir(dirname(dest));
  await sharp(Buffer.from(svg))
    .resize(width, height)
    .webp({ quality: Q })
    .toFile(dest);
  console.log('✓', dest.replace(REPO_ROOT, ''));
}

async function downloadWebP(url, dest) {
  await ensureDir(dirname(dest));
  if (await exists(dest)) { console.log('skip (exists)', dest.replace(REPO_ROOT, '')); return; }
  console.log('↓ downloading', url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await sharp(buf).resize({ width: W, withoutEnlargement: true }).webp({ quality: Q }).toFile(dest);
  console.log('✓', dest.replace(REPO_ROOT, ''));
}

// ── SVG templates ─────────────────────────────────────────────────────────────

function architectureCoverSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" font-family="system-ui,sans-serif">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#223740"/>
      <stop offset="100%" stop-color="#0f1b1e"/>
    </linearGradient>
    <linearGradient id="acc" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#48AFDE" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#48AFDE" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#acc)"/>

  <!-- Title block -->
  <text x="60" y="72" font-size="14" fill="#48AFDE" letter-spacing="3" font-weight="600">OCTOBANK</text>
  <text x="60" y="110" font-size="36" fill="#ffffff" font-weight="700">Cloud-native microservices</text>
  <text x="60" y="148" font-size="36" fill="#48AFDE" font-weight="700">for a licensed digital bank</text>
  <text x="60" y="185" font-size="16" fill="#7aa8b8">Java 17 · Spring Boot 3 · Kafka · Resilience4j · GKE · LGTM</text>

  <!-- Divider -->
  <line x1="60" y1="210" x2="1140" y2="210" stroke="#48AFDE" stroke-width="1" stroke-opacity="0.3"/>

  <!-- Architecture boxes -->
  <!-- API Gateway -->
  <rect x="60" y="245" width="200" height="70" rx="8" fill="#48AFDE" fill-opacity="0.15" stroke="#48AFDE" stroke-width="1.5"/>
  <text x="160" y="278" font-size="14" fill="#48AFDE" font-weight="700" text-anchor="middle">API Gateway</text>
  <text x="160" y="298" font-size="11" fill="#7aa8b8" text-anchor="middle">Auth · Rate limit</text>

  <!-- Arrow -->
  <line x1="260" y1="280" x2="320" y2="280" stroke="#48AFDE" stroke-width="1.5" stroke-opacity="0.6" marker-end="url(#arr)"/>

  <!-- Services column -->
  <rect x="320" y="225" width="190" height="60" rx="8" fill="#48AFDE" fill-opacity="0.12" stroke="#48AFDE" stroke-width="1.5"/>
  <text x="415" y="253" font-size="13" fill="#ffffff" font-weight="600" text-anchor="middle">Account Service</text>
  <text x="415" y="272" font-size="11" fill="#7aa8b8" text-anchor="middle">Spring Boot 3 · JPA</text>

  <rect x="320" y="298" width="190" height="60" rx="8" fill="#48AFDE" fill-opacity="0.12" stroke="#48AFDE" stroke-width="1.5"/>
  <text x="415" y="326" font-size="13" fill="#ffffff" font-weight="600" text-anchor="middle">Payment Service</text>
  <text x="415" y="345" font-size="11" fill="#7aa8b8" text-anchor="middle">Resilience4j · Stripe</text>

  <rect x="320" y="371" width="190" height="60" rx="8" fill="#48AFDE" fill-opacity="0.12" stroke="#48AFDE" stroke-width="1.5"/>
  <text x="415" y="399" font-size="13" fill="#ffffff" font-weight="600" text-anchor="middle">Notification Service</text>
  <text x="415" y="418" font-size="11" fill="#7aa8b8" text-anchor="middle">Async · Email</text>

  <!-- Kafka bus -->
  <rect x="550" y="265" width="130" height="130" rx="8" fill="#223740" stroke="#48AFDE" stroke-width="2"/>
  <text x="615" y="320" font-size="15" fill="#48AFDE" font-weight="700" text-anchor="middle">Kafka</text>
  <text x="615" y="340" font-size="11" fill="#7aa8b8" text-anchor="middle">Event backbone</text>
  <text x="615" y="358" font-size="11" fill="#7aa8b8" text-anchor="middle">Audit trails</text>

  <!-- DB -->
  <rect x="720" y="245" width="160" height="70" rx="8" fill="#48AFDE" fill-opacity="0.12" stroke="#48AFDE" stroke-width="1.5"/>
  <text x="800" y="278" font-size="13" fill="#ffffff" font-weight="600" text-anchor="middle">PostgreSQL</text>
  <text x="800" y="297" font-size="11" fill="#7aa8b8" text-anchor="middle">GKE · Helm</text>

  <!-- LGTM panel -->
  <rect x="920" y="225" width="220" height="210" rx="10" fill="#0f1b1e" stroke="#48AFDE" stroke-width="1.5" stroke-opacity="0.6"/>
  <text x="1030" y="255" font-size="13" fill="#48AFDE" font-weight="700" text-anchor="middle">Observability (LGTM)</text>
  <text x="1030" y="282" font-size="12" fill="#7aa8b8" text-anchor="middle">Loki — logs</text>
  <text x="1030" y="304" font-size="12" fill="#7aa8b8" text-anchor="middle">Grafana — dashboards</text>
  <text x="1030" y="326" font-size="12" fill="#7aa8b8" text-anchor="middle">Tempo — tracing</text>
  <text x="1030" y="348" font-size="12" fill="#7aa8b8" text-anchor="middle">Mimir — metrics</text>
  <text x="1030" y="370" font-size="12" fill="#7aa8b8" text-anchor="middle">Prometheus</text>
  <text x="1030" y="392" font-size="12" fill="#7aa8b8" text-anchor="middle">Zero-downtime on GKE</text>
  <text x="1030" y="414" font-size="11" fill="#48AFDE" fill-opacity="0.7" text-anchor="middle">Under NDA — architecture only</text>

  <!-- Connecting lines (rough) -->
  <line x1="510" y1="280" x2="550" y2="305" stroke="#48AFDE" stroke-width="1" stroke-opacity="0.5" stroke-dasharray="4"/>
  <line x1="510" y1="328" x2="550" y2="330" stroke="#48AFDE" stroke-width="1" stroke-opacity="0.5" stroke-dasharray="4"/>
  <line x1="510" y1="401" x2="550" y2="365" stroke="#48AFDE" stroke-width="1" stroke-opacity="0.5" stroke-dasharray="4"/>
  <line x1="680" y1="310" x2="720" y2="290" stroke="#48AFDE" stroke-width="1" stroke-opacity="0.5" stroke-dasharray="4"/>

  <!-- NDA badge -->
  <rect x="60" y="490" width="140" height="32" rx="16" fill="#48AFDE" fill-opacity="0.15" stroke="#48AFDE" stroke-width="1"/>
  <text x="130" y="511" font-size="13" fill="#48AFDE" text-anchor="middle">Under NDA</text>

  <!-- octobank.uz -->
  <text x="1140" y="590" font-size="13" fill="#48AFDE" text-anchor="end" fill-opacity="0.7">octobank.uz</text>
</svg>`;
}

function apiCoverSvg({ title, tagline, endpoints, stack }) {
  const endpointLines = endpoints.map((e, i) =>
    `<tspan x="80" dy="${i === 0 ? 0 : 28}">${e}</tspan>`
  ).join('');
  const stackBadges = stack.map((s, i) => {
    const x = 640 + (i % 3) * 160;
    const y = 280 + Math.floor(i / 3) * 50;
    return `<rect x="${x}" y="${y}" width="140" height="32" rx="6" fill="#48AFDE" fill-opacity="0.15" stroke="#48AFDE" stroke-width="1"/>
<text x="${x + 70}" y="${y + 21}" font-size="13" fill="#48AFDE" text-anchor="middle" font-weight="600">${s}</text>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" font-family="system-ui,sans-serif">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#0f1b1e"/>
      <stop offset="100%" stop-color="#223740"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Accent bar -->
  <rect x="0" y="0" width="6" height="630" fill="#48AFDE"/>

  <!-- Title -->
  <text x="60" y="68" font-size="13" fill="#48AFDE" letter-spacing="3" font-weight="600">REST API</text>
  <text x="60" y="108" font-size="32" fill="#ffffff" font-weight="700">${title}</text>
  <text x="60" y="144" font-size="16" fill="#7aa8b8">${tagline}</text>
  <line x1="60" y1="168" x2="580" y2="168" stroke="#48AFDE" stroke-width="1" stroke-opacity="0.3"/>

  <!-- Endpoints panel -->
  <rect x="60" y="188" width="520" height="${28 * endpoints.length + 32}" rx="8" fill="#223740" fill-opacity="0.6"/>
  <text x="80" y="215" font-size="13" fill="#48AFDE" font-weight="700">Endpoints</text>
  <text x="80" y="245" font-size="13" fill="#7aa8b8" font-family="monospace">
    ${endpointLines}
  </text>

  <!-- Stack badges -->
  <text x="640" y="255" font-size="13" fill="#48AFDE" font-weight="700" letter-spacing="2">STACK</text>
  ${stackBadges}
</svg>`;
}

function placeholderCoverSvg({ title, stack }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" font-family="system-ui,sans-serif">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#EEF7FB"/>
      <stop offset="100%" stop-color="#E0F3FD"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="6" height="630" fill="#48AFDE"/>
  <text x="60" y="280" font-size="42" fill="#223740" font-weight="800">${title}</text>
  <text x="60" y="330" font-size="18" fill="#47626D">${stack}</text>
  <text x="60" y="400" font-size="14" fill="#47626D" fill-opacity="0.5">Screenshot pending — run capture-screenshots.mjs</text>
</svg>`;
}

// ── main ──────────────────────────────────────────────────────────────────────

async function run() {
  console.log('\n=== optimize-images.mjs ===\n');

  // ── Profile photos ──────────────────────────────────────────────────────────
  const nizarSrc = join(WORKSPACE, 'nizar.png');
  if (await exists(nizarSrc)) {
    await ensureDir(join(PUBLIC, 'images/profile'));
    const meta = await sharp(nizarSrc).metadata();
    const origH = meta.height ?? 1200;

    // Hero: portrait crop keeping the top 72 % (face + upper body); resize to 600 px wide
    const heroHeight = Math.round(origH * 0.72);
    await sharp(nizarSrc)
      .extract({ left: 0, top: 0, width: meta.width ?? 600, height: heroHeight })
      .resize({ width: 600, withoutEnlargement: true })
      .webp({ quality: 88 })
      .toFile(join(PUBLIC, 'images/profile/nizar-hero.webp'));
    console.log('✓ public/images/profile/nizar-hero.webp  (face-focused crop from nizar.png)');

    // About: full portrait, resize to max 1200 px tall, preserve ratio
    await sharp(nizarSrc)
      .resize({ height: 1200, withoutEnlargement: true })
      .webp({ quality: Q })
      .toFile(join(PUBLIC, 'images/profile/nizar-about.webp'));
    console.log('✓ public/images/profile/nizar-about.webp');
  } else {
    console.warn('⚠  ../nizar.png not found — skipping profile images');
  }

  // ── ClinAnnotate ────────────────────────────────────────────────────────────
  const clinSrc = join(WORKSPACE, 'ClinAnnotate.jpg');
  if (await exists(clinSrc)) {
    // Cover: 16:9 crop from top (removes the candidate-badge watermark at bottom-left)
    await ensureDir(join(PUBLIC, 'images/projects/clinannotate'));
    const { width: cropW } = await sharp(clinSrc).metadata();
    await sharp(clinSrc)
      .resize({ width: Math.min(cropW, W), height: Math.round(Math.min(cropW, W) * 9 / 16), fit: 'cover', position: 'top' })
      .webp({ quality: Q })
      .toFile(join(PUBLIC, 'images/projects/clinannotate/cover.webp'));
    console.log('✓ public/images/projects/clinannotate/cover.webp  (16:9 crop, badge removed)');

    // Full image → gallery slot 00 (for detail page)
    await sharp(clinSrc)
      .resize({ width: W, withoutEnlargement: true })
      .webp({ quality: Q })
      .toFile(join(PUBLIC, 'images/projects/clinannotate/00.webp'));
    console.log('✓ public/images/projects/clinannotate/00.webp  (full image with badge)');
  } else {
    console.warn('⚠  ../ClinAnnotate.jpg not found — skipping clinannotate cover');
  }

  // ClinAnnotate gallery images
  // 01 — real landing page screenshot from the MIT-licensed GitHub repo (branch: master)
  await downloadWebP(
    'https://raw.githubusercontent.com/nizar-ing/clinical-audio-annotation-tool/master/apps/web/src/assets/images/landing_page_image.png',
    join(PUBLIC, 'images/projects/clinannotate/01.webp'),
  ).catch((e) => console.warn(`⚠  clinannotate/01.webp download failed: ${e.message}`));

  // 02 & 03 — architecture diagrams not yet in the repo; use branded placeholders
  // Replace these when you add docs/images/ to the clinical-audio-annotation-tool repo.
  for (const [slot, label] of [['02', 'Architecture diagram'], ['03', 'DDD approach diagram']]) {
    const dest = join(PUBLIC, `images/projects/clinannotate/${slot}.webp`);
    if (!(await exists(dest))) {
      await svgToWebP(
        placeholderCoverSvg({ title: `ClinAnnotate — ${label}`, stack: 'Add to docs/images/ in the GitHub repo' }),
        dest,
      );
    }
  }

  // ── AllezGoo — placeholder (real screenshots via capture-screenshots.mjs) ──
  const allezDest = join(PUBLIC, 'images/projects/allezgoo/cover.webp');
  if (!(await exists(allezDest))) {
    await svgToWebP(
      placeholderCoverSvg({ title: 'AllezGoo', stack: 'React 19 · NestJS · TanStack Query · Tailwind v4' }),
      allezDest,
    );
    console.log('  (run capture-screenshots.mjs to replace with a real screenshot)');
  }

  // ── Octobank — architecture illustration ────────────────────────────────────
  await svgToWebP(architectureCoverSvg(), join(PUBLIC, 'images/projects/octobank/cover.webp'));

  // ── Clean DDD E-Commerce API ─────────────────────────────────────────────────
  await svgToWebP(
    apiCoverSvg({
      title: 'Clean DDD E-Commerce API',
      tagline: 'NestJS 11 · CQRS · DDD · Clean Architecture · Stripe Checkout',
      endpoints: [
        'POST   /api/orders',
        'GET    /api/orders/:id',
        'POST   /api/products',
        'POST   /api/webhooks/stripe',
        'GET    /api/categories',
        'POST   /api/auth/login',
      ],
      stack: ['NestJS', 'TypeScript', 'Drizzle', 'PostgreSQL', 'MongoDB', 'Stripe', 'Jest'],
    }),
    join(PUBLIC, 'images/projects/clean-ddd-ecommerce-api/cover.webp'),
  );

  // ── Clinic Booking Appointments API ─────────────────────────────────────────
  await svgToWebP(
    apiCoverSvg({
      title: 'Clinic Booking API',
      tagline: 'Express 5 · Prisma 7 · JWT RBAC · Zod · OpenAPI 3',
      endpoints: [
        'GET    /api/doctors',
        'GET    /api/doctors/:id/slots',
        'POST   /api/appointments',
        'PATCH  /api/appointments/:id/cancel',
        'GET    /api/admin/reports',
        'POST   /api/auth/register',
      ],
      stack: ['Node.js', 'Express 5', 'Prisma', 'PostgreSQL', 'Zod', 'JWT', 'Swagger'],
    }),
    join(PUBLIC, 'images/projects/clinic-booking-api/cover.webp'),
  );

  // ── Hotel Booking ────────────────────────────────────────────────────────────
  await svgToWebP(
    placeholderCoverSvg({ title: 'Hotel Booking Platform', stack: 'Spring Boot 3 · React · Stripe · MySQL' }),
    join(PUBLIC, 'images/projects/hotel-booking/cover.webp'),
  );

  // ── The Wild Oasis ───────────────────────────────────────────────────────────
  await svgToWebP(
    placeholderCoverSvg({ title: 'The Wild Oasis', stack: 'React · Supabase · TanStack Query · Recharts' }),
    join(PUBLIC, 'images/projects/the-wild-oasis/cover.webp'),
  );

  // ── E-Shop (from existing e-store.png) ───────────────────────────────────────
  const eStoreSrc = join(PUBLIC, 'e-store.png');
  if (await exists(eStoreSrc)) {
    await toWebP(eStoreSrc, join(PUBLIC, 'images/projects/e-shop/cover.webp'));
  } else {
    await svgToWebP(
      placeholderCoverSvg({ title: 'E-Shop', stack: 'React 19 · TanStack Query · Tailwind v4 · Vite' }),
      join(PUBLIC, 'images/projects/e-shop/cover.webp'),
    );
  }

  // ── Testing React Apps ───────────────────────────────────────────────────────
  await svgToWebP(
    placeholderCoverSvg({ title: 'Testing React Apps', stack: 'Vitest · RTL · MSW · Auth0 · Redux Toolkit' }),
    join(PUBLIC, 'images/projects/testing-react-app/cover.webp'),
  );

  // ── Students Management ──────────────────────────────────────────────────────
  await svgToWebP(
    placeholderCoverSvg({ title: 'Students Management', stack: 'Spring Boot 3 · Angular 17 · MySQL · JWT' }),
    join(PUBLIC, 'images/projects/students-management/cover.webp'),
  );

  // ── WorldWise (existing world-wise.png) ─────────────────────────────────────
  const worldSrc = join(PUBLIC, 'world-wise.png');
  if (await exists(worldSrc)) {
    await toWebP(worldSrc, join(PUBLIC, 'images/projects/world-wise/cover.webp'));
  }

  // ── Games Discovery (existing games-descovery.png — note the typo in source) ─
  const gamesSrc = join(PUBLIC, 'games-descovery.png');
  if (await exists(gamesSrc)) {
    await toWebP(gamesSrc, join(PUBLIC, 'images/projects/games-discovery/cover.webp'));
  }

  console.log('\n=== Done ===\n');
  console.log('AllezGoo placeholder is in place.');
  console.log('Run "node scripts/capture-screenshots.mjs" to capture real AllezGoo screenshots.\n');
}

run().catch((err) => { console.error(err); process.exit(1); });
