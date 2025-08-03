# Discord MCP Server

A Model Context Protocol (MCP) server that allows you to send messages to Discord channels directly from Cursor.

## Features

- Send messages to Discord channels via webhooks
- Integrated with Cursor IDE
- TypeScript implementation with proper error handling

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Server

```bash
npm run server:build
```

### 3. Configure Cursor

1. Open Cursor
2. Go to Settings (Cmd/Ctrl + ,)
3. Search for "MCP"
4. Add the following configuration to your Cursor settings:

```json
{
  "mcpServers": {
    "discord-mcp": {
      "command": "node",
      "args": ["dist/index.js"],
      "env": {
        "DISCORD_WEBHOOK_URL": "YOUR_DISCORD_WEBHOOK_URL"
      }
    }
  }
}
```

### 4. Restart Cursor

After adding the configuration, restart Cursor for the changes to take effect.

## Usage

Once configured, you can use the Discord MCP server in Cursor by:

1. Opening the command palette (Cmd/Ctrl + Shift + P)
2. Typing "MCP" to see available MCP tools
3. Using the `send-message` tool to send messages to your Discord channel

## Discord Webhook Setup

1. Go to your Discord server
2. Right-click on the channel where you want to send messages
3. Select "Edit Channel"
4. Go to "Integrations" tab
5. Click "Create Webhook"
6. Copy the webhook URL
7. Replace `YOUR_DISCORD_WEBHOOK_URL` in the configuration with your webhook URL

## Development

- `npm run server:dev` - Run the server in development mode
- `npm run server:build` - Build the TypeScript code
- `npm run server:inspect` - Inspect the MCP server using the MCP inspector

## Security Note

Keep your Discord webhook URL secure and don't share it publicly. Consider using environment variables for production use. 