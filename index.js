const express = require('express'); 
const mongoose = require('mongoose'); // get the instance of mongoose
const cookieSession = require('cookie-session'); // library to handle cookie sessions
const passport = require('passport'); // to let passport know about cookies
const bodyParser = require('body-parser'); // to parse the req body
const authRoutes = require('./routes/authRoutes'); //instance of routing module authRoutes
const billingRoutes = require('./routes/billingRoutes');
const keys = require('./config/keys');
require('./models/users');  // create a collection in mongooseDB
require('./services/passport'); // The passport service which has to be executed on index.js



mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express(); //Get the instance of express application

// middleware
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]  //allows array of keys and hence the square brackets
    })
);
app.use(passport.initialize());
app.use(passport.session());

// routes to handle network requests
authRoutes(app);
billingRoutes(app);

//During production the express has to deal with react paths
if (process.env.NODE_ENV === 'production') {
    // Express has to serve the production react asset
    app.use(express.static('client/build'));

    //Express has to serve up index.html file
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });

}

const PORT = process.env.PORT || 5000; //Decide the port at runtime when deployed on herouku
app.listen(PORT); // Start the server to listen for client requests