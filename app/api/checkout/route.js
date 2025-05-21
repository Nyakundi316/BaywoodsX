import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: body.items.map(item => ({
      price_data: {
        currency: "kes",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: parseInt(item.price.replace("KES ", "")) * 100,
      },
      quantity: item.quantity,
    })),
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
  });

  return new Response(JSON.stringify({ url: session.url }), {
    status: 200,
  });
}
