const express = require('express'); 
const mongoose = require('mongoose'); // get the instance of mongoose
const cookieSession = require('cookie-session'); // library to handle cookie sessions
const passport = require('passport'); // to let passport know about cookies
require('./models/users');  // create a collection in mongooseDB
require('./services/passport'); // The passport service which has to be executed on index.js
const authRoutes = require('./routes/authRoutes'); //instance of routing module authRoutes
const keys = require('./config/keys');


mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express(); //Get the instance of express application

app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]  //allows array of keys and hence the square brackets
    })
);
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

const PORT = process.env.PORT || 5000; //Decide the port at runtime when deployed on herouku
app.listen(PORT); // Start the server to listen for client requests