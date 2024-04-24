import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Img1 from "../assets/doc1.jpg";
import Img2 from "../assets/doc2.jpg";
import Img3 from "../assets/doc3.jpg";
import "./offCanvas.css";

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Duty List
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Duty List for Today</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <h3>Doctor List</h3>
          <div className="doctor-list">
            <div className="doctor-img">
              <img src={Img1} />
              <p>Dr.Shasha</p>
            </div>
            <div className="doctor-img">
              <img src={Img2} />
              <p>Dr.Shasha</p>
            </div>
            <div className="doctor-img">
              <img src={Img3} />
              <p>Dr.Shasha</p>
            </div>
          </div>

          <h3>Nurse List</h3>
          <div className="doctor-list">
            <div className="doctor-img">
              <img src={Img1} />
              <p>Dr.Shasha</p>
            </div>
            <div className="doctor-img">
              <img src={Img2} />
              <p>Dr.Shasha</p>
            </div>
            <div className="doctor-img">
              <img src={Img3} />
              <p>Dr.Shasha</p>
            </div>
            <div className="doctor-img">
              <img src={Img3} />
              <p>Dr.Shasha</p>
            </div>
          </div>
          <div className="doctor-list">
            <div className="doctor-img">
              <img src={Img1} />
              <p>Dr.Shasha</p>
            </div>
            <div className="doctor-img">
              <img src={Img2} />
              <p>Dr.Shasha</p>
            </div>
            <div className="doctor-img">
              <img src={Img3} />
              <p>Dr.Shasha</p>
            </div>
            <div className="doctor-img">
              <img src={Img3} />
              <p>Dr.Shasha</p>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Example;
