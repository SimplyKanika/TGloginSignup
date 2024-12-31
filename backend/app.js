const express = require('express');
const cors = require('cors');

const app = express();

var corsOption = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOption));

app.use(express.json());

app.use(express.urlencoded({ extended: true}));

app.get("/",(req,res) => {
    res.json({ message: "Welcome to the Website "})
})

//initializing the db in the main server
const db = require("./src/models");
db.sequelize.sync()
   .then(() => {
    console.log("synced db");
   })
   .catch((err) => {
    console.log("Failed to sync db"+err.message);
   });

   //With all the commentend part I was kinding of facing some issue so deleted that part
// db.sequelize.sync({ force: true }).then(() =>{
//     console.log("Drop and re-sync db.");
// });

// sequelize.sync({ force: true }) // Force sync to recreate tables
//     .then(() => {
//         console.log("Database & tables created!");
//     })


//IMPORTING AND USING ROUTES
const signupRoutes = require('./src/routes/signup.route');
app.use('/signup', signupRoutes);

const loginRoutes = require('./src/routes/login.route');
app.use('/', loginRoutes);

const dashboardRoutes = require('./src/routes/dashboard.route');
app.use('/dashboard', dashboardRoutes);
//Importing Dashboard routes
// const dashboardRoutes = require('./src/routes/dashboard.route');
// app.use('/api/dashboard', dashboardRoutes);
 const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
    console.log(` server running at port ${PORT}  `);
});