const con = require('../Modal/Connection')

let getPrescription = async (req, res) => {
    try {
        const data = "SELECT * FROM tbl_prescribed_medicine"
        await con.query(data, (err, result) => {
            if (err) {
                return res.send({ status: 400, response: err.sqlMessage })
            } else {
                return res.send({ status: 200, response: result })
            }
        })
    } catch (err) {
        return res.send({ status: 400, response: err.sqlMessage })
    }    
};
  
let postPrescription = async (req, res) => {
    try {
        const data = req.body;
        const querry = 'INSERT INTO tbl_prescribed_medicine  SET ?';
        await con.query(querry,data, (err, result) => {
            if (err) throw err;
            return res.status(200).json({ result });

        });
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
};

let putPrescription = async (req, res) => {
    try {
        data = [req.body, req.params.prescription_no]
        q3 = "UPDATE tbl_prescription SET ? WHERE tbl_prescribed_medicine = ?";
        await con.query(q3, data, (err, result) => {
            if (err) {
                res.send(err.sqlMessage);
            } res.send(result);
        })
    } catch (err) {
        res.send(err.sqlMessage);
    }
}

let deletePrescription = async (req, res) => {
    try {
        data = req.params.prescription_no;
        q4 = "DELETE FROM tbl_prescription WHERE tbl_prescribed_medicine = ?"
        await con.query(q4, data, (err, result) => {
            if (err) {
                return res.send(err.sqlMessage);
            } return res.send(result);
        })
    } catch (err) {
        return res.send(result);
    }
}

module.exports = { getPrescription, postPrescription, putPrescription, deletePrescription }