const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/apiRoutes');
const sequelize = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

app.use('/api', apiRoutes);

sequelize.sync();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
