const dbconfig = require("../config/db.config.js");

const Sequelize= require("sequelize");
const dashboardModel = require("./dashboard.model.js");
const signupModel = require("./signup.model.js");
const loginModel = require("./login.model.js");
const uploadDocsModel = require("./uploadDocs.model.js");
//const marksModel = require("./marks.model.js");

const sequelize = new Sequelize(dbconfig.DB,dbconfig.USER,dbconfig.PASSWORD, {
    host: dbconfig.HOST,
    dialect: dbconfig.dialect,
    //operatorsAliases: false,

    pool: {
        max: dbconfig.pool.max,
        min: dbconfig.pool.min,
        acquire: dbconfig.pool.acquire,
        idle: dbconfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.signup = signupModel( sequelize, Sequelize );
db.login = loginModel( sequelize, Sequelize );
db.dashboard = dashboardModel( sequelize, Sequelize );
db.uploadDocs = uploadDocsModel( sequelize, Sequelize );
//db.marks = marksModel( sequelize, Sequelize );

//Define Associations


module.exports = db;
db.dashboard.associate = (models) => {
    db.dashboard.hasOne(models.uploadDocs, {foreignKey: 'dashboardId' });
   // db.dashboard.hasOne(models.marks, {foreignKey: 'dashboardId'});
};

db.signup.hasOne(db.dashboard, {foreignKey: 'studentForeignId'});
db.dashboard.belongsTo(db.signup, {foreignKey: 'studentForeignId'});

Object.keys(db).forEach(modelName => {
    if(db[modelName].associate){
        db[modelName].associate(db);
    }
});