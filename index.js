const Eris = require("eris");
const keep_alive = require('./keep_alive.js');
const RPC = require("discord-rpc");

// === Setup BOT ===
const bot = new Eris(process.env.token, {
  intents: ["guilds"],
  defaultPresence: {
    status: "idle",
    activities: [
      {
        name: "hi",
        type: 0 // "Playing hi"
      }
    ]
  }
});

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.username}`);
});

bot.on("error", (err) => {
  console.error("Bot error:", err);
});

bot.connect();

// === Setup Rich Presence for REAL USER ===
const clientId = 'YOUR_APP_CLIENT_ID'; // Replace with your app ID from Discord Developer Portal
const rpc = new RPC.Client({ transport: 'ipc' });

rpc.on('ready', () => {
  rpc.setActivity({
    details: "hi",
    state: "Testing AFK status",
    startTimestamp: new Date(),
    largeImageKey: "default", // Optional: must match image asset uploaded in your app
    instance: false,
  });

  console.log("Rich Presence is active on your local user.");
});

rpc.login({ clientId }).catch(console.error);
