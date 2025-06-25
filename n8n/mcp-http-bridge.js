// mcp-http-bridge.js - Bridge HTTP to MCP Protocol
const express = require('express');
const { spawn } = require('child_process');
const app = express();
const port = 3001;

app.use(express.json({ limit: '10mb' }));

// Function to call MCP tool via docker mcp tools call
function callMCPTool(toolName, params) {
  return new Promise((resolve, reject) => {
    const args = ['mcp', 'tools', 'call', toolName];
    
    // Add parameters in the correct format: key="value"
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        args.push(`${key}="${value}"`);
      }
    });

    console.log('Executing:', 'docker', args.join(' '));

    const process = spawn('docker', args, { stdio: ['pipe', 'pipe', 'pipe'] });
    
    let stdout = '';
    let stderr = '';
    
    process.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    
    process.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    process.on('close', (code) => {
      if (code === 0) {
        try {
          resolve({ success: true, data: JSON.parse(stdout), stdout, stderr });
        } catch (e) {
          resolve({ success: true, data: stdout, stderr });
        }
      } else {
        reject({ success: false, error: `Exit code ${code}`, stderr, stdout });
      }
    });
    
    process.on('error', (error) => {
      reject({ success: false, error: error.message });
    });
  });
}

// GitHub file creation endpoint
app.post('/tools/create_or_update_file', async (req, res) => {
  try {
    const { owner, repo, path, content, message, branch = 'main' } = req.body;
    
    console.log(`Creating/updating file: ${owner}/${repo}/${path}`);
    
    const result = await callMCPTool('create_or_update_file', {
      owner,
      repo, 
      path,
      content,
      message,
      branch
    });
    
    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json(error);
  }
});

// Generic tool call endpoint
app.post('/tools/:toolName', async (req, res) => {
  try {
    const { toolName } = req.params;
    const params = req.body;
    
    console.log(`Calling tool: ${toolName}`, params);
    
    const result = await callMCPTool(toolName, params);
    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json(error);
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'MCP HTTP Bridge Ready', port });
});

// Test endpoint
app.get('/test', async (req, res) => {
  try {
    const result = await callMCPTool('get_me', {});
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🌉 MCP HTTP Bridge running on http://localhost:${port}`);
  console.log('Endpoints:');
  console.log(`  POST /tools/create_or_update_file`);
  console.log(`  POST /tools/{toolName}`);
  console.log(`  GET  /test`);
  console.log(`  GET  /health`);
});
