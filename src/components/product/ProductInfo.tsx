"use client"

import { useState } from "react"
import { ShoppingCart, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { useCart } from "@/contexts/cartContext"
import { Product } from "@/types"

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(0)
  const { addItem } = useCart()

  const decrement = () => setQuantity((q) => Math.max(0, q - 1))
  const increment = () => setQuantity((q) => q + 1)

  const handleAddToCart = () => {
    addItem(product, quantity)
    setQuantity(0)
  }

  return (
    <div className="px-6 py-10 md:px-0 md:py-0">
      <p className="text-orange font-bold text-sm tracking-widest uppercase mb-4 md:mb-5">
        {product.brand}
      </p>

      <h1 className="text-dark-blue font-bold text-[28px] md:text-[44px] leading-tight mb-4 md:mb-8">
        {product.name}
      </h1>

      <p className="text-dark-grey leading-relaxed mb-6 md:mb-8">
        {product.description}
      </p>

      {/* Pricing — stacked on mobile row, column on desktop */}
      <div className="flex items-center justify-between md:flex-col md:items-start md:gap-2 mb-6 md:mb-8">
        <div className="flex items-center gap-4">
          <span className="text-dark-blue font-bold text-[28px]">
            ${product.price.toFixed(2)}
          </span>
          <Badge>{product.discount}%</Badge>
        </div>
        <span className="text-grayish-blue font-bold line-through text-base">
          ${product.originalPrice.toFixed(2)}
        </span>
      </div>

      {/* Quantity + Add to cart */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex items-center justify-between bg-light-grey rounded-xl px-6 py-5 md:w-40 flex-shrink-0">
          <button
            onClick={decrement}
            className="text-orange hover:opacity-60 transition-opacity"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" strokeWidth={3} />
          </button>
          <span className="text-dark-blue font-bold text-base w-8 text-center">
            {quantity}
          </span>
          <button
            onClick={increment}
            className="text-orange hover:opacity-60 transition-opacity"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={3} />
          </button>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={quantity === 0}
          className="flex-1 shadow-[0_20px_50px_-20px_#FF7D1A]"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to cart
        </Button>
      </div>
    </div>
  )
}
