//-core
const path = require('path');
//-npm
const express = require('express');
const chalk = require('chalk');

// SECTION:
const app = express();

// SECTION:

const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

// SECTION:

app.get('', (req, res) => {
  res.render('index');
});

// SECTION:
const PORT = 3000;

app.listen(PORT, () => {
  console.log(
    chalk.hex('#26a65b').bold(`Express Server running on port ${PORT} ...👩‍💻`)
  );
});
