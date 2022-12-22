const express = require('express')
const medicine = express.Router();

const {getPrescription, postPrescription, putPrescription, deletePrescription} = require('../Controller/prescribed_medicine')

medicine.get('/medicine', getPrescription);
medicine.post('/medicine', postPrescription);
medicine.put('/medicine/:prescription_no', putPrescription);
medicine.delete('/medicine/:prescription_no', deletePrescription);

module.exports = medicine ;