import { TradeConfig } from "../types";

const WEBHOOK_URL = "https://discord.com/api/webhooks/1442600851750519026/An0okIi8OXOA5zkRKSQcJGiOAkem2JH5vKdyyj5SLpLeF4YfP8LkHL7tSYJ5ln0f1ti7";

export const sendTradeWebhook = async (config: TradeConfig) => {
  const embed = {
    title: "🤖 New Middleman Bot Hired",
    description: "A new secure trade session has been initialized.",
    color: 0x00ff9d, // Gaming success green
    fields: [
      {
        name: "🎮 Game",
        value: config.game,
        inline: true
      },
      {
        name: "👤 User",
        value: `\`${config.username}\``,
        inline: true
      },
      {
        name: "⏰ Time",
        value: config.tradeTime,
        inline: true
      },
      {
        name: "📝 Trade Details",
        value: `\`\`\`${config.description}\`\`\``
      }
    ],
    footer: {
      text: "MiddleMan1552 • Automated System",
      icon_url: "https://api.dicebear.com/7.x/bottts/svg?seed=MiddleMan1552"
    },
    timestamp: new Date().toISOString()
  };

  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: "Middle Bots System",
        avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=MiddleMan1552",
        embeds: [embed]
      }),
    });
  } catch (error) {
    console.error("Failed to send webhook:", error);
  }
};
