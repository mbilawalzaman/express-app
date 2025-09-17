import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read JSON dynamically
const usersPath = join(__dirname, '..', 'user.json');
const usersData = JSON.parse(await readFile(usersPath, 'utf-8'));

export const getUsers = (req, res) => {
  res.json(usersData);
};

export const createUser = (req, res) => {
  const newUser = req.body;
  res.status(201).json({ message: 'User created', user: newUser });
};

export const getUserById = (req, res) => {
  const user = usersData.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};
