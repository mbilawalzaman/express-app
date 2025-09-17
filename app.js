import express, { json } from 'express';
import routes from './routes/route.js';
const app = express();


// Middleware to parse JSON
app.use(json());

app.use('/', routes); 

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
