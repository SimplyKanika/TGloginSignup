//const { sequelize, Sequelize } = require(".");

module.exports = (sequelize , Sequelize) => {
    const Dashboard = sequelize.define('dashboard',{
        dashboard_primary_key: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        student_foregin_id:{
            type: Sequelize.INTEGER,
            references: {
                model: 'signup',
                key: 'id'
            },
            allowNull: false
        }
    });

    return Dashboard;
};