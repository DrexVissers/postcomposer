import fetch from "node-fetch";
import crypto from "crypto";

async function testWebhook() {
  const webhookUrl = "http://localhost:3002/api/webhooks/clerk";

  // Get the webhook secret and ensure proper format
  // The webhook secret from Clerk starts with 'whsec_' which needs to be removed
  // for the Svix library to properly verify the signature
  const rawWebhookSecret = "whsec_VlPluGAMjmbehtuXuDBos-um9LflkoQy";
  const webhookSecret = rawWebhookSecret.startsWith("whsec_")
    ? rawWebhookSecret.substring(6) // Remove 'whsec_' prefix
    : rawWebhookSecret;

  const testPayload = {
    data: {
      id: "test_user_123",
      email_addresses: [{ email_address: "test@example.com" }],
      username: "testuser",
      first_name: "Test",
      last_name: "User",
      image_url: "https://example.com/avatar.jpg",
    },
    object: "event",
    type: "user.created",
  };

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const payload = JSON.stringify(testPayload);

  // Generate SVIX signatures (Clerk's format)
  const toSign = Buffer.from(`${timestamp}.${payload}`);
  const signature = crypto
    .createHmac("sha256", webhookSecret)
    .update(toSign)
    .digest("hex");

  // Clerk uses multiple signature versions
  const signatureHeader = `v1,${signature}`;

  try {
    console.log("Sending webhook request with:");
    console.log("- Webhook URL:", webhookUrl);
    console.log("- Raw Webhook Secret:", rawWebhookSecret);
    console.log("- Processed Webhook Secret:", webhookSecret);
    console.log("- Timestamp:", timestamp);
    console.log("- Signature:", signatureHeader);
    console.log("- Payload:", payload);

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "svix-id": crypto.randomUUID(),
        "svix-timestamp": timestamp,
        "svix-signature": signatureHeader,
      },
      body: payload,
    });

    const data = await response.text();
    console.log("\nResponse:");
    console.log("Status:", response.status);
    console.log("Body:", data);

    // Log the request details for debugging
    console.log("\nRequest details:");
    console.log("Timestamp:", timestamp);
    console.log("Signature:", signatureHeader);
    console.log("Payload:", payload);
  } catch (error) {
    console.error("Error:", error);
  }
}

testWebhook();
