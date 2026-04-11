# Zapier + GoHighLevel Integration Guide

This document walks you through connecting the Gufy Lead Score form to GoHighLevel (GHL) via Zapier.

## Setup Steps

### 1. Create Zapier Webhook Trigger
1. Go to [zapier.com](https://zapier.com) and sign into your account
2. Click **"Create"** → **"Make a Zap"**
3. Search for **"Webhooks by Zapier"**
4. Select **"Catch Hook"** (not Catch Raw Hook)
5. Click **"Continue"**
6. You'll see a Webhook URL like:
   ```
   https://hooks.zapier.com/hooks/catch/12345678/abc123xyz/
   ```
7. **Copy this URL** — you'll need it in Step 2

### 2. Update Your Application
Replace the placeholder in `index.html`:

Find this line (around line 595):
```javascript
const zapierWebhookUrl='YOUR_ZAPIER_WEBHOOK_URL_HERE';
```

Replace with your actual Zapier webhook URL:
```javascript
const zapierWebhookUrl='https://hooks.zapier.com/hooks/catch/12345678/abc123xyz/';
```

Alternatively, use environment variables by creating a `.env` file (see `.env.example`)

### 3. Create GHL Action in Zapier
In the same Zap from Step 1, after the Webhook trigger:

1. Click **"+"** to add an action
2. Search for **"GoHighLevel"** (install if needed)
3. Select **"Create/Update Contact"** action
4. Connect your GHL account when prompted
5. Map the form fields to GHL contact fields:
   - `name` → First Name / Last Name
   - `businessName` → Company
   - `phone` → Phone (primary)
   - `city` → City
   - `score` → (custom field - create in GHL if needed)
   - `timestamp` → (custom field - optional)

Example mapping:
```
First Name: name
Phone: phone
Company: businessName
City: city
Custom Field (Lead Score): score
Custom Field (Quiz Timestamp): timestamp
```

### 4. (Optional) Add to Pipeline
To automatically add contacts to a specific pipeline/campaign:

1. In the GHL action, find the **"Add to Pipeline"** option
2. Select your flooring leads pipeline
3. Choose the default campaign or status

### 5. Test Your Zap
1. Click **"Test"** in Zapier
2. Go back to your app
3. Submit the form with test data
4. Check Zapier to see if the webhook fires successfully
5. Verify the contact appears in GoHighLevel

### 6. Turn On Your Zap
1. Click the toggle in top-left to **"Turn on"** your Zap
2. Your integration is now live!

## Data Sent to GHL

When a form is submitted, the following data is sent to Zapier → GHL:

```json
{
  "name": "John Smith",
  "businessName": "Smith Flooring LLC",
  "phone": "(555) 867-5309",
  "city": "Austin, TX",
  "score": 72,
  "timestamp": "2026-04-11T14:32:00.000Z",
  "quizAnswers": {
    "1": 3,
    "2": 4,
    "3": 2,
    "4": 1,
    "5": 2,
    "6": 3,
    "7": 2
  }
}
```

## Troubleshooting

### Webhook not firing?
- Check that your Zapier URL is correct (no typos)
- Verify Zap is turned ON in Zapier
- Check browser console for errors (F12 → Console)

### Contacts not appearing in GHL?
- Verify field mappings are correct in Zapier
- Check GHL for duplicate contact rules
- Ensure GHL account has API permissions

### Slow form submission?
- Webhook calls are async (non-blocking) on purpose
- User won't see delay before Calendly redirect

## Advanced: Custom Fields in GHL

To map the quiz score or answers to GHL:

1. In GoHighLevel, go to **Settings** → **Custom Fields**
2. Create custom fields:
   - `quiz_score` (Number) — stores 0-100 score
   - `lead_quality` (Text) — stores score grade
3. In Zapier, map `score` to `quiz_score` custom field
4. Use this for segmentation, automation, and lead prioritization

## Support

For issues:
- Zapier Help: [zapier.com/help](https://zapier.com/help)
- GHL Support: [gomaximize.gohighlevel.com/support](https://gomaximize.gohighlevel.com/support)
- Check webhook delivery in Zapier's task history
