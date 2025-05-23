const Eris = require("eris");
const keep_alive = require('./keep_alive.js');

// Replace TOKEN with your bot account's token
const bot = new Eris(process.env.token);

bot.on("ready", () => {
  console.log("Bot is ready!");

  // Set AFK status with a custom message
  bot.editStatus("idle", {
    name: "hi",
    type: 0 // 0 is for 'Playing'; other types: 1 (Streaming), 2 (Listening), 3 (Watching)
  });
});

bot.on("error", (err) => {
  console.error(err);
});

bot.connect();
