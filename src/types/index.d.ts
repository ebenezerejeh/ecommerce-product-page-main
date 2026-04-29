export interface ProductImage {
  src: string
  thumbnail: string
  alt: string
}

export interface Product {
  id: string
  brand: string
  name: string
  description: string
  price: number
  originalPrice: number
  discount: number
  images: ProductImage[]
}

export interface CartItem {
  product: Product
  quantity: number
}
