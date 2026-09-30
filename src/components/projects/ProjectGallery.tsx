'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ProjectGalleryProps {
  images: GalleryImage[];
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = useCallback((idx: number) => {
    setActiveIdx(idx);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const prev = useCallback(
    () => setActiveIdx((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );

  const next = useCallback(
    () => setActiveIdx((i) => (i + 1) % images.length),
    [images.length],
  );

  // Sync isOpen → native dialog
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (isOpen) {
      el.showModal();
    } else if (el.open) {
      el.close();
    }
  }, [isOpen]);

  // Keyboard navigation inside the lightbox
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, prev, next]);

  // Close on backdrop click (click outside the inner panel)
  const handleDialogClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      const rect = dialogRef.current?.getBoundingClientRect();
      if (!rect) return;
      const { clientX: x, clientY: y } = e;
      if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
        close();
      }
    },
    [close],
  );

  if (!images.length) return null;

  return (
    <>
      {/* Thumbnail grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((img, idx) => (
          <button
            key={img.src}
            onClick={() => open(idx)}
            aria-label={`View image: ${img.alt}`}
            className="group relative aspect-video overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
            <span
              className="absolute inset-0 flex items-center justify-center bg-brand-dark/0 transition-colors group-hover:bg-brand-dark/40"
              aria-hidden="true"
            >
              <ZoomIn className="h-6 w-6 text-white opacity-0 transition-opacity group-hover:opacity-100" />
            </span>
            {img.caption && (
              <span className="absolute bottom-0 left-0 right-0 line-clamp-1 bg-brand-dark/70 px-2 py-1 text-xs text-white">
                {img.caption}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Native-dialog lightbox */}
      <dialog
        ref={dialogRef}
        onClose={close}
        onClick={handleDialogClick}
        className="w-full max-w-4xl rounded-xl bg-brand-dark p-0 shadow-2xl backdrop:bg-black/80 focus:outline-none"
      >
        <div className="relative flex flex-col">
          {/* Close button */}
          <button
            onClick={close}
            aria-label="Close image viewer"
            className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X size={18} aria-hidden="true" />
          </button>

          {/* Main image */}
          <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
            <Image
              src={images[activeIdx].src}
              alt={images[activeIdx].alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
          </div>

          {/* Caption + prev/next */}
          <div className="flex items-center gap-4 px-4 py-3">
            <button
              onClick={prev}
              aria-label="Previous image"
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>

            <div className="min-w-0 flex-1 text-center">
              {images[activeIdx].caption && (
                <p className="truncate text-sm text-white/80">{images[activeIdx].caption}</p>
              )}
              <p className="mt-0.5 text-xs text-white/50">
                {activeIdx + 1} / {images.length}
              </p>
            </div>

            <button
              onClick={next}
              aria-label="Next image"
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
