import React, { useState } from 'react'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import { Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function Prescription() {
    const [noOfRows, setNoOfRows] = useState(1);
    const [itemData, setItemData] = useState([]);

    const [patient_name, setPatient_Name] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [complaint, setComplaint] = useState("");
    const [allergies, setAllergies] = useState("");
    const [address, setAddress] = useState("");
    const [d_id, setD_id] = useState("");
    const [date, setDate] = useState("");
    const [prescription_no, setPrescription_No] = useState("");

    const [product, setProduct] = useState({
        Title: "",
        Description: "",
        Qty: "",
        Price: "",
        Date: ""
    });


    const navigate = useNavigate()

    const postdata = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setProduct({ ...product, [name]: value })
    }

    const postData = async (e) => {
        e.preventDefault();
        const { } = product

        const formData = new FormData()
        itemData && itemData.map((val, index) => {
            console.log(val, "item data values")
            formData.append('Title', val.Title)
            formData.append('Description', val.Description)
            formData.append('Qty', val.Qty)
            formData.append('Price', val.Price)
            formData.append('Date', val.Date)
            const config = {
                "Content-Type": "multipart/form-data"
            }
            const res = axios.post("http://localhost:5000/api/post-data", formData, config)
            console.log(res, "postdata")
            window.alert("Data inserted")
        })
    }

    const pushData = async () => {
        setItemData([...itemData, product]);
        setProduct({
            Title: "",
            Description: "",
            Qty: "",
            Price: "",
            Date: ""
        })
    }

    const dataRemove = (id) => {
        const newItem = itemData.filter((newVal, index) => {
            return index !== id;
        });
        setItemData(newItem);
    }
    for (const key in itemData) {
        console.log("itemData for", itemData[key])
    }

    function addPrescription() {
        let userinfo = {
            patient_name: patient_name,
            age: age,
            gender: gender,
            complaint: complaint,
            allergies: allergies,
            address: address,
            d_id: d_id,
            date: date,
            prescription_no: prescription_no,
        }
        let reqData = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userinfo)
        }
        fetch("http://localhost:8000/prescription", reqData)
            .then(response => console.log(`Data Submitted${response.status}`))
        console.log("Data Submitted successfully");
        alert('Prescription generated.');
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                m: 5
            }}
            noValidate
            autoComplete="off"
        >
            <div>

                <Row>
                    <Col>
                        <Typography>Patient Details.</Typography>
                        <TextField
                            required
                            id="outlined-required"
                            label="Patient Name"
                            value={patient_name}
                            onChange={(e) => setPatient_Name(e.target.value)}
                        />
                        <TextField
                            id="outlined-number"
                            label="Age"
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Complaint"
                            value={complaint}
                            onChange={(e) => setComplaint(e.target.value)}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Allergies"
                            value={allergies}
                            onChange={(e) => setAllergies(e.target.value)}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <Typography>Doctor Details.</Typography>
                        <Row>
                            <TextField
                                required
                                id="outlined-required"
                                label="Prescribed by"
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Doctor Id"
                                value={d_id}
                                onChange={(e) => setD_id(e.target.value)}
                            />
                        </Row>
                        <Row>
                            <TextField
                                required
                                id="outlined-required"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            <TextField
                                id="outlined-number"
                                label="Prescription No."
                                type="number"
                                value={prescription_no}
                                onChange={(e) => setPrescription_No(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Row>
                    </Col>
                    <Row>
                        <Button onClick={addPrescription} style={{ width: "100px", margin: "20px 0px 20px 0px", position: "relative" }} className='btn btn-md btn-primary' >Save</Button>
                    </Row>
                </Row>
                <Divider />
                <Typography>Medicines</Typography>
                <div className='container' style={{ marginRight: "30rem", width: "100vw", marginTop: "15px" }}>
                    <div className="col-10 ">
                        <div className="col-md-10"  ></div>
                        <div className="row-10 ">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Sno.</th>
                                        <th>Prescription No..</th>
                                        <th>Medicine</th>
                                        <th>Type</th>
                                        <th>Dosage</th>
                                        <th>Quantity</th>
                                        <th>Duration</th>
                                        <th>Consumption</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {itemData.map((val, index) => {
                                        console.log(val, "mc")
                                        return (
                                            <tr key={index} >
                                                <td>{val.Sno}</td>
                                                <td>{val.Prescription_no}</td>
                                                <td>{val.Title}</td>
                                                <td>{val.Description}</td>
                                                <td>{val.Qty}</td>
                                                <td>{val.Price}</td>
                                                <td>{val.Date}</td>
                                                <td>{val.Consumption}</td>
                                                <td><button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => dataRemove(index)}>
                                                    <MinusOutlined />
                                                </button></td>
                                            </tr>
                                        )

                                    })

                                    }
                                    <tr>
                                        <td><input type="number" name="Sno" value={product.Sno} onChange={postdata} required /></td>
                                        <td><input type="number" name="prescription no" value={product.prescriptionno} onChange={postdata} required /></td>
                                        <td><input type="text" name="Title" value={product.Title} onChange={postdata} required /></td>
                                        <td><input type="text" name="Description" value={product.Description} onChange={postdata} required /></td>
                                        <td><input type="number" name="Qty" value={product.Qty} onChange={postdata} required /></td>
                                        <td><input type="number" name="Price" value={product.Price} onChange={postdata} required /></td>
                                        <td><input type="text" name="Date" value={product.Date} onChange={postdata} required /></td>
                                        <td><input type="text" name="Consumption" value={product.Consumption} onChange={postdata} required /></td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-primary me-3"
                                                onClick={() => { pushData(); setNoOfRows(noOfRows + 1) }}>
                                                <PlusOutlined />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                            <button className="btn btn-primary" onClick={postData} > Save </button>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    );
}

export default Prescription;