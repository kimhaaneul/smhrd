import React from "react";
import NavbarT from "../Component/NavbarT";
import Navbar from "../Component/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/outsuccess.css";

const type = sessionStorage.getItem("mem_type");

const Outsuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = location.state || { username: "알 수 없음" };

  const gomain = () => {
    // 로그아웃: sessionStorage에서 사용자 정보 제거
    sessionStorage.removeItem("mem_type");
    sessionStorage.removeItem("mem_id");
    sessionStorage.removeItem("mem_name");
    sessionStorage.removeItem("mem_address");
    sessionStorage.removeItem("mem_number");
    sessionStorage.removeItem("mem_email");

    // 메인 페이지로 이동
    navigate("/");
  };

  return (
    <div>
      {type === 1 ? <NavbarT /> : <Navbar />}
      <div className="osdiv">
        <br />
        <br />
        <br />
        <h1>에듀워즈 회원탈퇴가 완료되었습니다.</h1>
        <tr>그동안 이용해주셔서 감사합니다.</tr>
        <br />
        <br />
        <br />
        <br />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <button className="os-btn" onClick={gomain}>
        메인으로
      </button>
    </div>
  );
};

export default Outsuccess;
