module.exports = {
  config: {
    name: "console",
    permission: 1,
    prefix: true,
    description: "Show message details in console (debug)",
    usage: "console"
  },

  handleEvent: async ({ event }) => {

    
    const line = "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━";
    const small = "──────────────────────────────────────";

    const sender = event.sender?.id || "Unknown";
    const receiver = event.recipient?.id || "Unknown";
    const time = new Date(event.timestamp).toLocaleString("en-GB", {
      timeZone: "Asia/Dhaka",
      hour12: true
    });
    console.log(`\n${line}`);
    console.log("📥  NEW FACEBOOK EVENT");
    console.log(line);

    console.log(`👤 Sender ID    : ${sender}`);
    console.log(`📄 Page ID      : ${receiver}`);
    console.log(`⏰ Time         : ${time}`);
    console.log(small);

    // ===== MESSAGE =====
    if (event.message) {
      console.log("✉️  EVENT TYPE  : MESSAGE");

      if (event.message.text) {
        console.log(`📝 Text        : ${event.message.text}`);
      }

      if (event.message.attachments) {
        event.message.attachments.forEach((att, i) => {
          console.log(`📎 Attachment ${i + 1}: ${att.type}`);
          if (att.payload?.url) {
            console.log(`🔗 URL         : ${att.payload.url}`);
          }
        });
      }
    }

    // ===== POSTBACK =====
    if (event.postback) {
      console.log("🧩 EVENT TYPE  : POSTBACK");
      console.log(`🏷️  Title      : ${event.postback.title}`);
      console.log(`📦 Payload    : ${event.postback.payload}`);
    }

    console.log(`${line}\n`);
  }
};
