const express = require('express');
const app = express();
const pengunjungRoutes = require('./routes/ijaldb.js');
require('dotenv').config();
const port = process.env.PORT;

app.use(express.json());

app.use('/pengunjung', pengunjungRoutes);
const db = require('./database/db');

// Mengatur view engine EJS
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {
        layout: 'layouts/main-layout'
    });
});

app.get('/contact',isAuthenticated, (req, res) => {
    res.render('contact',{
        layout: 'layouts/main-layout',
    });
});


app.get('/ijal-view', (req, res) => {
    db.query('SELECT * FROM pengunjung', (err, pengunjung) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.render('ijal', {
            layout: 'layouts/main-layout',
            pengunjung: pengunjung
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
