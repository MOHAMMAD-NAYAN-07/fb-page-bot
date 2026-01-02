const axios = require("axios");
const yts = require('yt-search');
module.exports = {
  config: {
    name: "play",
    aliases: ["ytplay"],
    permission: 0,
    prefix: true,
    description: "Search YouTube and send audio/video via postback",
    category: "media"
  },

  async start({ senderId, args, nayan }) {
    if (!args.length) {
      return nayan.sendMessage(senderId, {
        text: "❌ Usage:\n/play <song name>"
      });
    }

    const query = args.join(" ");
    const search = await yts(query);
    const videos = search.videos.slice(0, 1);

    if (!videos.length) {
      return nayan.sendMessage(senderId, { text: '❌ No song found' });
    }

    try {
      
      const api = `https://nayan-video-downloader.vercel.app/ytdown?url=https://youtu.be/${encodeURIComponent(videos[0].videoId)}`;
      const { data } = await axios.get(api);
      console.log(data)

      if (!data.status) return nayan.sendMessage(senderId, { text: "❌ No results found" });

      const info = data.data;

      
      const audioPayload = JSON.stringify({
        type: "playback",
        mode: "audio",
        url: info.audio,
        title: info.title
      });

      const videoPayload = JSON.stringify({
        type: "playback",
        mode: "video",
        url: info.video,
        title: info.title
      });

      
      await nayan.sendGeneric(
        senderId,
        info.title,
        info.thumb,
        "Select your format:",
        [
          { type: "postback", title: "🎵 Audio", payload: audioPayload },
          { type: "postback", title: "🎬 Video", payload: videoPayload }
        ]
      );
    } catch (err) {
      console.error("[PLAY CMD ERROR]", err.message);
      return nayan.sendMessage(senderId, { text: "⚠️ Something went wrong" });
    }
  }
};
