import express from 'express';
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 8000;
app.get('/', (req, res) => res.send('works!'));

app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});