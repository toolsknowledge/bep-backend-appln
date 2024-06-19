const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const connectDB = require('./db_connection/db_connection'); 

const app = express();

// Load Swagger document
const swaggerDocument = YAML.load(path.join(__dirname, './docs/swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/signup', require('./routes/signup'));

const PORT = process.env.PORT || 9090;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






// const express = require('express');
// const app = express();
// const connectDB = require("./db_connection/db_connection");

// //swagger
// const swaggerUi = require("swagger-ui-express");
// const YAML = require('yamljs');
// const path = require('path');

// // Load Swagger document
// const swaggerDocument = YAML.load(path.join(__dirname, './docs/swagger.yaml'));
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.use(express.json());

// //connect to db
// connectDB();

// app.use('/api/signup', require('./routes/signup'));

// const PORT = process.env.PORT || 9090;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

