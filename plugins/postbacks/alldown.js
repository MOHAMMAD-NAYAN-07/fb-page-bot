module.exports = {
  config: {
    payload: "alldown"
  },

  async start({ senderId, nayan, event }) {
    let data;

    try {
      data = JSON.parse(event.postback.payload);
    } catch {
      return nayan.sendMessage(senderId, { text: "❌ Invalid payload" });
    }

    
    if (data.type !== "alldown") return;

    

    await nayan.sendMessage(senderId, {
      attachment: {
        type: "video",
        payload: {
          url: data.url
        }
      }
    });
  }
};
