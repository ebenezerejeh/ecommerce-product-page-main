"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ShoppingCart, Menu } from "lucide-react"
import { useCart } from "@/contexts/cartContext"
import { Cart } from "@/components/product/Cart"
import { MobileMenu } from "@/components/product/MobileMenu"

const navLinks = ["Collections", "Men", "Women", "About", "Contact"]

export function Navbar() {
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalItems } = useCart()
  const cartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cartOpen) return
    const handler = (e: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
        setCartOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [cartOpen])

  return (
    <>
      <header className="border-b border-grayish-blue/30">
        <nav className="max-w-[1110px] mx-auto px-6 flex items-center h-[70px] md:h-[89px] gap-4 md:gap-14">
          {/* Hamburger — mobile only */}
          <button
            className="md:hidden text-dark-grey hover:text-dark-blue transition-colors"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/images/logo.svg"
              alt="Sneakers"
              width={138}
              height={20}
              priority
            />
          </div>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-8 h-full flex-1">
            {navLinks.map((link) => (
              <li key={link} className="h-full flex items-center relative group">
                <a
                  href="#"
                  className="text-dark-grey hover:text-dark-blue transition-colors text-[15px]"
                >
                  {link}
                </a>
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-orange opacity-0 group-hover:opacity-100 transition-opacity rounded-t-sm" />
              </li>
            ))}
          </ul>

          {/* Right — cart + avatar */}
          <div className="ml-auto md:ml-0 flex items-center gap-5 md:gap-8">
            <div ref={cartRef} className="relative">
              <button
                onClick={() => setCartOpen((o) => !o)}
                className="relative text-dark-grey hover:text-dark-blue transition-colors pt-1"
                aria-label={`Cart, ${totalItems} items`}
              >
                <ShoppingCart className="w-[22px] h-[22px]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-orange text-white text-[10px] font-bold min-w-[18px] h-[14px] flex items-center justify-center rounded-full px-1 leading-none">
                    {totalItems}
                  </span>
                )}
              </button>
              {cartOpen && <Cart />}
            </div>

            <button
              className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden ring-2 ring-transparent hover:ring-orange transition-all"
              aria-label="User profile"
            >
              <Image
                src="/images/image-avatar.png"
                alt="User avatar"
                fill
                className="object-cover"
              />
            </button>
          </div>
        </nav>
      </header>

      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
    </>
  )
}
