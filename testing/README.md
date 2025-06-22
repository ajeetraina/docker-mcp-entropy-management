## Import the Workflow into n8n

1. Open n8n Dashboard: Go to http://localhost:5678 in your browser
2. Import the Workflow:

3. Click the "+" button or "Import from file" in n8n
4. Copy the JSON from the artifact above
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
  "company_name": "Tech Startup Inc",
  "documents": [
    {
      "type": "mission_vision_values",
      "content": "Mission: Build amazing software that helps businesses grow. Vision: Become the leading platform for business automation. Values: Innovation, Customer Success, Team Collaboration."
    },
    {
      "type": "brand_guidelines", 
      "content": "Brand: Modern, professional, approachable. Colors: Blue (#2563eb), Gray (#64748b). Voice: Clear, helpful, expert but not condescending."
    },
    {
      "type": "resource_inventory",
      "content": "Team: 5 engineers, 2 designers, 1 PM. Tech: React, Node.js, PostgreSQL, AWS. Tools: GitHub, Slack, Notion, Linear."
    }
  ]
}'
```
