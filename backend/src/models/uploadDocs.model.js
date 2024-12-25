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
        filePathResult_12th: {
            type: Sequelize.STRING, // This will store the path or URL of the uploaded file
            allowNull: false // Make this mandatory if you want to ensure a file is always uploaded
        },
        fileTypeResult_12th:{
            type: Sequelize.STRING,
            allowNull: false
        },
        aadharCard:{
            type: Sequelize.STRING,
            allowNull: false
        },
        filePathAadharCard: {
            type: Sequelize.STRING, // This will store the path or URL of the uploaded file
            allowNull: false // Make this mandatory if you want to ensure a file is always uploaded
        },
        fileTypeAadharCard: {
            type: Sequelize.STRING, // This will store the path or URL of the uploaded file
            allowNull: false // Make this mandatory if you want to ensure a file is always uploaded
        },
        panCard:{
            type: Sequelize.STRING,
            allowNull: false
        },
        filePathPanCard: {
            type: Sequelize.STRING, // This will store the path or URL of the uploaded file
            allowNull: false // Make this mandatory if you want to ensure a file is always uploaded
        },
        fileTypePanCard: {
            type: Sequelize.STRING, // This will store the path or URL of the uploaded file
            allowNull: false // Make this mandatory if you want to ensure a file is always uploaded
        },
        mhtcetResult:{
            type: Sequelize.STRING,
            allowNull: false, 
        },
        filePathMhtcetResult: {
            type: Sequelize.STRING, // This will store the path or URL of the uploaded file
            allowNull: false // Make this mandatory if you want to ensure a file is always uploaded
        },
        fileTypeMhtcetResult: {
            type: Sequelize.STRING, // This will store the path or URL of the uploaded file
            allowNull: false // Make this mandatory if you want to ensure a file is always uploaded
        },
        admissionCard:{
            type: Sequelize.STRING,
            allowNull: false
        },
        filePathAdmissionCard:{
            type: Sequelize.STRING,
            allowNull: false
        },
        fileTypeAdmissionCard:{
            type: Sequelize.STRING,
            allowNull: false
        },
        capCard:{
            type: Sequelize.STRING,
            allowNull: false
        },
        filePathCapCard:{
            type: Sequelize.STRING,
            allowNull: false
        },
        fileTypeCapCard:{
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
        },
        filePath:{
            type: Sequelize.STRING,
            allowNull: false
        },
        fileType:{
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return upload_docs;
};