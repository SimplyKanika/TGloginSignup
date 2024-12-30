module.exports = (sequelize, Sequelize) => {
    const upload_docs = sequelize.define('DocumentsDuringAdmission', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Dashboard_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'dashboard',
                key: 'dashboard_primary_key'
            },
            allowNull: true,
        },
        result_12th: {
            type: Sequelize.STRING,
            allowNull: false
        },
        aadharCard: {
            type: Sequelize.STRING,
            allowNull: false
        },
        panCard: {
            type: Sequelize.STRING,
            allowNull: false
        },
        mhtcetResult: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        admissionCard: {
            type: Sequelize.STRING,
            allowNull: false
        },
        capCard: {
            type: Sequelize.STRING,
            allowNull: false
        },
        domicile: {
            type: Sequelize.STRING,
            allowNull: true
        },
        birthCertificate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        leavingCertificate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        filePath: {
            type: Sequelize.STRING,
            allowNull: false
        },
        fileType: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return upload_docs;
};