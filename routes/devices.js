// route.js
import { Router } from 'express';
import { join } from 'path';
import { createDevice, getDeviceById, getDevices } from '../controller/deviceController.js';

const devices = Router();

// Devices routes
devices.get('/devices', getDevices);
devices.post('/addDevice', createDevice);
devices.get('/devices/:id', getDeviceById);


export default devices;
