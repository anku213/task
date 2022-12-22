const express = require('express')
const prescription = express.Router();

const {getPrescription, postPrescription, putPrescription, deletePrescription} = require('../Controller/tbl_prescription')

prescription.get('/prescription', getPrescription);
prescription.post('/prescription', postPrescription);
prescription.put('/prescription/:prescription_no', putPrescription);
prescription.delete('/prescription/:prescription_no', deletePrescription);

module.exports = prescription;