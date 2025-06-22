## How to test the setup

- Import the first JSON
- Activate the toggle button
- Run the following curl command

```
curl -X POST "http://localhost:5678/webhook/build-business-os" \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "TestCorp",
    "documents": [
      {
        "type": "mission_vision_values",
        "content": "Our mission is to create innovative business solutions through AI automation."
      }
    ]
  }'
```

### Result

```
{"data":"Docker Model Runner\n\nThe service is running.\n\nDocumentation: https://docs.docker.com/desktop/features/model-runner/\n"}%
```

