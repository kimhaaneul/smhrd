import React from "react";
import Navbar from "../Component/Navbar";
import NavbarT from "../Component/NavbarT";
import "../css/joinsuccess.css";
import { Link, useLocation } from "react-router-dom";

const type = sessionStorage.getItem("mem_type");

const JoinSuccess = () => {
  const location = useLocation();
  const { mem_id, joined_at } = location.state;

  return (
    <div>
      {type === 1 ? <NavbarT /> : <Navbar />}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1 className="welcome">에듀워즈 회원가입이 완료되었습니다!</h1>
      <table className="jstable">
        <tr className="jid">가입한 아이디 : {mem_id}</tr>
        <tr className="jday">가입한 날짜 : {joined_at}</tr>
      </table>
      <br />
      <br />
      <Link to="/" component="button" id="gomain">
        메인으로
      </Link>
    </div>
  );
};

export default JoinSuccess;
