"use client"

import { useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { ProductImage } from "@/types"

interface LightboxProps {
  images: ProductImage[]
  selectedIndex: number
  onSelect: (index: number) => void
  onClose: () => void
}

export function Lightbox({
  images,
  selectedIndex,
  onSelect,
  onClose,
}: LightboxProps) {
  const prev = () =>
    onSelect((selectedIndex - 1 + images.length) % images.length)
  const next = () => onSelect((selectedIndex + 1) % images.length)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [selectedIndex])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/75" onClick={onClose} />
      <div className="relative z-10 w-full max-w-[550px]">
        {/* Close button */}
        <div className="flex justify-end mb-5">
          <button
            onClick={onClose}
            className="text-white hover:text-orange transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main image with prev/next */}
        <div className="relative rounded-2xl overflow-hidden aspect-square">
          <Image
            src={images[selectedIndex].src}
            alt={images[selectedIndex].alt}
            fill
            className="object-cover"
            priority
          />
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-14 h-14 flex items-center justify-center hover:text-orange transition-colors z-10 shadow-md"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 text-dark-blue" strokeWidth={3} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-14 h-14 flex items-center justify-center hover:text-orange transition-colors z-10 shadow-md"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 text-dark-blue" strokeWidth={3} />
          </button>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-6 mt-8 justify-center">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={cn(
                "relative aspect-square w-[88px] rounded-xl overflow-hidden transition-opacity",
                i === selectedIndex
                  ? "ring-2 ring-orange opacity-100"
                  : "hover:opacity-75"
              )}
              aria-label={`View image ${i + 1}`}
            >
              {i === selectedIndex && (
                <div className="absolute inset-0 bg-white/60 z-10 rounded-xl" />
              )}
              <Image
                src={img.thumbnail}
                alt={img.alt}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
