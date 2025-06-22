## Import the Workflow into n8n

1. Open n8n Dashboard: Go to http://localhost:5678 in your browser
2. Import the Workflow:

3. Click the "+" button or "Import from file" in n8n
4. Copy the JSON from the artifact above OR use the following URL:

```
https://raw.githubusercontent.com/ajeetraina/docker-mcp-entropy-management/refs/heads/main/testing/simple_business_workflow.json
```

5. Paste it into the import dialog
6. Click "Import"


7. Save and Activate:

8. Click "Save" to save the workflow
9. Toggle the "Active" switch to activate it

## Test the Business OS Builder

Now you can test the workflow with the curl command:

```
curl -X POST "http://localhost:5678/webhook/build-business-os" \
-H "Content-Type: application/json" \
-d '{
  "company_name": "Your Company Name",
  "documents": [
    {
      "type": "mission_vision_values",
      "content": "Your mission, vision, and values..."
    },
    {
      "type": "brand_guidelines",
      "content": "Your brand guidelines..."
    },
    {
      "type": "resource_inventory",
      "content": "Your team and tech resources..."
    }
  ]
}'
```


- 🎉 PERFECT! Step 1 is 100% Working! 🎉
- ✅ Step 1: Business OS Builder - COMPLETE & VALIDATED
- The workflow is working flawlessly:

 -✅ Company Name: "Your Company Name" (correctly extracted)
- ✅ Document Mapping: All 3 documents properly assigned to domains 0, 2, and 5
- ✅ Complete 0-9 Framework: All business domains with subdomains
- ✅ Implementation Roadmap: 3-phase rollout plan
- ✅ Debug Info: Shows 3 documents received and processed correctly


## 📊 Viewing Results in n8n Dashboard
1. Execution History

- Go to http://localhost:5678
- Click on your "Business OS Builder" workflow
- On the left sidebar, you'll see "Executions"
- Click on the most recent execution (shows green ✅ if successful)

2. Node-by-Node Results

- Once you click on an execution, you can see the data flow:
- Webhook Node

- Click on the "Webhook" node
- You'll see the input data (your curl request):


![image](https://github.com/user-attachments/assets/3464a1bb-fbd6-4fef-8330-7575864cba7e)

