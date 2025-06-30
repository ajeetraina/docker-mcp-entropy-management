# AI-Powered Entropy Management System 

## Overview

You now have a complete **AI-Powered Entropy Management System** prototype with three core workflows:

1. **Business OS Builder** - Transforms business documents into systematic 0-9 structure
2. **GitHub Structure Creator** - Deploys organized repositories with templates
3. **Daily Entropy Management** - Automates daily organization and maintenance

## Prerequisites 

- ✅ Docker Desktop 4.42.0+ with MCP support
- ✅ n8n workflow engine running (localhost:5678)
- ✅ Model Runner with AI models loaded (model-runner.docker.internal:12434)
- ✅ Docker MCP Toolkit configured

## Getting Started


## Implementation Steps

```
[Claude Desktop] ↔ [Docker MCP Toolkit] ↔ [MCP Servers (GitHub, etc.)]
                                ↕
[n8n Workflows] ↔ [HTTP Bridge] ↔ [Docker MCP Commands]
                                ↕
[GitHub Repository] ← [File Creation via MCP]
```


## Phase 1: System Setup & Components

### 1. Docker MCP Toolkit (Host Level)

- Runs as Docker Desktop feature
- Manages containerized MCP servers (GitHub, Kubernetes, etc.)
- Provides docker mcp CLI commands
- You verified this works: docker mcp tools call get_me ✅

### 2. n8n Workflow Engine (Containerized)

