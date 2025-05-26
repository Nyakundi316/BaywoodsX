"use client";

import Image from "next/image";

export default function LookbookPage() {
  return (
    <section className="bg-white text-black py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            The Baywoods Look
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover how real people wear Baywoods. Captured at real events, on the streets, and in style.
          </p>
        </div>

        {/* Scrollable Gallery */}
        <div className="overflow-x-auto flex gap-6 pb-4 px-1 scrollbar-hide snap-x">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              className="snap-start min-w-[280px] sm:min-w-[320px] h-[450px] relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <Image
                src={`https://images.pexels.com/photos/${100000 + i}/pexels-photo-${100000 + i}.jpeg?auto=compress&cs=tinysrgb&h=750&w=500`}

                alt={`Baywoods Look ${i}`}
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-semibold mb-4">Want to be featured?</h2>
          <p className="text-gray-600 mb-6">Tag us on Instagram with <span className="font-medium">#BaywoodsLook</span> or submit your photo to be included in our lookbook.</p>
          <button className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition duration-300">
            Submit Your Look
          </button>
        </div>
      </div>
    </section>
  );
}
