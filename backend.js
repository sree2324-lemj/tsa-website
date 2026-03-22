const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { flushCompileCache } = require('module');
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
        console.log("before reading file")
        fs.readFile(filePath,'utf8',(err,data)=>{
            if (err) console.error(err);
            console.log('file content:',data);
            res.send('Saved to feedback.txt');
        })
    }); 
});

app.post('/likes', (req,res) => {
    const resourceName = req.body;
    const filePath = path.join(__dirname, 'resource_likes.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading file');
        likesData = JSON.parse(data);
        if (likesData[resourceName]) {
            likesData[resourceName] += 1; 
        } 
        fs.writeFile(filePath, JSON.stringify(likesData), (err) => {
            if (err) return res.status(500).send('Error writing to file');
            res.send(`Liked ${resourceName}`);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
