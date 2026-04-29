"use client"

import Image from "next/image"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useCart } from "@/contexts/cartContext"

export function Cart() {
  const { items, removeItem } = useCart()

  return (
    <div className="absolute top-full right-0 mt-6 w-[360px] max-w-[calc(100vw-1.5rem)] bg-white rounded-xl shadow-2xl z-50 overflow-hidden">
      <div className="px-6 py-5 border-b border-grayish-blue/30">
        <h2 className="font-bold text-dark-blue">Cart</h2>
      </div>
      <div className="p-6">
        {items.length === 0 ? (
          <p className="text-dark-grey font-bold text-center py-8">
            Your cart is empty.
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.product.images[0].thumbnail}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-dark-grey text-sm truncate">
                    {item.product.name}
                  </p>
                  <p className="text-dark-grey text-sm mt-0.5">
                    ${item.product.price.toFixed(2)} x {item.quantity}{" "}
                    <span className="text-dark-blue font-bold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="text-grayish-blue hover:text-dark-blue transition-colors flex-shrink-0"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <Button className="w-full mt-2">Checkout</Button>
          </div>
        )}
      </div>
    </div>
  )
}
