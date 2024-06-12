import React from "react";
import NavbarT from "../Component/NavbarT";
import gptbtn from "../img/gptbtn.png";
import btn1 from "../img/btn1.png";
import btn2 from "../img/btn2.png";
import "../css/createhome.css";
import Footer from "../Component/Footer";
import { Link, useNavigate } from "react-router-dom";

const type = sessionStorage.getItem("mem_type");
const mem_id = sessionStorage.getItem("mem_id");
const mem_name = sessionStorage.getItem("mem_name");
const mem_address = sessionStorage.getItem("mem_address");
const mem_number = sessionStorage.getItem("mem_number");
const mem_email = sessionStorage.getItem("mem_email");

const CreateHome = () => {
  const navigate = useNavigate();

  const handleCreateProblemClick = () => {
    // 데이터 예시
    const dataToSend = { problemCount: 0 };

    navigate("/createaproblem", { state: dataToSend });
  };

  const handleCreateAIClick = () => {
    const selectedQuestions =
      JSON.parse(localStorage.getItem("selectedQuestions")) || [];
    navigate("/wq", { state: { previewQuestions: selectedQuestions } });
  };

  return (
    <div>
      <NavbarT />

      <div className="contentbox1">
        <div className="gptbutton">
          <Link to="/createai">
            <img src={gptbtn} className="gptimg" alt="Create AI"></img>
          </Link>
        </div>
        <div className="bottombtn">
          <div className="button1" onClick={handleCreateProblemClick}>
            <img src={btn1} alt="Create Problem"></img>
          </div>
          <div className="button2" onClick={handleCreateAIClick}>
            <img src={btn2} alt="Another Action"></img>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default CreateHome;
