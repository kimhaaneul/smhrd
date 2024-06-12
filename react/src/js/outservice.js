import React, { useState } from "react";
import axios from "axios";
import NavbarT from "../Component/NavbarT";
import Navbar from "../Component/Navbar";
import "../css/outservice.css";
import { useNavigate } from "react-router-dom";

const type = sessionStorage.getItem("mem_type");

const OutService = () => {
  const [mem_id, setMemId] = useState("");
  const [mem_pw, setMemPw] = useState("");
  const navigate = useNavigate();

  const handleOutservice = async () => {
    if (mem_id && mem_pw) {
      try {
        const response = await axios.post("http://localhost:8081/deleteById", {
          mem_id,
          mem_pw,
        });

        if (response.data.success) {
          // 탈퇴 성공 시 세션 데이터 삭제 및 페이지 이동
          sessionStorage.clear();
          navigate("/os", {
            state: { mem_id },
          });
        } else {
          alert("회원 탈퇴에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
        }
      } catch (error) {
        console.error("회원 탈퇴 중 오류 발생:", error);
        alert("회원 탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } else {
      alert("아이디와 비밀번호를 입력해주세요.");
    }
  };

  return (
    <div>
      {type === "1" ? <NavbarT /> : <Navbar />}
      <br />
      <br />
      <br />
      <div className="outdiv">
        <h1>회원 탈퇴</h1>
        <tr id="outtr1">
          탈퇴 후 회원정보 및 서비스 이용기록은 모두 삭제됩니다.
        </tr>
        <br />
        <tr id="outtr2">삭제된 데이터는 복구되지 않습니다.</tr>
        <input
          type="text"
          name="mem_id"
          id="eraseId"
          placeholder="삭제하실 아이디 입력"
          required
          value={mem_id}
          onChange={(e) => setMemId(e.target.value)}
        ></input>
        <br />
        <input
          type="password"
          name="mem_pw"
          id="erasepw"
          placeholder="삭제하실 아이디의 비밀번호 확인"
          required
          value={mem_pw}
          onChange={(e) => setMemPw(e.target.value)}
        ></input>
        <br />
        <br />
        <input type="radio" id="outagree" name="agreement" />
        <label htmlFor="outagree" className="radio-label">
          예, 탈퇴에 동의합니다.
        </label>
      </div>
      <br />
      <button className="container" onClick={handleOutservice}>
        탈퇴하기
      </button>
    </div>
  );
};

export default OutService;
