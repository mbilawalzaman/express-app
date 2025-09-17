// route.js
import { Router } from 'express';
import { join } from 'path';
import { getUsers, createUser, getUserById } from '../controller/userController.js';

const router = Router();

// Home route
router.get('/', (req, res) => {
    res.sendFile(join(process.cwd(), 'views', 'index.html'));
});

// Users routes
router.get('/users', getUsers);
router.post('/addUser', createUser);
router.get('/users/:id', getUserById);


export default router;
