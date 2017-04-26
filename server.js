const express = require('express');
const path = require('path');
const app = express();
const PORT = 9000;

app.use(express.static(path.join(__dirname, 'build')));

// Serve static file
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, function() {
  console.log(`server is listening on port ${PORT}`)
});