module.exports = {
  config: {
    name: "help",
    version: "1.0.3",
    permission: 0,
    credits: "Nayan",
    description: "Show all available commands in a stylish box layout",
    prefix: true,
    category: "system",
    usages: "help"
  },

  start: async function({ senderId, nayan, event, commands }) {
    
    const options = { timeZone: "Asia/Dhaka", hour12: true };

    // Dhaka time
    const currentTime = new Date().toLocaleTimeString("en-US", options);
    const currentDate = new Date().toLocaleDateString("en-US", options);

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const prefix = global.config.prefix || "/";

    
    const categories = {};
    commands.forEach(cmd => {
      const cat = cmd.config.category || "Misc";
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(cmd.config);
    });

    let responseText = `
╭─❖  COMMAND MENU  ❖─╮
│ 💎 Bot: ${global.config.botName || "EMon System"}
│ 👑 Owner: ${global.config.botOwner || "Mohammad Nayan"}
│ 🌍 Global Prefix: ${global.config.prefix}
│ 🕒 Time: ${currentTime}
│ 📅 Date: ${currentDate}
│ 🌐 Timezone: ${timezone}
│ 📜 Total Commands: ${commands.size || commands.length}
│──────────────────────`;

    for (const category in categories) {
      const cmds = categories[category]
        .map(cmd => `│   ├─ ${prefix}${cmd.name}`)
        .join("\n");

      responseText += `\n│ 🎯 ${category.toUpperCase()}\n${cmds}\n│──────────────────────`;
    }

    responseText += `
╰──────────────────────╯`;

    await nayan.sendMessage(senderId, { text: responseText });
  }
};
