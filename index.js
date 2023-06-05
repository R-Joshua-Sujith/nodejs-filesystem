const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

//POST REQUEST TO CREATE FILE
app.post('/createfile', (req, res) => {
    const folderPath = './dates';

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().replace(/[-:.TZ]/g, '');
    const filename = `${formattedDate}.txt`;

    const filePath = path.join(folderPath, filename);

    const timestamp = new Date().toISOString();

    fs.writeFile(filePath, timestamp, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to create the file' });
        }

        return res.status(200).json({ message: 'File created successfully' });
    });
});

//GET REQUEST TO RETRIEVE FILES
app.get('/textFiles', (req, res) => {
    const folderPath = './dates';

    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read the folder' });
        }

        const textFiles = files.filter((file) => {
            const filePath = path.join(folderPath, file);
            const fileExtension = path.extname(filePath);
            return fileExtension === '.txt';
        });

        return res.status(200).json({ textFiles });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
