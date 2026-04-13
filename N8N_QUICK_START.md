# n8n Integration Quick Reference

## 🚀 Quick Start

You can now easily switch between **Zapier** and **n8n** for your lead webhooks!

### Current Setup
- **Provider:** Zapier (default)
- **Zapier URL:** `https://hooks.zapier.com/hooks/catch/22898586/u7q3fby/`

### Step 1: Create n8n Workflow

1. Log into your n8n instance
2. Create **New Workflow**
3. Add **Webhook** node → POST method → Path: `/flooring-leads`
4. Copy the generated webhook URL
5. Add **Function** node to process data
6. Add **HTTP Request** to send to GHL
7. Save and **Activate** workflow

### Step 2: Switch to n8n

Edit `index.html` around line 1620:

```javascript
// Change this line:
const WEBHOOK_PROVIDER = "zapier";

// To:
const WEBHOOK_PROVIDER = "n8n";

// And update your n8n URL:
webhookUrl = "https://your-n8n-instance.com/webhook/flooring-leads";
```

### Step 3: Test It

1. Visit `http://localhost:8000/webhook-test.html`
2. Select **n8n** from dropdown
3. Paste your n8n webhook URL
4. Click **Send Test Data**
5. Check n8n execution history for the request

## n8n Workflow Structure

```
Webhook (receive POST)
    ↓
Function (process data)
    ↓
HTTP Request (send to GHL)
    ↓
Respond to Webhook (success response)
```

## Data Sent by App

```json
{
  "name": "John Smith",
  "businessName": "Smith Flooring LLC",
  "phone": "(555) 867-5309",
  "city": "Austin, TX",
  "score": 72,
  "timestamp": "2026-04-13T...",
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

## n8n Configuration Files

- **N8N_SETUP.md** — Full setup guide with JSON workflow template
- **webhook-config.js** — Reusable webhook configuration module
- **webhook-test.html** — Test tool (supports both Zapier and n8n)

## Switching Between Providers

### ✅ To Use Zapier
```javascript
const WEBHOOK_PROVIDER = "zapier";
```

### ✅ To Use n8n
```javascript
const WEBHOOK_PROVIDER = "n8n";
webhookUrl = "https://your-n8n-instance.com/webhook/flooring-leads";
```

## Advantages of Each

### Zapier
- ✅ No server needed
- ✅ Hosted service (reliable uptime)
- ✅ Marketplace with 1000+ apps
- ❌ Monthly subscription cost
- ❌ Limited free tier

### n8n
- ✅ Self-hosted (full control)
- ✅ No subscription fees
- ✅ Unlimited workflows
- ✅ Workflow debugging & logging
- ❌ Requires server/hosting
- ❌ Smaller app marketplace than Zapier

## Production Deployment

When deploying to Vercel/production:

1. Set `WEBHOOK_PROVIDER` based on environment
2. Use environment variables for webhook URLs:
   ```javascript
   const webhookUrl = process.env.WEBHOOK_URL || defaultUrl;
   ```
3. Test with real GHL account
4. Monitor webhook execution logs

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Webhook not firing | Check workflow is Active in n8n |
| Data not in GHL | Verify field mappings in n8n Function node |
| 404 errors | Ensure webhook URL matches n8n path exactly |
| CORS errors | n8n handles this - check n8n logs |

## Next Steps

- ✅ Create n8n workflow
- ✅ Test with webhook-test.html
- ✅ Switch provider in index.html
- ✅ Deploy to production
- ✅ Add error handling/notifications
- ✅ Create backup workflow in n8n
