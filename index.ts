import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { config } from "dotenv";

// Load environment variables
config();

const DISCORD_WEBHOOK_URL = process.env['DISCORD_WEBHOOK_URL'] || "https://discord.com/api/webhooks/1401438953587998800/uJebDYj9dIyY8snVVdF7jU6P_L_0g-4K_TrrE73QeGNpzDXM7wdTuWyRBMFuI3z7FBZ-";

const server = new McpServer({
    name: 'discord-msp',
    version: '1.0.0',
    title: 'Discord MCP Server',
    capabilities: {
        resources: {},
        tools: {},
        prompts: {},
    }
});

server.tool('send-message', "an information message to the channel about the recent activity", {
    message: z.string().describe('the message to inform the team about'),
}, {
    title: 'Send Message',
    description: 'Send a message to the channel about the recent activity',
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true
}, async ({ message }: { message: string }) => {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: message,
        }),
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Discord webhook error: ${response.status} - ${errorText}`);
        return {
            content: [
                {
                    type: "text",
                    text: `Error sending message: ${response.status} - ${errorText}`,
                }
            ]
        };
    }
    
    return {
        content: [
            {
                type: "text",
                text: `Message sent successfully to Discord channel!`,
            }
        ]
    };
});

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

main();




