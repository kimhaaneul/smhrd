import React from "react";
import Navbar from "../Component/Navbar";
import NavbarT from "../Component/NavbarT";
import "../css/infostudent.css";
import Great from "../img/great.png";
import "../css/goodboy.css";
import { Link } from "react-router-dom";

const type = sessionStorage.getItem("mem_type");
const mem_id = sessionStorage.getItem("mem_id");
const mem_name = sessionStorage.getItem("mem_name");
const mem_address = sessionStorage.getItem("mem_address");
const mem_number = sessionStorage.getItem("mem_number");
const mem_email = sessionStorage.getItem("mem_email");

const goodboy = () => {
  return (
    <div>
      {type === 1 ? <NavbarT /> : <Navbar />}
      <br />
      <br />
      <h2 className="goodTitle">· 문제제출</h2>
      <br />
      <br />
      <br />
      <br />
      <div className="gooddiv">
        <br />
        <br />
        <img src={Great} className="smileimg"></img>
        <br />
        <h3 className="goodText">참 잘했어요!</h3>
        <tr className="goodText2">
          다 푸신 시험 점수는 마이페이지를 통해서 확인하실 수 있어요!
        </tr>
        <br />
        <br />
        <Link to="/" className="gomainBtn">
          <button className="gomainBtn">메인으로</button>
        </Link>
      </div>
    </div>
  );
};

export default goodboy;
