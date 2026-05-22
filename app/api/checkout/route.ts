import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { type, profile, scholarshipId } = await req.json();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://easyscho.com";
    const apiKey    = process.env.LEMONSQUEEZY_API_KEY!;
    const storeId   = process.env.LEMONSQUEEZY_STORE_ID!;
    const variantId = type === "match" ? process.env.LEMONSQUEEZY_VARIANT_MATCH! : process.env.LEMONSQUEEZY_VARIANT_LETTER!;
    if (!apiKey || !storeId || !variantId) {
      return NextResponse.json({ error: "Payment not configured yet" }, { status: 503 });
    }
    const successPath = type === "match" ? "match" : "letter";
    const res = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            product_options: { redirect_url: `${appUrl}/${successPath}?order_id={order_id}` },
            checkout_options: { embed: false, media: false, logo: true },
            checkout_data: { custom: { type, profile: JSON.stringify(profile), scholarshipId: scholarshipId || "" } },
          },
          relationships: {
            store: { data: { type: "stores", id: storeId } },
            variant: { data: { type: "variants", id: variantId } },
          },
        },
      }),
    });
    if (!res.ok) { const err = await res.text(); console.error("Lemon Squeezy error:", err); return NextResponse.json({ error: "Checkout creation failed" }, { status: 500 }); }
    const data = await res.json();
    const checkoutUrl = data?.data?.attributes?.url;
    if (!checkoutUrl) return NextResponse.json({ error: "No checkout URL returned" }, { status: 500 });
    return NextResponse.json({ url: checkoutUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
