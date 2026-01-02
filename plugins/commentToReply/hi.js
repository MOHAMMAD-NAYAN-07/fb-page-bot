module.exports = {
  config: {
    keywords: ["hi", "hello", "hey", "hle"]
  },

  run: async ({ commentId, sender, replyToComment, nayan}) => {
    await replyToComment(
      commentId,
      `@[${sender.id}] 👋 Hey! How can I help you? 😊`
    );
    return true; // stop others
  }
};
