import React from "react";
import Navbar from "../Component/Navbar";
import NavbarT from "../Component/NavbarT";
import "../css/questionsok.css";
import { useLocation, useNavigate } from "react-router-dom";

const type = sessionStorage.getItem("mem_type");

const QuestionsOk = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const examInfo = location.state?.examInfo;

  const handlequestionslist = () => {
    navigate("/questionslist", { state: { examInfo: examInfo } });
  };

  return (
    <div>
      {type === 1 ? <NavbarT /> : <Navbar />}
      <div className="questions">
        <div className="questions-box">
          <h2 className="questionsh2-title">문제 출제가 완료되었습니다</h2>
        </div>
      </div>
      <div className="questionsmain-btn-box">
        <button className="questionsbtn1" onClick={handlequestionslist}>
          메인으로
        </button>
      </div>
    </div>
  );
};

export default QuestionsOk;
