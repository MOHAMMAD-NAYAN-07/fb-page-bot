module.exports = {
  config: {
    payload: "help"
  },
  start: async ({ senderId, nayan, event }) => {
    console.log(event)
    return nayan.sendMessage(senderId, { text: "This is help info via postback button." });
  }
};
