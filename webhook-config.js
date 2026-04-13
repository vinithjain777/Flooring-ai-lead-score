/**
 * Webhook Configuration
 * Switch between different webhook providers easily
 */

// ==============================================================
// EDIT THIS SECTION TO CHOOSE YOUR WEBHOOK PROVIDER
// ==============================================================

// Choose provider: "zapier" or "n8n"
const WEBHOOK_PROVIDER = "zapier";

// Zapier webhook URL
const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/22898586/u7q3fby/";

// n8n webhook URL (replace with your n8n instance URL and path)
const N8N_WEBHOOK_URL = "https://your-n8n-instance.com/webhook/flooring-leads";

// ==============================================================
// GET ACTIVE WEBHOOK URL
// ==============================================================

function getWebhookUrl() {
  if (WEBHOOK_PROVIDER === "zapier") {
    console.log("📌 Using Zapier webhook");
    return ZAPIER_WEBHOOK_URL;
  } else if (WEBHOOK_PROVIDER === "n8n") {
    console.log("📌 Using n8n webhook");
    if (N8N_WEBHOOK_URL.includes("your-n8n-instance")) {
      console.error("❌ n8n webhook URL not configured! Update N8N_WEBHOOK_URL in config.js");
      return null;
    }
    return N8N_WEBHOOK_URL;
  } else {
    console.error("❌ Unknown webhook provider:", WEBHOOK_PROVIDER);
    return null;
  }
}

// ==============================================================
// SEND WEBHOOK (use this in your code)
// ==============================================================

async function sendWebhook(data, debugMode = false) {
  const webhookUrl = getWebhookUrl();
  
  if (!webhookUrl) {
    console.error("❌ No webhook URL configured");
    return false;
  }

  try {
    if (debugMode) {
      console.log("📤 Sending webhook data:", data);
      console.log("🔗 Webhook URL:", webhookUrl);
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      mode: "no-cors",
    });

    console.log("✅ Webhook sent successfully");
    if (debugMode) console.log("Response status:", response.status);
    return true;
  } catch (err) {
    console.error("❌ Webhook error:", err);
    return false;
  }
}

// ==============================================================
// EXPORT FOR USE
// ==============================================================

// For use in HTML script tags:
// window.sendWebhook = sendWebhook;
// window.getWebhookUrl = getWebhookUrl;
