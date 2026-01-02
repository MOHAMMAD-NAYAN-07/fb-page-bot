

module.exports = {
  config: {
    name: "img",
    description: "AI Image Tools",
    permission: 0,
    prefix: true,
    category: "Tools",
  },

  start: async ({senderId, nayan, event }) => {
    

    

    
      const sentMsg = await nayan.sendMessage(senderId, { text: "📸 Send Image Reply With This Msg." });

      // Store handleReply info
      global.client.handleReply.push({
        name: "img",
        messageID: sentMsg.message_id,
        author: senderId
      });

    return;
  },
    


  handleReply: async ({senderId, nayan, event, handleReply }) => {
   
    const image = event.message.attachments

    const type = image[0].type
    const imgUrl = image[0].payload.url

    if (!type === "image" || !imgUrl) {
      return nayan.sendMessage(event.senderId, { text: "❌ Reply must contain a photo." });
    }
    

    
    const buttons = [
      { type: "postback", title: "1️⃣ Upscale", payload: JSON.stringify({ type: "img_tool", mode: "upscale", url: imgUrl }) },
      { type: "postback", title: "2️⃣ Enhance", payload: JSON.stringify({ type: "img_tool", mode: "enhance", url: imgUrl }) },
      { type: "postback", title: "3️⃣ Remove Text", payload: JSON.stringify({ type: "img_tool", mode: "rmtext", url: imgUrl }) },

    ];

    const button2 = [
      { type: "postback", title: "4️⃣ Remove Watermark", payload: JSON.stringify({ type: "img_tool", tool: "rmwtmk", url: imgUrl }) },
      { type: "postback", title: "5️⃣ OCR", payload: JSON.stringify({ type: "img_tool", tool: "ocr", url: imgUrl }) },
      { type: "postback", title: "6️⃣ Remove Background", payload: JSON.stringify({ type: "img_tool", mode: "rmbg", url: imgUrl })},
    ]

    await nayan.sendGeneric(
      senderId,
      "📸 AI Image Tools",
      imgUrl,
      "Select a tool to process the image",
      buttons
    );

    await nayan.sendGeneric(
      senderId,
      "📸 AI Image Tools",
      imgUrl,
      "Select a tool to process the image",
      button2
    );
  }
};
