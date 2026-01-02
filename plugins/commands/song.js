const axios = require('axios');
const yts = require('yt-search');

module.exports = {
  config: {
    name: 'song',
    aliases: ['music'],
    prefix: true,
    permission: 0,
    category: "media"
  },

  start: async function ({ senderId, args, nayan }) {
    const query = args.join(' ');
    if (!query) {
      return nayan.sendMessage(senderId, {
        text: '🎵 Usage: /song <song name>'
      });
    }

    const search = await yts(query);
    const videos = search.videos.slice(0, 6);

    if (!videos.length) {
      return nayan.sendMessage(senderId, { text: '❌ No song found' });
    }

    let msg = `🎧 Song Results for: ${query}\n\n`;
    videos.forEach((v, i) => {
      msg += `${i + 1}. ${v.title}\n`;
    });
    msg += `\nReply with (1-6) to download audio 🎶`;

    const sent = await nayan.sendMessage(senderId, { text: msg });

    
    global.client.handleReply.push({
      name: 'song',
      messageID: sent.message_id || sent.mid,
      author: senderId,
      videos
    });
  },

  handleReply: async function ({ senderId, text, replyTo, nayan, event }) {
    const index = parseInt(text);
    if (isNaN(index) || index < 1 || index > 6) return;
    

    const video = replyTo.videos[index - 1];
    if (!video) return;

    await nayan.sendMessage(senderId, {
      text: `⏬ Downloading:\n${video.title}`
    });

    const api = `https://nayan-video-downloader.vercel.app/ytdown?url=${encodeURIComponent(video.url)}`;
    const { data } = await axios.get(api);
    console.log(data)

    if (!data.status) {
      return nayan.sendMessage(senderId, { text: '❌ Download failed' });
    }

    await nayan.sendMessage(senderId, {
      attachment: {
        type: 'audio',
        payload: {
          url: data.data.audio
        }
      }
    });
    global.client.handleReply = global.client.handleReply.filter(
      r => r.messageID !== replyTo.messageID
    );
  }
};
