const express = require('express');
const sharp = require('sharp');
const path = require('path');
const app = express();
const port = 3000;

// Fonction pour diviser le texte en lignes
function wrapText(text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = currentLine.length + word.length + 1;
        if (width < maxWidth) {
            currentLine += ' ' + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

app.get('/generate-image', async (req, res) => {
    const { title, authors } = req.query;  // Récupération du titre et de l'auteur de la requête
    const titleLines = wrapText(title, 15);  // Division du titre en lignes
    const authorLine = authors ? wrapText(authors, 30) : [];  // Division de l'auteur en ligne, si fourni

    const textSVG = `<svg width="800" height="600">
      <style>
        .title { fill: #2c3e50; font-size: 70px; font-family: 'Georgia'; font-weight: bold; }
        .authors { fill: white; font-size: 40px; font-family: 'Arial'; font-weight: bold; }
      </style>
      ${titleLines.map((line, index) => `<text x="300" y="${70 + index * 65}" class="title">${line}</text>`).join('')}
      ${authorLine.map((line, index) => `<text x="300" y="${70 + titleLines.length * 65 + 50 + index * 30}" class="authors">${line}</text>`).join('')}
    </svg>`;

    const imagePath = path.resolve(__dirname, '../images/posts/Image-post-001.png');

    try {
        const image = await sharp(imagePath)
            .composite([{
                input: Buffer.from(textSVG),
                top: 0,
                left: 0,
                blend: 'over'
            }])
            .withMetadata({
                comment: "Visit www.orbii.fr for more information."  // Ajout d'une métadonnée sous forme de commentaire
            })
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
