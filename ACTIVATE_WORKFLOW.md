# Activating Your n8n Workflow

## Problem
You're seeing requests coming in to `/webhook-test/gufy-quiz` instead of `/webhook/gufy-quiz`. This means your n8n workflow is in **test mode** instead of **production mode**.

## Solution: Activate the Workflow

### Step 1: Open Your n8n Workflow
1. Go to your n8n instance in the browser (usually http://localhost:5678)
2. Find and open your **Flooring Lead Score** workflow

### Step 2: Locate the Active Toggle
- Look at the **top left** of the workflow editor
- You should see an **"Active"** toggle switch
- It will currently be **OFF** (grey/white)

### Step 3: Activate the Workflow
1. Click the **"Active"** toggle
2. It will turn **ON** (green/blue)
3. You'll see a confirmation message like "Workflow activated" or similar

### Step 4: Verify Activation
- The toggle should now show as **ON/Active**
- The webhook URL will change from `/webhook-test/` to `/webhook/`
- Your app can now send requests to the production endpoint

### Step 5: Test Again
1. Go back to http://localhost:8000/webhook-test.html
2. Make sure **n8n** is selected in the provider dropdown
3. Click **"Send Test Data"**
4. The webhook should now post to `/webhook/gufy-quiz` (production endpoint)

## What's the Difference?

| Mode | Endpoint | Status | Purpose |
|------|----------|--------|---------|
| **Test** | `/webhook-test/...` | Development | Edit and test workflow logic |
| **Active** | `/webhook/...` | Production | Accept real requests from your app |

When you're in test mode, n8n shows you test data but doesn't actually execute the workflow. Once activated, it processes real requests.

## Expected Behavior After Activation

When you send test data:
1. ✅ Data arrives at n8n webhook
2. ✅ n8n workflow processes it
3. ✅ Lead is created in GHL with appropriate tag (Hot/Warm/Cold)
4. ✅ You see a success response

## Troubleshooting

**Still seeing `/webhook-test/` in requests?**
- Make sure the Active toggle is **green/blue** (ON)
- Refresh your browser
- Try sending test data again

**Getting 404 errors?**
- Confirm the workflow is activated
- Check that webhook URL is exactly: `http://localhost:5678/webhook/gufy-quiz`
- Verify the workflow's Quiz Form webhook node is configured with path `gufy-quiz`

**Leads not appearing in GHL?**
- Check that GHL API key is added to your HTTP Request nodes
- Verify API key has permissions to create contacts
- Check n8n workflow execution logs for errors
