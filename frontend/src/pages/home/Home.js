import React, { useState, useEffect } from "react";
import "./home.css";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import img1 from "../../assets/calendar.png";
import img2 from "../../assets/double-bed.png";
import img3 from "../../assets/surgery.png";
import img4 from "../../assets/user.png";
import OffCanvas from "../../components/OffCanvas";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [patients, setPatients] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const dataFromCookies = Cookies.get("patients");
    if (dataFromCookies) {
      setPatients(JSON.parse(dataFromCookies));
    }
  }, []);

  const handlePatientClick = (name,age,gender,daysInICU, alcohol, smoker) => {
    Cookies.set("patient-name", JSON.stringify(name));
    Cookies.set("patient-age", JSON.stringify(age));
    Cookies.set("patient-gender", JSON.stringify(gender));
    Cookies.set("patient-bed", JSON.stringify(daysInICU));
    Cookies.set("patient-alcohol", JSON.stringify(alcohol));
    Cookies.set("patient-smoker", JSON.stringify(smoker));
    navigate("/result")
  }

  const addPatient = (newPatient) => {
    const { name, age, gender, daysInICU, sbp, alcohol, smoker } = newPatient;
    let patientDataArray = [];
    let patientData = { name, age, gender, daysInICU, sbp, alcohol, smoker };
    patientDataArray.push(patientData);
    const updatedPatients = [...patients, newPatient];
    setPatients(updatedPatients);
    Cookies.set(name, JSON.stringify(patientDataArray), { expires: 30 });
    Cookies.set("patients", JSON.stringify(updatedPatients), { expires: 30 });
  };

  const removePatient = (index) => {
    const updatedPatients = [...patients];
    updatedPatients.splice(index, 1);
    setPatients(updatedPatients);
    Cookies.set("patients", JSON.stringify(updatedPatients), {expires: 30});
  };

  const handleFormChange = (e) => {
    const formData = {
      name: e.target.form.elements.name.value,
      age: e.target.form.elements.age.value,
      gender: e.target.form.elements.gender.value,
    };
    const isValid = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    setIsFormValid(isValid);
  };

  return (
    <Container fluid>
      <div className="home-header">
        <h1>DASHBOARD</h1>
        <OffCanvas />
      </div>
      <Row className="row-cont">
        <Col xs>
          <div className="box-1">
            <div className="img">
              <img src={img1} height={50} />
            </div>
            <div className="content">
              <h4>200</h4>
              <p>Appointments</p>
            </div>
          </div>
        </Col>
        <Col xs>
          <div className="box-2">
            <div className="img">
              <img src={img4} height={50} />
            </div>
            <div className="content">
              <h4>520</h4>
              <p>Total Patient</p>
            </div>
          </div>
        </Col>
        <Col xs>
          <div className="box-3">
            <div className="img">
              <img src={img3} height={50} />
            </div>
            <div className="content">
              <h4>20</h4>
              <p>Surgery</p>
            </div>
          </div>
        </Col>
        <Col xs>
          <div className="box-4">
            <div className="img">
              <img src={img2} height={50} />
            </div>
            <div className="content">
              <h4>1200</h4>
              <p>Total Rooms</p>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="patient-container">
        <h3>Patient Details</h3>
        <Col xs className="quick-list">
          <div className="quick-list">
            <h3>Quick List</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Bed Number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => (
                  <tr key={index}>
                    <td>
                      <a href="" onClick={() => handlePatientClick(patient.name, patient.age, patient.gender, patient.daysInICU, patient.alcohol, patient.smoker)}>
                        {patient.name}
                      </a>
                    </td>
                    <td>{patient.age}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.daysInICU}</td>
                    <td>
                      <Button
                        variant="outline-secondary"
                        onClick={() => removePatient(index)}
                      >
                        Discharge
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
        <Col className="new-patient" xs>
          <div>
            <h3>Add New Patient</h3>
            <Form
              onChange={handleFormChange}
              onSubmit={(e) => {
                // e.preventDefault();
                const name = e.target.elements.name.value;
                const age = e.target.elements.age.value;
                const gender = e.target.elements.gender.value;
                const daysInICU = e.target.elements.daysInICU.value;
                const alcohol = e.target.elements.alcohol.value;
                const smoker = e.target.elements.smoker.value;
                addPatient({ name, age, gender, daysInICU, alcohol, smoker });
              }}
            >
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" />
              </Form.Group>
              <Form.Group controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control type="number" placeholder="Enter age" />
              </Form.Group>
              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control as="select">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="alcohol">
                <Form.Label>Alcohol</Form.Label>
                <Form.Control as="select">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="smoker">
                <Form.Label>Smoker</Form.Label>
                <Form.Control as="select">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="daysInICU">
                <Form.Label>Bed Number</Form.Label>
                <Form.Control type="number" placeholder="Enter Bed Number" />
              </Form.Group>
              <Button
                variant="outline-danger"
                disabled={!isFormValid}
                className="submit-btn"
                type="submit"
              >
                Add Patient
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
