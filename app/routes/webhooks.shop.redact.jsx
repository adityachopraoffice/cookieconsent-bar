import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export const action = async ({ request }) => {
  // authenticate.webhook handles HMAC signature verification automatically
  const { topic, shop, session, payload } = await authenticate.webhook(request);

  // Optional: delete shop settings from our database when the shop requests deletion
  try {
    await prisma.shopSettings.delete({
      where: { shop },
    });
  } catch (error) {
    // Record may not exist, which is fine
  }

  return new Response(null, { status: 200 });
};
