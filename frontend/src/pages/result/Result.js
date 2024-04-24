import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import AddData from "../../components/AddData";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import "./result.css";

const Result = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bed, setBed] = useState("");
  const [alcohol, setAlcohol] = useState("");
  const [smoker, setSmoker] = useState("");
  const [patientData, setPatientData] = useState([]);
  const [result, setResult] = useState("");
  const [result2, setResult2] = useState("");

  useEffect(() => {
    const newResult = Cookies.get("result");
    if (newResult) {
      const parsedResult = JSON.parse(newResult);
      setResult(parsedResult);
    }
    const newResult2 = Cookies.get("result2");
    if (newResult2) {
      const parsedResult2 = JSON.parse(newResult2);
      setResult2(parsedResult2);
    }
    const patientName = Cookies.get("patient-name");
    if (patientName) {
      const parsedName = JSON.parse(patientName);
      setName(parsedName);
    }
    const patientAge = Cookies.get("patient-age");
    if (patientAge) {
      const parseAge = JSON.parse(patientAge);
      setAge(parseAge);
    }
    const patientGender = Cookies.get("patient-gender");
    if (patientGender) {
      const parseGender = JSON.parse(patientGender);
      setGender(parseGender);
    }
    const patientBed = Cookies.get("patient-bed");
    if (patientBed) {
      const parseBed = JSON.parse(patientBed);
      setBed(parseBed);
    }
    const patientAlcohol = Cookies.get("patient-alcohol");
    if (patientAlcohol) {
      const parseAlcohol = JSON.parse(patientAlcohol);
      setAlcohol(parseAlcohol);
    }
    const patientSmoker = Cookies.get("patient-smoker");
    if (patientSmoker) {
      const parseSmoker = JSON.parse(patientSmoker);
      setSmoker(parseSmoker);
    }
    try {
      const patientF = JSON.parse(patientName);
      const patientRecord = JSON.parse(Cookies.get(`${patientF}-record`));
      if (patientRecord){
        setPatientData(patientRecord);
        console.log(patientRecord);
      }
    } catch (error){
      console.error(error)
    }
  },[]);

  return (
    <Container fluid>
      <h1>
        <span style={{ color: "red" }}>{name}</span> Medical Records
      </h1>
      <AddData />
      <Row>
        <Col className="bio-data" >
          {patientData && (
            <>
            <h3>Patient details</h3>
              <p>Name: {name}</p>
              <p>Age: {age}</p>
              <p>Gender: {gender}</p>
              <p>Consume Alcohol: {alcohol}</p>
              <p>Smoker: {smoker}</p>
              <p>Bed Number: {bed}</p>
            </>
          )}
        </Col>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>SBP</th>
                <th>DBP</th>
                <th>HR</th>
                <th>RR</th>
                <th>BT</th>
                <th>SpO2</th>
                <th>GCS</th>
                <th>Na</th>
                <th>K</th>
                <th>Cl</th>
                <th>Urea</th>
                <th>FHIHD</th>
                <th>Cretine</th>
              </tr>
            </thead>
            <tbody>
              {patientData.map((data,index)=> (
                <tr key={index}>
                  <td>{data.sbp}</td>
                  <td>{data.dbp}</td>
                  <td>{data.hr}</td>
                  <td>{data.rr}</td>
                  <td>{data.bt}</td>
                  <td>{data.spo2}</td>
                  <td>{data.gcs}</td>
                  <td>{data.na}</td>
                  <td>{data.k}</td>
                  <td>{data.cl}</td>
                  <td>{data.urea}</td>
                  <td>{data.fhihd}</td>
                  <td>{data.cretine}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <h5>{name} of Patient ID {result} and with {result2}</h5>
    </Container>
  );
};

export default Result;
