import React from "react";
import NavbarT from "./Component/NavbarT";
import Navbar from "./Component/Navbar";
import "../src/vocabularydetails.css";
import pin from "../src/img/notepin1.png";
import { useLocation, useNavigate } from "react-router-dom";

const type = sessionStorage.getItem("mem_type");
const mem_id = sessionStorage.getItem("mem_id");
const mem_name = sessionStorage.getItem("mem_name");
const mem_address = sessionStorage.getItem("mem_address");
const mem_number = sessionStorage.getItem("mem_number");
const mem_email = sessionStorage.getItem("mem_email");

const Vd = () => {
  const navigate = useNavigate();

  const handlenote = () => {
    navigate("/note");
  };

  const location = useLocation();
  const { word, meaning } = location.state || {};
  if (!word || !meaning) {
    console.error("No state provided");
    return <p>No word details provided!</p>;
  }

  return (
    <div>
      {type === 1 ? <NavbarT /> : <Navbar />}
      <h1 className="vd-title">· 단어 상세 정보</h1>
      <img src={pin} className="vd-pin" alt="Pin" />
      <div className="vd-box">
        <div className="wordbox">
          <h2>{word}</h2>
        </div>
        <div className="meaningbox">
          <h2>{meaning}</h2>
        </div>
      </div>
      <br></br>
      <br></br>
      <button className="vd-btn" onClick={handlenote}>
        확인
      </button>
    </div>
  );
};

export default Vd;
