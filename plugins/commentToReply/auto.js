module.exports = {
  run: async ({ commentId, sender, replyToComment }) => {
    await replyToComment(
      commentId,
      `@[${sender.id}] ❤️ Thanks for your comment!`
    );
    return true;
  }
};
