"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { ProductImage } from "@/types"
import { Lightbox } from "./Lightbox"

interface ProductImagesProps {
  images: ProductImage[]
}

export function ProductImages({ images }: ProductImagesProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const prev = () =>
    setSelectedIndex((i) => (i - 1 + images.length) % images.length)
  const next = () =>
    setSelectedIndex((i) => (i + 1) % images.length)

  return (
    <>
      {/* Desktop gallery */}
      <div className="hidden md:block">
        <button
          className="relative w-full rounded-2xl overflow-hidden aspect-square cursor-zoom-in block"
          onClick={() => setLightboxOpen(true)}
          aria-label="Open image lightbox"
        >
          <Image
            src={images[selectedIndex].src}
            alt={images[selectedIndex].alt}
            fill
            className="object-cover"
            priority
          />
        </button>

        <div className="flex gap-6 mt-8">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={cn(
                "relative aspect-square w-full rounded-xl overflow-hidden transition-opacity",
                i === selectedIndex
                  ? "ring-2 ring-orange"
                  : "hover:opacity-60"
              )}
              aria-label={`Select image ${i + 1}`}
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

      {/* Mobile carousel */}
      <div className="relative md:hidden w-full aspect-square overflow-hidden">
        <Image
          src={images[selectedIndex].src}
          alt={images[selectedIndex].alt}
          fill
          className="object-cover"
          priority
        />
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:text-orange transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-4 h-4 text-dark-blue" strokeWidth={3} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:text-orange transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-4 h-4 text-dark-blue" strokeWidth={3} />
        </button>
      </div>

      {lightboxOpen && (
        <Lightbox
          images={images}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  )
}
