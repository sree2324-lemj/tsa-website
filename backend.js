const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for plain text and static file serving
app.use(cors())
app.use(express.text()); 
app.use(express.static(__dirname));



app.post('/feedback2', (req, res) => {
    const userFeedback = req.body; 
    const filePath = path.join(__dirname, 'feedback.txt');
    console.log(`feedback2 called and ${filePath} set`)
    // Appending string to file asynchronously
    fs.appendFile(filePath, userFeedback + '\n', (err) => {
        if (err) return res.status(500).send('Error writing to file');
        res.send('Saved to feedback.txt');
    });
    fs.readFile(filePath,'utf8',(err,data)=>{
        if (err) throw err;
        console.log(data)
    })
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
