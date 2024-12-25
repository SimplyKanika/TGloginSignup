// const Sequelize = require('sequelize');
// const sequelize = require('../config/db.config');

const { Result } = require("ethers");

module.exports = (sequelize, Sequelize) => {
    const upload_docs = Sequelize.define('DocumentsDuringAdmission',{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Dashboard_id:{
            type: Sequelize.INTEGER,
            references: {
                model: 'dashboard',
                key: 'dashboard_primary_key'
            }
        },
        result_12th:{
            type: Sequelize.STRING,
            allowNull: false
        },
        aadharCard:{
            type: Sequelize.STRING,
            allowNull: false
        },
        panCard:{
            type: Sequelize.STRING,
            allowNull: false
        },
        mhtcetResult:{
            type: Sequelize.STRING,
            allowNull: false, 
        },
        admissionCard:{
            type: Sequelize.STRING,
            allowNull: false
        },
        capCard:{
            type: Sequelize.STRING,
            allowNull: false
        },
        domicile:{
            type: Sequelize.STRING,
            allowNull: true
        },
        birthCertificate:{
            type: Sequelize.STRING,
            allowNull: true
        },
        leavingCertificate:{
            type: Sequelize.STRING,
            allowNull: true
        }
    });

    return upload_docs;
};