const fs = require('fs-extra');
const sharp = require('sharp');
const path = require('path');

const postsDirectory = '/Users/admin/Desktop/Orbii-blog/src/en/posts';
const outputDirectory = '/Users/admin/Desktop/Orbii-blog/src/images/posts/en/';
const defaultImagePath = '/Users/admin/Desktop/Orbii-blog/src/images/posts/Image-post-001.jpeg';

// Assurez-vous que le répertoire de sortie existe
fs.ensureDirSync(outputDirectory);

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

async function generateImage(title, authors, outputFile) {
    const titleLines = wrapText(title, 15);
    const authorLines = authors ? wrapText(authors, 30) : [];

    console.log(`Generating image for title: "${title}" and authors: "${authors}"`);

    try {
        const backgroundBuffer = await fs.readFile(defaultImagePath);
        const svg = `<svg width="800" height="600">
            <style>
                .title { fill: #2c3e50; font-size: 60px; font-family: 'Georgia'; font-weight: bold; }
                .authors { fill: white; font-size: 40px; font-family: 'Arial'; font-weight: bold; }
            </style>
            ${titleLines.map((line, index) => `<text x="300" y="${70 + index * 65}" class="title">${line}</text>`).join('')}
            ${authorLines.map((line, index) => `<text x="300" y="${70 + titleLines.length * 65 + 50 + index * 30}" class="authors">${line}</text>`).join('')}
        </svg>`;

        const image = await sharp(backgroundBuffer)
            .composite([{ input: Buffer.from(svg), top: 0, left: 0, blend: 'over' }])
            .withMetadata({ comment: "Visit www.orbii.fr for more information." })
            .toBuffer();

        await fs.writeFile(outputFile, image);
        console.log(`Image successfully generated: ${outputFile}`);
    } catch (error) {
        console.error(`Error generating image: ${error}`);
    }
}

// Utiliser fs.readdir pour lister les fichiers dans le répertoire
fs.readdir(postsDirectory, (err, files) => {
    if (err) {
        console.error("Error reading directory:", err);
        return;
    }

    const markdownFiles = files.filter(file => file.endsWith('.md')); // Ne garder que les fichiers .md

    console.log(`Found ${markdownFiles.length} Markdown files.`);

    markdownFiles.forEach(async (file) => {
        console.log(`Processing file: ${file}`);
        try {
            const content = await fs.readFile(path.join(postsDirectory, file), 'utf8');
            const titleMatch = content.match(/^title: (.+)$/m);
            const authorsMatch = content.match(/^authors: (.+)$/m);
            const title = titleMatch ? titleMatch[1] : 'No Title';
            const authors = authorsMatch ? authorsMatch[1] : '';

            const slug = path.basename(file, '.md');
            const outputFile = path.join(outputDirectory, `${slug}.jpeg`);

            await generateImage(title, authors, outputFile);
        } catch (error) {
            console.error(`Error processing file: ${file}. ${error}`);
        }
    });
});
