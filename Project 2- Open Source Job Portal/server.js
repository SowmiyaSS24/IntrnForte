const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');

const app = express();

mongoose.connect('mongodb://localhost:27017/jobportal', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false
}));

app.use(express.static('public'));

app.use('/', authRoutes);
app.use('/jobs', jobRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
