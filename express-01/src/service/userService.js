import AppError from "../utils/appError.js";

let users = [];
let nextId = 1;

const getAllUsers = async () => users;

const getUserById = async (id) =>
  users.find((u) => u.id === Number(id)) || null;

const createUser = async ({ username, email }) => {
  if (users.some((u) => u.email === email)) {
    throw new AppError("E-mail já cadastrado.", 409);
  }
  const user = { id: nextId++, username, email };
  users.push(user);
  return user;
};

const updateUser = async (id, { username, email }) => {
  const user = users.find((u) => u.id === Number(id));
  if (!user) return null;

  if (email !== undefined && users.some((u) => u.email === email && u.id !== user.id)) {
    throw new AppError("E-mail já cadastrado.", 409);
  }

  if (username !== undefined) user.username = username;
  if (email !== undefined) user.email = email;
  return user;
};

const deleteUser = async (id) => {
  const index = users.findIndex((u) => u.id === Number(id));
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};