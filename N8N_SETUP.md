# n8n Integration Setup Guide

This guide shows how to set up n8n as an alternative to Zapier for handling lead submissions.

## Prerequisites

- n8n instance running (self-hosted or cloud)
- GHL webhook URL or API access
- Flooring Lead Score app deployed

## Step 1: Create n8n Webhook Trigger

1. In n8n, create a **new workflow**
2. Add a **Webhook** node:
   - **HTTP Method:** POST
   - **Path:** `/flooring-leads` (or your preferred path)
   - **Authentication:** None (or configure if needed)
3. Click **Test** in the webhook node
4. Copy the webhook URL shown:
   ```
   https://your-n8n-instance.com/webhook/flooring-leads
   ```

## Step 2: Add Data Processing

1. Add a **Function** node after Webhook to process the incoming data:

```javascript
return {
  json: {
    firstName: $json.name.split(' ')[0],
    lastName: $json.name.split(' ')[1] || '',
    phone: $json.phone,
    email: $json.email || '',
    customFields: {
      businessName: $json.businessName,
      city: $json.city,
      quizScore: $json.score,
      source: 'flooring-lead-quiz'
    },
    tags: [`score-${Math.round($json.score / 10) * 10}`]
  }
};
```

## Step 3: Send to GHL

### Option A: Using HTTP Request (GHL Webhook)

1. Add **HTTP Request** node
2. Set:
   - **Method:** POST
   - **URL:** Your GHL webhook URL
   - **Headers:** `Content-Type: application/json`
   - **Body:** 
   ```json
   {
     "firstName": "{{$node.Function.json.firstName}}",
     "lastName": "{{$node.Function.json.lastName}}",
     "phone": "{{$node.Function.json.phone}}",
     "customFields": "{{$json.customFields}}"
   }
   ```

### Option B: Using GHL Node (if available)

1. Look for **GoHighLevel** node in n8n marketplace
2. If not installed, install it from n8n marketplace
3. Authenticate with your GHL account
4. Configure **Create Contact** action with field mappings

## Step 4: Add Response

1. Add a **Respond to Webhook** node
2. Set response:
   ```json
   {
     "success": true,
     "message": "Lead received and queued"
   }
   ```

## Step 5: Save and Deploy

1. Give workflow a name: `Flooring Lead Capture`
2. Click **Save**
3. **Activate** the workflow (toggle on)
4. Copy your webhook URL

## Step 6: Update Your App

Replace the Zapier webhook URL with your n8n URL in:

### In `index.html`:
Find this line (around line 1625):
```javascript
const zapierWebhookUrl = "https://hooks.zapier.com/hooks/catch/22898586/u7q3fby/";
```

Replace with your n8n URL:
```javascript
const zapierWebhookUrl = "https://your-n8n-instance.com/webhook/flooring-leads";
```

### In `webhook-test.html`:
Find this line (around line 20):
```javascript
const WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/22898586/u7q3fby/";
```

Replace with:
```javascript
const WEBHOOK_URL = "https://your-n8n-instance.com/webhook/flooring-leads";
```

## Complete n8n Workflow JSON

Save this as a template in n8n:

```json
{
  "nodes": [
    {
      "parameters": {
        "path": "flooring-leads",
        "responseMode": "responseNode",
        "options": {}
      },
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "functionCode": "return {\n  json: {\n    firstName: $json.name.split(' ')[0],\n    lastName: $json.name.split(' ')[1] || '',\n    phone: $json.phone,\n    businessName: $json.businessName,\n    city: $json.city,\n    score: $json.score,\n    timestamp: $json.timestamp,\n    quizAnswers: $json.quizAnswers\n  }\n};"
      },
      "name": "Process Data",
      "type": "n8n-nodes-base.function",
      "typeVersion": 1,
      "position": [450, 300]
    },
    {
      "parameters": {
        "url": "YOUR_GHL_WEBHOOK_URL",
        "method": "POST",
        "contentType": "application/json",
        "body": "{\n  \"firstName\": \"{{$node[\\\"Process Data\\\"].json.firstName}}\",\n  \"lastName\": \"{{$node[\\\"Process Data\\\"].json.lastName}}\",\n  \"phone\": \"{{$node[\\\"Process Data\\\"].json.phone}}\",\n  \"source\": \"flooring-quiz\"\n}"
      },
      "name": "Send to GHL",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [650, 300]
    },
    {
      "parameters": {
        "responseBody": "{\"success\": true}"
      },
      "name": "Respond",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [850, 300]
    }
  ],
  "connections": {
    "Webhook": {
      "main": [[{"node": "Process Data", "type": "main", "index": 0}]]
    },
    "Process Data": {
      "main": [[{"node": "Send to GHL", "type": "main", "index": 0}]]
    },
    "Send to GHL": {
      "main": [[{"node": "Respond", "type": "main", "index": 0}]]
    }
  }
}
```

## Testing

1. Open `http://localhost:8000/webhook-test.html`
2. Click "Send Test to Zapier" button (it will now send to your n8n URL)
3. Watch for the webhook hit in n8n's execution history
4. Verify data appears in GHL within seconds

## Troubleshooting

### Webhook not firing?
- Check n8n workflow is **Active** (toggle on)
- Verify webhook path is correct
- Check n8n execution history for errors

### Data not reaching GHL?
- Verify GHL webhook URL is correct
- Check field mappings in n8n
- Review n8n logs for API errors

### CORS errors?
- n8n should handle this automatically
- If issues, ensure your n8n instance has CORS headers configured

## Advantages of n8n over Zapier

- ✅ Self-hosted (full control)
- ✅ No monthly subscription fees
- ✅ Unlimited workflows and executions
- ✅ Full workflow visibility and debugging
- ✅ Can add complex logic without extra cost
- ✅ Direct database integration possible

## Next Steps

Once working:
1. Add error handling and logging
2. Add SMS/Email notifications on submission
3. Create backup workflows
4. Set up monitoring alerts
