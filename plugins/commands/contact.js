module.exports = {
  config: {
    name: "contact",
    aliases: ["owner", "admin"],
    permission: 0,
    prefix: true,
    credits: "Mohammad Nayan",
    description: "Owner contact information",
    category: "system",
    usages: "/contact",
    cooldowns: 5
  },

  start: async function ({ senderId, nayan }) {

    await nayan.sendGeneric(
      senderId,
      `Name : Mohammad Nayan 🔰 Role : Bot & API Developer`,
      "https://i.postimg.cc/s2Pv839V/Picsart-25-12-22-11-49-34-649.jpg",
      "💬 Need help? Contact below 👇",
      [
        {
          type: "web_url",
          title: "✈️ Telegram",
          url: "https://t.me/MOHAMMADNAYAN"
        },
        {
          type: "web_url",
          title: "🟢 WhatsApp",
          url: "https://wa.me/8801615298449"
        },
        {
          type: "phone_number",
          title: "📞 Call Now",
          payload: "+8801615298449"
        }
      ]
    );
  }
};
