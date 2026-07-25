import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
  // authenticate.webhook handles HMAC signature verification automatically
  const { topic, shop, session, payload } = await authenticate.webhook(request);

  // This app does not store sensitive customer data, so there is no data to return.
  return new Response(null, { status: 200 });
};
