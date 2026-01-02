const axios = require("axios");

module.exports = {
  config: { payload: "img_tool" },

  start: async ({ nayan, event, senderId }) => {
    let data;

    try {
      data = JSON.parse(event.postback.payload);
    } catch {
      return nayan.sendMessage(senderId, { text: "❌ Invalid payload" });
    }


    if (data.type !== "img_tool") return;


    
    const { mode, url} = data;
    const tool = mode || data.tool
    //console.log(tool)
    const encodedUrl = encodeURIComponent(url);

    
    const datas = await axios.get(`https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/refs/heads/main/api.json`)


    const apiLinks = datas.data.api
    let apiUrl;
    switch (tool) {
      case "upscale": apiUrl = `${apiLinks}/nayan/upscale?url=${encodedUrl}`; return;
      case "enhance": apiUrl = `${apiLinks}/nayan/enhanced?url=${encodedUrl}`; break;
      case "rmtext": apiUrl = `${apiLinks}/nayan/rmtext?url=${encodedUrl}`; break;
      case "rmwtmk": apiUrl = `${apiLinks}/nayan/rmwtmk?url=${encodedUrl}`; break;
      case "ocr": apiUrl = `${apiLinks}/nayan/ocr?url=${encodedUrl}`; break;
      case "rmbg": apiUrl = `${apiLinks}/nayan/rmbg?url=${encodedUrl}`; break;
      default: return nayan.sendMessage(senderId, { text: "❌ Unknown tool" });
    }

   /* const d = apiLinks[mode];
    console.log(d)
    const rl = d.link*/

    const waitMsg = await nayan.sendMessage(senderId, { text: "⏳ Processing img" });

    try {
      
      const res = await axios.get(apiUrl);
      let imageUrl;

      if (tool === "ocr") {
        return nayan.sendMessage(senderId, { text: `📄 Extracted Text:\n${res.data.text || "Nothing found"}` });
      } else {
        imageUrl = res.data.upscaled || res.data.enhanced_image || res.data.removed_text_image || res.data.watermark_removed_image || res.data.removed_background_image;
      }

      if (!imageUrl) return nayan.sendMessage(senderId, { text: "❌ Failed to process image." });

      await nayan.sendMessage(senderId, {
        attachment: { type: "image", payload: { url: imageUrl } }
      });

    } catch (err) {
     // console.error(err);
      await nayan.sendMessage(senderId, { text: "❌ Error processing image." });
    }
  }
};
