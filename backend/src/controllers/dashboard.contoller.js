const { get } = require('http');
const db = require('../models/index');
const multer = require('multer');
const path = require('path');
//const { default: Dashboard } = require('../../../frontend/src/Components/Dashboard');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { documentType } = req.body;
        let dest = 'backend/uploads';

        switch( documentType ){
            case 'aadharCard':
                dest = 'backend/uploads/aadharCard';
                break;
            case 'panCard':
                dest = 'backend/uploads/panCard';
                break;
            case 'mhtcetResult':
                dest = 'backend/uploads/mhtcetResult';
                break;
            case 'result_12th':
                dest = 'backend/uploads/result_12';
                break;
            case 'admissionCard':
                dest = 'backend/uploads/admissionCard';
                break;
            case 'capCard':
                dest = 'backend/uploads/capCard';
                break;
            case 'domicile' || 'birthCertificate' || 'leavingCertificate':
                dest = 'backend/uploads/domicile';
                break;
            default:
                dest = 'backend/uploads/other';
                break;
        }
        cb(null, dest);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+ '-' +file.originalname);
    }
});

const upload = multer({ storage: storage}).single('file');

const uploadDocument = async(req, res) => {
    upload(req, res, async(err) => {
        if(err){
            return res.status(500).json({ message: 'File upload failed', error: err })
        }

        try{
            const { result_12th, aadharCard, panCard, mhtcetResult, admissionCard, capCard, domicile, birthCertificate, leavingCertificate, studentForeginId } = req.body;

            const uploadDoc = await db.uploadDocs.create({
                Dashboard_id: req.body.Dashboard, //We need to ensure to pass this in the request
                result_12th,
                aadharCard,
                panCard,
                mhtcetResult,
                capCard,
                domicile,
                birthCertificate,
                leavingCertificate,
                filePath: req.file.path,
                fileType: req.file.mimetype
            });
            
            res.status(201).json({ 
                message: 'Document uploaded successfully',
                data: uploadDoc
            });
        } catch(error){
            console.error(error);
            res.status(500).json({ message: 'Error saving the document to database', err });
        }
    });
};

const getDocuments = async(req, res) => {
    try{
        const documents = await db.uploadDocs.findAll();
        res.status(200).json({ documents });
    } catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error retrieving documents', error });
    }
};

module.exports = {
    uploadDocument,
    getDocuments
};