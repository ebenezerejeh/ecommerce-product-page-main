import { Navbar } from "@/components/layout/Navbar"
import { ProductImages } from "@/components/product/ProductImages"
import { ProductInfo } from "@/components/product/ProductInfo"
import { product } from "@/utils/productData"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-[1110px] mx-auto md:px-6 md:py-24 md:grid md:grid-cols-2 md:gap-28 md:items-center">
        <ProductImages images={product.images} />
        <ProductInfo product={product} />
      </div>
    </main>
  )
}
