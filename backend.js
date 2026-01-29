const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = required('cors');
const app = express();
const PORT = 3000;

// Middleware for plain text and static file serving
app.use(express.text()); 
app.use(cors)
app.use(express.static(__dirname));


app.post('/save', (req, res) => {
    const userInput = req.body; 
    const filePath = path.join(__dirname, 'user_data.txt');

    // Appending string to file asynchronously
    fs.appendFile(filePath, userInput + '\n', (err) => {
        if (err) return res.status(500).send('Error writing to file');
        res.send('Saved to user_data.txt');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
