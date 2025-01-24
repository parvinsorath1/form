const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs'); // Set EJS as templating engine
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// MongoDB Connection

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error:', err));

app.get('/', (req, res) => {
        res.render('index'); // Render the "form.ejs" file
});

app.post('/submit', async (req, res) => {
    try {
        const { name, age, gender, mobile } = req.body;
        const newUser = new User({ name, age, gender, mobile });
        await newUser.save();

        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Success</title>
                <style>
                    body {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        font-family: Arial, sans-serif;
                        background-color: #f7f7f7;
                    }
                    .message {
                        text-align: center;
                        padding: 20px;
                        background: #fff;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #28a745;
                        margin-bottom: 10px;
                        font-size: 1.5rem;
                    }
                    a {
                        text-decoration: none;
                        color: #007bff;
                        font-weight: bold;
                        transition: color 0.3s ease;
                    }
                    a:hover {
                        color: #0056b3;
                    }
                </style>
            </head>
            <body>
                <div class="message">
                    <h1>Data submitted successfully!</h1>
                    <a href="/">Go back</a>
                </div>
            </body>
            </html>
        `);
    } catch (error) {
        res.status(500).send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Error</title>
                <style>
                    body {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        font-family: Arial, sans-serif;
                        background-color: #f7f7f7;
                    }
                    .message {
                        text-align: center;
                        padding: 20px;
                        background: #fff;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #dc3545;
                        margin-bottom: 10px;
                        font-size: 1.5rem;
                    }
                </style>
            </head>
            <body>
                <div class="message">
                    <h1>Error saving user data.</h1>
                </div>
            </body>
            </html>
        `);
    }
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
