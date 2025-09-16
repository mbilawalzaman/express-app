const express = require('express');
const app = express();
const routes = require('./routes/route');


// Middleware to parse JSON
app.use(express.json());

app.use('/', routes); 

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
