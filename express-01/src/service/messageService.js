let messages = [];
let nextId = 1;

const getAllMessages = async () => messages;

const getMessageById = async (id) =>
  messages.find((m) => m.id === Number(id)) || null;

const createMessage = async ({ text, userId }) => {
  const message = { id: nextId++, text, userId };
  messages.push(message);
  return message;
};

const updateMessage = async (id, { text }) => {
  const message = messages.find((m) => m.id === Number(id));
  if (!message) return null;
  if (text !== undefined) message.text = text;
  return message;
};

const deleteMessage = async (id) => {
  const index = messages.findIndex((m) => m.id === Number(id));
  if (index === -1) return false;
  messages.splice(index, 1);
  return true;
};

export default {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
};