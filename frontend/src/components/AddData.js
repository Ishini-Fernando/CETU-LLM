import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Cookies from "js-cookie";
import { Container, Form } from "react-bootstrap";
import axios from "axios";
import "./addData.css";

function Example() {
  const [show, setShow] = useState(false);
  const [sbp, setSbp] = useState("");
  const [dbp, setDbp] = useState("");
  const [hr, setHr] = useState("");
  const [rr, setRr] = useState("");
  const [bt, setBt] = useState("");
  const [spo2, setSpo2] = useState("");
  const [gcs, setGcs] = useState("");
  const [na, setNa] = useState("");
  const [k, setK] = useState("");
  const [cl, setCl] = useState("");
  const [urea, setUrea] = useState("");
  const [fhihd, setFhihd] = useState("");
  const [cretine, setCretine] = useState("");
  const [alcohol, setAlcohol] = useState("");
  const [smoker, setSmoker] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge]= useState("");
  const [result, setResult] = useState("");
  const [result2, setResult2] = useState("");

  useEffect(() => {
    const pAlcohol = Cookies.get("patient-alcohol")
    if (pAlcohol) {
      const parseAlcohol = JSON.parse(pAlcohol);
      if (parseAlcohol === "yes")
      setAlcohol("an alcoholic");
      else setAlcohol("not an alcoholic");
      console.log(alcohol);
    }
    const patientSmoker = Cookies.get("patient-smoker");
    if (patientSmoker) {
      const parseSmoker = JSON.parse(patientSmoker);
      if (parseSmoker === "yes")
      setSmoker("a smoker");
      else setSmoker("not a smoker");
      console.log(alcohol);
    }
    const patientGender = Cookies.get("patient-gender");
    if (patientGender) {
      const parseGender = JSON.parse(patientGender);
      setGender(parseGender);
    }
    const patientAge = Cookies.get("patient-age");
    if (patientAge) {
      const parseAge = JSON.parse(patientAge);
      setAge(parseAge);
    }
  },[])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    const newData = {
      sbp,
      dbp,
      hr,
      rr,
      bt,
      spo2,
      gcs,
      na,
      k,
      cl,
      urea,
      fhihd,
      cretine,
      age,
      gender,
      smoker,
      alcohol,
    };
    const patientName = JSON.parse(Cookies.get("patient-name"));
    const cookieName = `${patientName}-record`;
    const existingData = JSON.parse(Cookies.get(cookieName) || "[]");
    const updatedData = [...existingData, newData];
    Cookies.set(cookieName, JSON.stringify(updatedData));
    setSbp("");
    setShow(false);
    window.location.reload();
  };

  const handlePredict = async () => {
    try {
      const newParagraph = generateParagraph();
      const response = await axios.post('http://localhost:5000/paragraph', { paragraph: newParagraph });
      
      const { result, result2 } = response.data;
      
      setResult(result);
      setResult2(result2);
      
      Cookies.set('result', JSON.stringify(result));
      Cookies.set('result2', JSON.stringify(result2));
      
      console.log("Result:", result);
      console.log("Result2:", result2);
      
    } catch (error) {
      console.error('Error sending paragraph to backend:', error);
    }
    setShow(false);
    window.location.reload();
  };

  const generateParagraph = () => {
    const paragraph = `age ${age} has ${sbp} mmHg Systolic Blood Pressure, ${dbp} mmHg Diastolic Blood Pressure, ${hr} beats per minute Heart Rate, ${rr} breaths per minute Respiratory Rate, ${bt} fahrenheit Body temperature, ${spo2} mEqL SpO2`;
    return paragraph;
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} style={{marginBottom: "20px"}}>
        Add Data
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Systolic Blood Pressure (SBP)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter SBP (mmHg)"
                value={sbp}
                onChange={(e) => setSbp(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formAge">
              <Form.Label>Diastolic Blood Pressure (DBP)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter DBP (mmHg)"
                value={dbp}
                onChange={(e) => setDbp(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formSbp">
              <Form.Label>Heart Rate (HR)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter HR (beats per minute)"
                value={hr}
                onChange={(e) => setHr(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formSbp">
              <Form.Label>Respiratory Rate (RR)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter RR (breaths per minute)"
                value={rr}
                onChange={(e) => setRr(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formSbp">
              <Form.Label>Body Temperature (BT)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter BR (Fahrenheit)"
                value={bt}
                onChange={(e) => setBt(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formSbp">
              <Form.Label>Peripheral Capillary Oxygen Saturation (SpO2)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter SpO2 (mEqL)"
                value={spo2}
                onChange={(e) => setSpo2(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formSbp">
              <Form.Label>Glasgow Coma Scale (GCS)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter GCS"
                value={gcs}
                onChange={(e) => setGcs(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formSbp">
              <Form.Label>Sodium Level (Na)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Na (mEq/L)"
                value={na}
                onChange={(e) => setNa(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formSbp">
              <Form.Label>Potassium Level (K)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter K (mEq/L)"
                value={k}
                onChange={(e) => setK(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formSbp">
              <Form.Label>Chloride Level (Cl)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Cl (mEq/L)"
                value={cl}
                onChange={(e) => setCl(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formSbp">
              <Form.Label>Urea Level</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Urea (mg/dL)"
                value={urea}
                onChange={(e) => setUrea(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formSbp">
              <Form.Label>Family History of Ischemic Hear Diseases (FHIHD)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter FHIHD (Yes/No)"
                value={fhihd}
                onChange={(e) => setFhihd(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formSbp">
              <Form.Label>Creatinine Level</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Creatinine (mg/dL)"
                value={cretine}
                onChange={(e) => setCretine(e.target.value)}
              />
            </Form.Group>
            <div className="modal-button">
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
              <Button variant="outline-danger" onClick={handlePredict} className="predict-button">
                Predict
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
