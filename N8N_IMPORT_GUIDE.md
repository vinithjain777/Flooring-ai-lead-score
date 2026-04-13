# n8n Workflow Import Guide

## 🚀 Quick Import Instructions

This workflow automatically qualifies leads and creates contacts in GoHighLevel based on quiz scores.

### Step 1: Get Your GHL API Key

1. Go to GoHighLevel → Settings → API Keys
2. Create new API key (or copy existing)
3. Keep it safe — you'll need it in Step 3

### Step 2: Import Workflow into n8n

1. Download `n8n-ghl-workflow.json` from your repo
2. In n8n, click **"≡"** (menu) → **"File"** → **"Import from file"**
3. Select `n8n-ghl-workflow.json`
4. Click **Import**

The workflow will load with all nodes and connections set up.

### Step 3: Add Your GHL API Key

After import, click **Edit** on each of these nodes and replace:
```
"Bearer PASTE_YOUR_GHL_API_KEY_HERE"
```

With your actual API key:
```
"Bearer sk_live_xxxxxxxxxxxxxxxxxxxx"
```

**Nodes that need updating:**
- ✅ GHL — Create Hot Lead
- ✅ GHL — Create Warm Lead
- ✅ GHL — Create Cold Lead

### Step 4: Confirm Your Webhook URL

1. The webhook URL is already configured in your app files
2. Your n8n webhook URL is:
   ```
   http://localhost:5678/webhook/gufy-quiz
   ```
3. Make sure this matches in your n8n Quiz Form Webhook node

### Step 5: Activate Workflow

1. Click **"Save"** (top right)
2. Toggle **"Active"** (top left) to turn ON
3. Workflow is now live!

### Step 6: Update App Webhook URL

**Already configured in:**
- index.html (line 1637): `http://localhost:5678/webhook/gufy-quiz`
- webhook-test.html (line 54): `http://localhost:5678/webhook/gufy-quiz`

✅ **No changes needed — URLs are already updated!**

---

## 📊 Workflow Logic

The workflow receives quiz data and creates leads in GHL based on score:

```
Quiz submission (webhook)
         ↓
   Check score ≥ 70?
    ↙         ↘
   YES         NO
   ↓           ↓
 HOT LEAD → Check score ≥ 40?
            ↙           ↘
           YES           NO
           ↓             ↓
        WARM LEAD    COLD LEAD
```

### Lead Types:

| Type | Score | Tags | Use Case |
|------|-------|------|----------|
| 🔥 Hot | ≥70 | hot-lead | Ready to sell, strong systems |
| 🟠 Warm | 40-69 | warm-lead | Prospects, needs nurturing |
| ❄️ Cold | <40 | cold-lead | Educational, follow-up needed |

---

## 🔄 Data Mapping

**App sends:**
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "phone": "(555) 867-5309",
  "companyName": "Smith Flooring LLC",
  "city": "Austin, TX",
  "quizScore": 72,
  "timestamp": "2026-04-13T...",
  "quizAnswers": {...}
}
```

**Workflow sends to GHL:**
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "phone": "(555) 867-5309",
  "companyName": "Smith Flooring LLC",
  "city": "Austin, TX",
  "source": "Gufy Flooring Quiz",
  "tags": ["flooring-quiz-lead", "hot-lead"],
  "customFields": [
    {
      "key": "quiz_score",
      "field_value": "72"
    }
  ]
}
```

---

## 🧪 Testing

1. Open `http://localhost:8000/webhook-test.html`
2. Select **n8n** from provider dropdown
3. Click **"📤 Send Test Data"**
4. In n8n, watch the execution:
   - Green checkmarks = success
   - Red X = error
5. Check GHL → Contacts to see the new lead

---

## 🔧 Troubleshooting

### API Key Error
- **Error:** "Unauthorized" or 401
- **Fix:** Check GHL API key is correct and has contact creation permissions

### Webhook Not Firing
- **Error:** No executions in n8n
- **Fix:** 
  1. Verify workflow is **Active**
  2. Check webhook URL matches in app
  3. Open browser console (F12) for fetch errors

### Data Not in GHL
- **Error:** Executions show green but no contacts
- **Fix:** 
  1. Check field mappings in GHL HTTP Request nodes
  2. Verify GHL API has correct permissions
  3. Check GHL custom field "quiz_score" exists

### CORS Errors
- **Error:** CORS or network errors in console
- **Fix:** This usually means the n8n instance is running — check it's accessible

---

## 📈 Next Steps

### Add More Actions:
- SMS notification to sales team
- Email confirmation to prospect
- Add to specific GHL pipeline
- Trigger CRM automation
- Slack notification

### Advanced Features:
- Conditional routing based on location
- Different pipelines per lead type
- Google Sheets logging
- Zapier integration fallback

---

## 📞 Need Help?

If workflow isn't working:
1. Check n8n execution logs (red nodes show errors)
2. Verify field names match exactly
3. Test with webhook-test.html first
4. Check GHL API documentation: https://developer.gohighlevel.com/

Your app is now fully integrated with n8n and GHL! 🎉
