import { Product } from "@/types"

export const product: Product = {
  id: "fall-limited-edition-sneakers",
  brand: "Sneaker Company",
  name: "Fall Limited Edition Sneakers",
  description:
    "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.",
  price: 125.0,
  originalPrice: 250.0,
  discount: 50,
  images: [
    {
      src: "/images/image-product-1.jpg",
      thumbnail: "/images/image-product-1-thumbnail.jpg",
      alt: "Fall Limited Edition Sneakers — front view on orange background",
    },
    {
      src: "/images/image-product-2.jpg",
      thumbnail: "/images/image-product-2-thumbnail.jpg",
      alt: "Fall Limited Edition Sneakers — side view on tan background",
    },
    {
      src: "/images/image-product-3.jpg",
      thumbnail: "/images/image-product-3-thumbnail.jpg",
      alt: "Fall Limited Edition Sneakers — top-down view on stone",
    },
    {
      src: "/images/image-product-4.jpg",
      thumbnail: "/images/image-product-4-thumbnail.jpg",
      alt: "Fall Limited Edition Sneakers — heel detail on stone",
    },
  ],
}
