module.exports = {
  config: {
    name: "ai",
    aliases: ["ask", "gpt"],
    version: "1.0.0",
    permission: 0,
    credits: "MOHAMMAD NAYAN",
    description: "Ask AI anything",
    prefix: true,
    category: "user",
    usages: "/ai <question>",
    cooldowns: 5
  },

  start: async function ({ senderId, args, nayan, event, config }) {
    const axios = require("axios");

    const query = args.join(" ");
    if (!query) {
      return nayan.sendMessage(senderId, {
        text: "❓ Please write something\nExample: /ai what is AI?"
      });
    }

    try {
      
      const apiList = await axios.get(
        'https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json'
      );

      const base = apiList.data.api;
      const res = await axios.get(
        `${base}/nayan/gpt3?prompt=${encodeURIComponent(query)}`
      );

      const aiText =
        res.data?.response ||
        "🤖 I couldn't understand your question.";

      await nayan.sendMessage(senderId, {
        text: `🤖 AI Reply:\n\n${aiText}`
      });

    } catch (err) {
      console.error("[AI CMD ERROR]", err.message);
      await nayan.sendMessage(senderId, {
        text: "⚠️ AI service unavailable right now"
      });
    }
  }
};
