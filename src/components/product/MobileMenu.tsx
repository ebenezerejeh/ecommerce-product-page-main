"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

interface MobileMenuProps {
  onClose: () => void
}

const navLinks = ["Collections", "Men", "Women", "About", "Contact"]

export function MobileMenu({ onClose }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      <div className="w-[250px] bg-white h-full px-6 pt-6 pb-10 flex flex-col">
        <button
          onClick={onClose}
          className="text-grayish-blue hover:text-dark-blue transition-colors mb-14 self-start"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
        <nav className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-dark-blue font-bold text-lg hover:text-dark-grey transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex-1 bg-black/75" onClick={onClose} />
    </div>
  )
}
