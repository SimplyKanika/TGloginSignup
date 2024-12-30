module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "Aayush@05",
    DB: "testDB",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};