- Runs in Docker container
- Handles business logic and workflow automation
- Cannot directly access docker mcp commands (they're host-level only)

### 3. HTTP Bridge (Host Level)

- Simple Node.js service on port 3001
- Translates HTTP requests → docker mcp commands
- You verified this works: Bridge successfully called MCP ✅

## Step 0. Bring up n8n using Docker Compose

### Prerequisite

- Docker Desktop 4.42+ installed
- Enable Docker MCP Toolkit
- GitHub MCP added as Server
- Claude Desktop configured as Client

### Step 1: Download AI Models

Pull your preferred models:

```bash
# Lightweight model (fast, good for testing)
docker model pull ai/llama3.2:1B-Q8_0

# Balanced model (recommended)
docker model pull ai/llama3.2:3B

# More capable model
docker model pull ai/gemma3:2B

# List downloaded models
docker model ls
```

### Step 2. Clone the repository

```
git clone https://github.com/ajeetraina/docker-mcp-entropy-management
cd docker-mcp-entropy-management
```

## Step 3: Configure Environment

Copy `sample.env` to `.env` file and make the below changes

Edit the `.env` file:

1. **Change the encryption key**:
   ```bash
   # Generate a random key
   openssl rand -hex 32
   ```
   Replace `N8N_ENCRYPTION_KEY` with the generated key.

2. **Choose your model**:
   Set `N8N_AI_DEFAULT_MODEL` to one of your downloaded models.

3. **Set your timezone**:
   Update `GENERIC_TIMEZONE` to your timezone.


## Step 3. Bring up Compose service

```
cd n8n
docker compose up -d
```

This uses your Dockerfile.n8n and compose.yaml to start:

- PostgreSQL database
- n8n with Docker CLI installed
- Redis (optional)
- n8n worker (optional)

### Step 4. Start MCP HTTP Bridge (Host)

MCP Gateway doesn't have HTTP/REST API flags. It's designed for MCP protocol connections (like Claude Desktop), not HTTP endpoints.
Since the gateway doesn't expose HTTP endpoints, let's implement the HTTP bridge approach.

In a separate terminal, you need to manually start the bridge:

```
# Start the bridge (this must run on HOST, not in container)
node mcp-http-bridge.js
```

### Step 1: Import the Workflows

**Import all three workflows into your n8n dashboard:**

1. **Business OS Builder**
   - Copy JSON from `ai-business-os-workflow` artifact - [link](https://raw.githubusercontent.com/ajeetraina/docker-mcp-entropy-management/refs/heads/main/ai-business-os-workflow.json)
   - Import to n8n → Save → Activate
   - **Webhook URL**: `http://localhost:5678/webhook/build-business-os`
  
![image](https://github.com/user-attachments/assets/e7ec769b-f2a2-4826-b586-53d1b04355fa)


### How to test this?

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

### Result:

### Webhook:

![image](https://github.com/user-attachments/assets/7c1c9546-e11f-42a6-8542-deb8456f9483)

### Prepare AI Analytics

![image](https://github.com/user-attachments/assets/eeba2452-f62a-4d1d-b97a-268b9b6aa21e)

### AI Business Analytics

![image](https://github.com/user-attachments/assets/ecd9d998-1c50-4f86-b59a-ba008cf78328)

### Create AI Business OS

![image](https://github.com/user-attachments/assets/12810700-ac5e-489b-a3eb-f5ff86c3a69f)

### AI response

![image](https://github.com/user-attachments/assets/e38595a8-aaaa-4f7a-a694-78ff4b365b37)




```
{"company_name":"Your Company","business_os":{"0":{"name":"Foundation","description":"Core identity, governance, and strategic direction","subdomains":{"0.1":"Vision Mission Values","0.2":"Legal Entity & Governance","0.3":"Strategic Framework"},"content":[],"ai_insights":{"business_focus":"Not specified","core_value_proposition":"Not specified","strategic_priorities":[]},"action_items":["Document Not specified strategic framework","Define core value proposition: Not specified","Establish governance structure"]},"1":{"name":"Market Intelligence","description":"Customer insights, market analysis, and competitive positioning","subdomains":{"1.1":"Customer Personas & Segments","1.2":"Market Research & Analysis","1.3":"Competitive Intelligence"},"content":[],"ai_insights":{"target_customers":[],"competitive_advantages":[]},"action_items":["Research  segments","Conduct competitive analysis","Validate market positioning"]},"2":{"name":"Brand & Marketing","description":"Brand identity, marketing strategy, and customer communication","subdomains":{"2.1":"Brand Guidelines & Identity","2.2":"Marketing Strategy & Campaigns","2.3":"Content Strategy & Framework"},"content":[],"ai_insights":{"competitive_advantages":[],"target_customers":[],"value_proposition":"Not specified"},"action_items":["Develop messaging highlighting ","Create content for ","Establish brand guidelines"]},"3":{"name":"Product & Innovation","description":"Product development, innovation pipeline, and R&D","subdomains":{"3.1":"Product Roadmap & Strategy","3.2":"Feature Development & Requirements","3.3":"Innovation & R&D Pipeline"},"content":[],"ai_insights":{"growth_opportunities":[],"technology_stack":[],"strategic_priorities":[]},"action_items":["Develop roadmap for ","Leverage ","Establish R&D process"]},"4":{"name":"Operations","description":"Business processes, quality management, and operational efficiency","subdomains":{"4.1":"Process Documentation & SOPs","4.2":"Quality Management & Standards","4.3":"Supply Chain & Vendor Management"},"content":[],"ai_insights":{"operational_challenges":[],"business_model":"Not specified"},"action_items":["Address ","Optimize Not specified operations","Document core processes"]},"5":{"name":"Technology & Systems","description":"Technology infrastructure, development processes, and technical architecture","subdomains":{"5.1":"Technology Stack & Architecture","5.2":"Development Process & DevOps","5.3":"Infrastructure & Security"},"content":[],"ai_insights":{"technology_stack":[],"competitive_advantages":[]},"action_items":["Document  architecture","Establish development standards","Implement security framework"]},"6":{"name":"Human Resources","description":"Team structure, culture, talent management, and organizational development","subdomains":{"6.1":"Team Structure & Roles","6.2":"Culture & Values Implementation","6.3":"Talent Strategy & Development"},"content":[],"ai_insights":{"operational_challenges":[],"competitive_advantages":[]},"action_items":["Define team structure and roles","Implement culture framework","Develop talent strategy"]},"7":{"name":"Finance & Legal","description":"Financial planning, legal compliance, risk management, and governance","subdomains":{"7.1":"Financial Planning & Analysis","7.2":"Legal Compliance & Contracts","7.3":"Risk Management & Insurance"},"content":[],"ai_insights":{"business_model":"Not specified","risk_factors":[]},"action_items":["Develop Not specified financial model","Mitigate ","Establish compliance framework"]},"8":{"name":"Partnerships & Stakeholders","description":"Strategic partnerships, stakeholder management, and external relationships","subdomains":{"8.1":"Strategic Partnerships & Alliances","8.2":"Investor Relations & Funding","8.3":"Community & Public Relations"},"content":[],"ai_insights":{"growth_opportunities":[],"target_customers":[]},"action_items":["Develop partnerships for ","Build stakeholder communication","Engage target communities"]},"9":{"name":"Growth & Future","description":"Growth strategy, future planning, innovation, and scaling framework","subdomains":{"9.1":"Growth Strategy & Expansion","9.2":"Future Roadmap & Vision","9.3":"Scaling Framework & Systems"},"content":[],"ai_insights":{"growth_opportunities":[],"strategic_priorities":[]},"action_items":["Execute ","Focus on ","Build scaling infrastructure"]}},"ai_roadmap":{"phase_1":{"name":"AI-Guided Foundation & Core Systems","duration":"4-6 weeks","domains":["0","2","5"],"focus":"Establish Not specified foundation","key_tasks":["Define Not specified framework","Document Not specified","Implement  systems"],"ai_priority":"Critical - Foundation enables all other domains"},"phase_2":{"name":"Market Intelligence & Product Development","duration":"6-8 weeks","domains":["1","3","4"],"focus":"Build market presence and Not specified capabilities","key_tasks":["Research ","Address ","Establish competitive framework"],"ai_priority":"High - Market understanding drives success"},"phase_3":{"name":"Growth & Scale Infrastructure","duration":"8-12 weeks","domains":["6","7","8","9"],"focus":"Scale organization and growth infrastructure","key_tasks":["Build scaling team","Execute ","Mitigate "],"ai_priority":"Strategic - Enables sustainable growth"}},"business_intelligence":{},"ai_model_used":"ai/llama3.2:3B","analysis_timestamp":"2025-06-22T11:45:09.365Z","status":"success","message":"AI-Enhanced Business OS generated for Your Company using local Model Runner","performance":{"documents_analyzed":0,"ai_insights_generated":0,"domains_enhanced":10,"action_items_created":30},"debug":{"input_data_keys":["data"],"ai_response_available":false,"business_intelligence_keys":[],"safe_processing":true}}%                                                             ajeetsraina  docker-mcp-entropy-management  ➜ (main)  ♥ 17:15  
```


2. **GitHub Structure Creator**
   - Copy JSON from `github-creator-workflow-norepo-fileonly.json` artifact - [link](https://raw.githubusercontent.com/ajeetraina/docker-mcp-entropy-management/refs/heads/main/github-creator-workflow-mcp-bridge.json)
   - Import to n8n → Save → Activate
   - **Webhook URL**: `http://localhost:5678/webhook/create-github-structure`
  
```
curl -X POST "http://localhost:5678/webhook/create-github-structure" \
-H "Content-Type: application/json" \
-d '{
"company_name": "Tech Startup Inc",
"github_owner": "ajeetraina",
"repository_name": "tech-startup-inc-business-os",
"domains": [
    {
        "number": 0,
        "name": "Foundation",
        "content": ["Vision, Mission, Values"],
        "subdomains": [
            {"number": "0.1", "name": "Vision Mission Values"}
        ]
    }
]
}'
```

![image](https://github.com/user-attachments/assets/4157e0b5-d5fc-4d26-b7b8-eb395cc394df)


4. **Daily Entropy Management**
   - Copy JSON from `daily_entropy_management` artifact
   - Import to n8n → Save → Activate
   - **Webhook URL**: `http://localhost:5678/webhook/process-entropy`
   - **Auto-trigger**: Daily at 9 AM

### Step 2: Set Up GitHub MCP Integration

**Enable GitHub repository creation:**

```bash
# Set up GitHub Personal Access Token
docker mcp secret set GITHUB.PERSONAL_ACCESS_TOKEN=github_pat_your_token_here

# Enable GitHub MCP server in Docker Desktop
# Go to Extensions → MCP Toolkit → Enable "GitHub Official"

# Restart Claude Desktop to pick up new MCP servers
```

### Step 3: Test the Business OS Builder

**Create test business documents:**

```bash
# Test the Business OS Builder
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

**Expected Result**: Complete 0-9 Business Operating System structure with implementation roadmap.

### Step 4: Test GitHub Structure Creation

**Deploy the B-OS structure to GitHub:**

```bash
# Test GitHub Structure Creator
curl -X POST "http://localhost:5678/webhook/create-github-structure" \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "Tech Startup Inc",
    "github_owner": "your-github-username",
    "repository_name": "tech-startup-business-os",
    "domains": [
      {
        "number": 0,
        "name": "Foundation",
        "content": ["Vision, Mission, Values", "Legal and Governance"],
        "subdomains": [
          {"number": "0.1", "name": "Vision Mission Values"},
          {"number": "0.2", "name": "Legal Entity"}
        ]
      },
      {
        "number": 1,
        "name": "Market Intelligence",
        "content": ["Customer research", "Competitive analysis"],
        "subdomains": [
          {"number": "1.1", "name": "Customer Personas"},
          {"number": "1.2", "name": "Market Research"}
        ]
      }
    ]
  }'
```

**Expected Result**: New GitHub repository with systematic 0-9 folder structure and template files.

### Step 5: Test Daily Entropy Management

**Run manual entropy processing:**

```bash
# Test Daily Entropy Management
curl -X POST "http://localhost:5678/webhook/process-entropy" \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "Tech Startup Inc",
    "github_repos": ["tech-startup-business-os"],
    "slack_channels": ["general", "product", "strategy"]
  }'
```

**Expected Result**: Daily report with classified business information, action items, and organizational updates.




