const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware for plain text and static file serving
app.use(express.text()); 
app.use(express.static(__dirname));



app.post('/save', (req, res) => {
    const userInput = req.body; 
    const filePath = path.join(__dirname, 'feedback.txt');

    // Appending string to file asynchronously
    fs.appendFile(filePath, userInput + '\n', (err) => {
        if (err) return res.status(500).send('Error writing to file');
        res.send('Saved to feedback.txt');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
