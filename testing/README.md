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
