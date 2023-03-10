const express = require('express');
const app = express();
const port = 8080;
const contentTypesRoutes = require('./src/routes/contentTypesRoutes');

app.use(express.json());
app.use('/', contentTypesRoutes);
app.get('/', (req, res) => res.send('Hello World!'));


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
