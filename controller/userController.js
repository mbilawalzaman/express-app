import { nextId, readCollection, writeCollection } from "../services/jsonStore.js";

const USERS_FILE = "users.json";

export const getUsers = async (req, res, next) => {
  try {
    const users = await readCollection(USERS_FILE);
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const users = await readCollection(USERS_FILE);
    const user = users.find((item) => item.id === req.resourceId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const users = await readCollection(USERS_FILE);
    const user = { id: nextId(users), name: req.body.name };
    users.push(user);
    await writeCollection(USERS_FILE, users);
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const users = await readCollection(USERS_FILE);
    const index = users.findIndex((item) => item.id === req.resourceId);

    if (index === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    users[index] = { ...users[index], name: req.body.name };
    await writeCollection(USERS_FILE, users);
    res.json({ message: "User updated", user: users[index] });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const users = await readCollection(USERS_FILE);
    const index = users.findIndex((item) => item.id === req.resourceId);

    if (index === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    const [deletedUser] = users.splice(index, 1);
    await writeCollection(USERS_FILE, users);
    res.json({ message: "User deleted", user: deletedUser });
  } catch (error) {
    next(error);
  }
};
