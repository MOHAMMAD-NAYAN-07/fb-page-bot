module.exports = {
  config: {
    payload: "playback"
  },
  async start({ senderId, nayan, event }) {
    let data;
    try {
      data = JSON.parse(event.postback.payload);
    } catch {
      return nayan.sendMessage(senderId, { text: "❌ Invalid payload" });
    }
    if (data.type !== "playback") return;
    await nayan.sendMessage(senderId, {
      attachment: {
        type: data.mode === "audio" ? "audio" : "video",
        payload: { url: data.url }
      }
    });
  }
};
