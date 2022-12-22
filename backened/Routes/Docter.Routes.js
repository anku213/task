const express = require('express')
const docter = express.Router();

const {getDocter, postDocter, postDocterLogin, putDocter, deleteDocter} = require('../Controller/tbl_docter.controller')

docter.get('/docter', getDocter);
docter.post('/docter', postDocter);
docter.post('/docterlogin', postDocterLogin);
docter.put('/docter/:d_id', putDocter);
docter.delete('/docter/:d_id', deleteDocter);

module.exports = docter;