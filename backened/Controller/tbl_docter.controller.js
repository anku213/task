const con = require('../Modal/Connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

let getDocter = async (req, res) => {
    try {
        const data = "SELECT * FROM tbl_doctor"
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

let postDocter = async (req, res) => {
    const {
        d_id,
        d_name,
        experience, 
        password,
        contact,
        specilization
    } = req.body;
    if (!d_id ||
        !d_name ||
        !experience ||
        !password ||
        !contact ||
        !specilization
    ) {
        return res.status(422).send({ error: "please fill all the fields properly" })
    }
    const salt = await bcrypt.genSalt(8);
    console.log("salt", salt);
    const pass = await bcrypt.hash(password, salt);
    console.log("pass", pass);

    const data = {
        d_id,
        d_name, 
        experience,
        password: pass,
        contact,
        specilization
    };
    console.log(data);
    try {
        const querry = 'INSERT INTO tbl_doctor SET ?';
        await con.query(querry, data, (err, result) => {
            if (err) throw err;
            return res.status(200).json({ result });

        });
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    } 
};

let postDocterLogin = async (req, res) => {
    try {
        const { d_id, password } = req.body;
        const query1 = "SELECT * FROM tbl_doctor WHERE d_id = ? ";
        await con.query(query1, d_id, async (err, result) => {
            if (err) {
                return res.json({ status: 400, response: err.sqlMessage });
            }
            if (!result.length) {
                return res.json({ status: 400, response: " Please enter a valid Docter Id" });
            }
            const address = result[0].d_id;
            const pass = result[0].password;
            const passCheck = await bcrypt.compare(password, pass);
            if (!passCheck) {
                return res.json({ status: 400, response: "Password not matched" });
            }
            const token = await jwt.sign({ address }, "asdf");
            res.json({ status: 200, response: " Logged Successful", token });
            console.log({token:token});
        });
    } catch (err) {
        res.json({ status: 400, response: "Wrong Docter id or password" });
    }
};

let putDocter = async (req, res) => {
    try {
      data = [req.body, req.params.d_id]
      q3 = "UPDATE tbl_doctor SET ? WHERE d_id = ?";
      await con.query(q3, data, (err, result) => {
        if (err) {
          res.send(err.sqlMessage);
        } res.send(result);
      })
    } catch (err) {
      res.send(err.sqlMessage);
    }
  }

let deleteDocter = async (req, res) => {
    try {
        data = req.params.d_id;
        q4 = "DELETE FROM tbl_doctor WHERE d_id = ?"
        await con.query(q4, data, (err, result) => {
            if (err) {
                return res.send(err.sqlMessage);
            } return res.send(result);
        })
    } catch (err) {
        return res.send(result);
    }
}

module.exports = {getDocter, postDocter, postDocterLogin, putDocter, deleteDocter}
