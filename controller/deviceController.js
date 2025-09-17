import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read JSON dynamically
const usersPath = join(__dirname, '..', 'user.json');
const usersData = JSON.parse(await readFile(usersPath, 'utf-8'));

export const getDevices = (req, res) => {
  res.json(usersData);
};

export const createDevice = async (req, res) => {
  const { name } = req.body;

  const newId = usersData.length ? usersData[usersData.length - 1].id + 1 : 1;
  const newUser = { id: newId, name };

  // Add to in-memory array
  usersData.push(newUser);

  try {
    // Persist to user.json
    await writeFile(usersPath, JSON.stringify(usersData, null, 2), 'utf-8');
    res.status(201).json({ message: 'User created', user: newUser });
  } catch (err) {
    console.error('Error writing to user.json:', err);
    res.status(500).json({ message: 'Failed to save user' });
  }
};

export const getDeviceById = (req, res) => {
  const user = usersData.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};
