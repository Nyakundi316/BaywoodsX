import { notFound } from "next/navigation";

const productData: Record<string, {
  name: string;
  price: string;
  description: string;
  image: string;
}> = {
  "nike-air-max": {
    name: "Nike Air Max",
    price: "KES 17,999",
    description: "Stylish, lightweight and durable sneakers designed for all-day comfort and performance.",
    image: "https://images.unsplash.com/photo-1600185365137-0fbb4f79aa62?auto=format&fit=crop&w=800&q=80"
  },
  "new-era-cap": {
    name: "New Era Cap",
    price: "KES 4,800",
    description: "Classic New Era cap with structured fit and adjustable strap. Perfect for everyday streetwear.",
    image: "https://images.unsplash.com/photo-1584811914966-19566cfe638b?auto=format&fit=crop&w=800&q=80"
  },
  "gym-hoodie": {
    name: "Gym Hoodie",
    price: "KES 6,500",
    description: "Premium cotton hoodie designed for performance, comfort, and post-workout wear.",
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc06b?auto=format&fit=crop&w=800&q=80"
  },
  "sweatpants": {
    name: "Sweatpants",
    price: "KES 7,200",
    description: "Relaxed-fit sweatpants crafted for comfort and movement. Ideal for gym, street, or lounge.",
    image: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0642?auto=format&fit=crop&w=800&q=80"
  }
};

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  const product = productData[params.slug];

  if (!product) return notFound();

  return (
    <div className="min-h-screen bg-white text-black px-6 py-12">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-xl w-full h-auto object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-black mb-6">{product.price}</p>
          <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-900">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
