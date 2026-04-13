# Complete Testing Checklist

## ✅ Pre-Test Verification

- [ ] **n8n workflow is ACTIVE** (toggle is green/ON)
- [ ] **All 3 GHL nodes are configured:**
  - [ ] Hot Lead node (score ≥ 70): Tags include "hot-lead"
  - [ ] Warm Lead node (40-69): Tags include "warm-lead"  
  - [ ] Cold Lead node (< 40): Tags include "cold-lead"
- [ ] **Location ID is filled in** (not placeholder text) in all 3 nodes
- [ ] **GHL API Bearer token is correct** in all 3 nodes
- [ ] **Quiz app server is running** (http://localhost:8000 working)

## 🧪 Test Scenario 1: Hot Lead (Score 70+)

### Step 1: Send Test Data
1. Open http://localhost:8000/webhook-test.html
2. Provider: **n8n** ✓
3. First Name: `John`
4. Last Name: `Hot Test`
5. Phone: `(555) 123-4567`
6. Company: `Test Company`
7. City: `Dallas, TX`
8. **Quiz Score: `75`** (triggers Hot Lead path)
9. Click **"Send Test Data"**

### Step 2: Verify in n8n
- [ ] Workflow execution shows **SUCCESS**
- [ ] Check execution logs - no errors
- [ ] Data flowed through to "Score Check (Hot ≥70)" node
- [ ] HTTP Request to GHL succeeded (status 200-201)

### Step 3: Verify in GHL
- [ ] New contact created: `John Hot Test`
- [ ] Contact has **"hot-lead"** tag
- [ ] Contact has **"flooring-quiz-lead"** tag
- [ ] Phone number: `(555) 123-4567`
- [ ] Company: `Test Company`
- [ ] City: `Dallas, TX`
- [ ] Custom field shows quiz score: `75`

---

## 🧪 Test Scenario 2: Warm Lead (40-69)

### Step 1: Send Test Data
1. Open http://localhost:8000/webhook-test.html
2. Provider: **n8n** ✓
3. First Name: `Jane`
4. Last Name: `Warm Test`
5. Phone: `(555) 987-6543`
6. Company: `Building Systems Inc`
7. City: `Austin, TX`
8. **Quiz Score: `55`** (triggers Warm Lead path)
9. Click **"Send Test Data"**

### Step 2: Verify in n8n
- [ ] Workflow execution shows **SUCCESS**
- [ ] Data flowed to "Score Check (Warm 40-69)" node
- [ ] HTTP Request to GHL succeeded

### Step 3: Verify in GHL
- [ ] New contact created: `Jane Warm Test`
- [ ] Contact has **"warm-lead"** tag *(not hot-lead)*
- [ ] Contact has **"flooring-quiz-lead"** tag
- [ ] Quiz score: `55`

---

## 🧪 Test Scenario 3: Cold Lead (< 40)

### Step 1: Send Test Data
1. Open http://localhost:8000/webhook-test.html
2. Provider: **n8n** ✓
3. First Name: `Bob`
4. Last Name: `Cold Test`
5. Phone: `(555) 555-5555`
6. Company: `Distribution Co`
7. City: `Houston, TX`
8. **Quiz Score: `25`** (triggers Cold Lead path)
9. Click **"Send Test Data"**

### Step 2: Verify in n8n
- [ ] Workflow execution shows **SUCCESS**
- [ ] Data flowed to "Score Check (Cold <40)" node
- [ ] HTTP Request to GHL succeeded

### Step 3: Verify in GHL
- [ ] New contact created: `Bob Cold Test`
- [ ] Contact has **"cold-lead"** tag *(not hot-lead or warm-lead)*
- [ ] Contact has **"flooring-quiz-lead"** tag
- [ ] Quiz score: `25`

---

## 🚨 Troubleshooting

### Error: "Invalid Location ID"
- [ ] Check GHL account - get your correct Location ID
- [ ] Update all 3 HTTP Request nodes with correct ID
- [ ] Save workflow and test again

### Error: "Unauthorized" or 401
- [ ] Verify GHL API Bearer token is correct
- [ ] Check token hasn't expired
- [ ] Confirm token has "contacts:write" permission

### Error: "Webhook timeout"
- [ ] Make sure n8n workflow is **ACTIVE** (not in test mode)
- [ ] Check http-server is still running (check terminal)
- [ ] Verify webhook URL: should be `http://localhost:5678/webhook/gufy-quiz`

### Leads not tagged correctly
- [ ] Verify the IF statements are working (check n8n logs)
- [ ] Confirm quiz score is being passed correctly
- [ ] Check tags array syntax in each node

### Leads have empty first/last name
- [ ] Verify form is being filled out completely
- [ ] Check webhook data includes firstName, lastName
- [ ] Confirm data is mapping correctly in n8n

---

## ✨ Success Criteria

**All tests passed when:**
- [ ] 3 different contacts created in GHL
- [ ] Each has the correct lead-type tag (hot/warm/cold)
- [ ] Quiz score appears as custom field
- [ ] All contact info populated correctly
- [ ] n8n workflow executions all show success

---

## 📊 Final Summary

Once all tests pass, you have a fully functional:
- ✅ Quiz application (index.html)
- ✅ n8n automation (gufy-ghl-workflow.json)
- ✅ GHL integration (3 automated contact creation paths)
- ✅ Lead qualification system (Hot/Warm/Cold scoring)

**Next: Deploy to production!**
- Push code to Vercel: `git push origin main`
- Update n8n with your production server URL
- Monitor leads coming in from real customers
