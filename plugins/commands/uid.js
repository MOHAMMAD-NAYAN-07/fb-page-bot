module.exports = {
  config: {
    name: "uid",
    permission: 0,
    prefix: true,
    description: "Show your Facebook UID",
    category: "system"
  },

  async start({ senderId, nayan, event }) {

    // Time with timezone
    const time = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Dhaka",
      hour12: true
    });

    const msg =
`🆔 USER ID INFO

👤 Your UID : ${senderId}
📅 Time     : ${time}
🌍 Timezone : Asia/Dhaka

━━━━━━━━━━━━━━━━━━
🤖 Powered by Nayan Bot`;

    return nayan.sendMessage(senderId, { text: msg });
  }
};
