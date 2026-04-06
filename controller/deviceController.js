import { nextId, readCollection, writeCollection } from "../services/jsonStore.js";

const DEVICES_FILE = "devices.json";

export const getDevices = async (req, res, next) => {
  try {
    const devices = await readCollection(DEVICES_FILE);
    res.json(devices);
  } catch (error) {
    next(error);
  }
};

export const getDeviceById = async (req, res, next) => {
  try {
    const devices = await readCollection(DEVICES_FILE);
    const device = devices.find((item) => item.id === req.resourceId);

    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }

    res.json(device);
  } catch (error) {
    next(error);
  }
};

export const createDevice = async (req, res, next) => {
  try {
    const devices = await readCollection(DEVICES_FILE);
    const device = { id: nextId(devices), name: req.body.name };
    devices.push(device);
    await writeCollection(DEVICES_FILE, devices);
    res.status(201).json({ message: "Device created", device });
  } catch (error) {
    next(error);
  }
};

export const updateDevice = async (req, res, next) => {
  try {
    const devices = await readCollection(DEVICES_FILE);
    const index = devices.findIndex((item) => item.id === req.resourceId);

    if (index === -1) {
      return res.status(404).json({ message: "Device not found" });
    }

    devices[index] = { ...devices[index], name: req.body.name };
    await writeCollection(DEVICES_FILE, devices);
    res.json({ message: "Device updated", device: devices[index] });
  } catch (error) {
    next(error);
  }
};

export const deleteDevice = async (req, res, next) => {
  try {
    const devices = await readCollection(DEVICES_FILE);
    const index = devices.findIndex((item) => item.id === req.resourceId);

    if (index === -1) {
      return res.status(404).json({ message: "Device not found" });
    }

    const [deletedDevice] = devices.splice(index, 1);
    await writeCollection(DEVICES_FILE, devices);
    res.json({ message: "Device deleted", device: deletedDevice });
  } catch (error) {
    next(error);
  }
};
