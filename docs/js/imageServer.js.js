const express = require('express');
const sharp = require('sharp');
const app = express();
const port = 3000;

app.get('/generate-image', async (req, res) => {
    const { title } = req.query; // Récupère le titre depuis la query string
    try {
        const image = await sharp('./images/post/Image-post-001.png')
            .composite([{
                input: Buffer.from(`<svg><text x="10" y="20" fill="white" font-size="20" font-family="Arial">${title}</text></svg>`),
                top: 0,
                left: 0,
                blend: 'over'
            }])
            .toBuffer();
        res.type('image/png').send(image);
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).send('Error processing image');
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
