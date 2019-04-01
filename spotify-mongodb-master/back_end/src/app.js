const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const apiRoute = require('./routes/api');
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  poolSize: 2
}

mongoose.connect('mongodb://localhost/spotify_data', options);

const app = express();
app.use(morgan('combined'));

const whitelist = ['http://localhost:3000'];
const corsOptions = {
    origin: function (origin, callback) {
        console.log(origin);
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app.use('/api', apiRoute);

app.use('/', (req, res) => {
    res.send('It works!')
});





const port = process.env.PORT || 3005;
app.listen(port);
console.log(`Server is running on port ${port}`);
