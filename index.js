const Eris = require("eris");
const keep_alive = require('./keep_alive.js');

const bot = new Eris(process.env.token);

// Timezone + stop time
const TIMEZONE = "Europe/London"; 
const STOP_HOUR = 1;   // 1AM London time
const STOP_MINUTE = Math.floor(Math.random() * 60); // random minute (0–59)

console.log(`Bot will stop today at 01:${STOP_MINUTE.toString().padStart(2, "0")} London time`);

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.username}`);

  // Check every minute if it's time to stop
  setInterval(() => {
    const now = new Date();
    const time = new Intl.DateTimeFormat("en-GB", {
      timeZone: TIMEZONE,
      hour: "numeric",
      minute: "numeric",
      hour12: false
    }).formatToParts(now);

    const hour = parseInt(time.find(p => p.type === "hour").value, 10);
    const minute = parseInt(time.find(p => p.type === "minute").value, 10);

    console.log(`Current ${TIMEZONE} time: ${hour}:${minute}`);

    if (hour === STOP_HOUR && minute === STOP_MINUTE) {
      console.log("Random stop time reached. Disconnecting bot...");
      bot.disconnect();
      process.exit(0);
    }
  }, 60 * 1000); // check once per minute
});

bot.on("messageCreate", (msg) => {
  if (msg.content === "!time") {
    const now = new Date();
    const formatted = new Intl.DateTimeFormat("en-GB", {
      timeZone: TIMEZONE,
      dateStyle: "short",
      timeStyle: "medium"
    }).format(now);

    bot.createMessage(msg.channel.id, `The current time in London is ${formatted}`);
  }
});

bot.on("error", (err) => {
  console.error(err);
});

bot.connect();
