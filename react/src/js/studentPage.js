import React, { useEffect, useState } from "react";
import "../css/studentPage.css";
import Navbar from "../Component/Navbar";
import NavbarT from "../Component/NavbarT";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function StudentPage() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState({
    type: "",
    mem_id: "",
    mem_name: "",
    mem_address: "",
    mem_number: "",
    mem_email: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const type = sessionStorage.getItem("mem_type") || "";
    const mem_id = sessionStorage.getItem("mem_id") || "";
    const mem_name = sessionStorage.getItem("mem_name") || "";
    const mem_address = sessionStorage.getItem("mem_address") || "";
    const mem_number = sessionStorage.getItem("mem_number") || "";
    const mem_email = sessionStorage.getItem("mem_email") || "";

    console.log("type:", type);
    console.log("mem_id:", mem_id);
    console.log("mem_name:", mem_name);
    console.log("mem_address:", mem_address);
    console.log("mem_number:", mem_number);
    console.log("mem_email:", mem_email);

    setUserInfo({
      type,
      mem_id,
      mem_name,
      mem_address,
      mem_number,
      mem_email,
    });
  }, []);

  useEffect(() => {
    const messageElement = document.getElementById("passwordMessage");

    if (confirmPassword === password) {
      messageElement.textContent = "비밀번호가 일치합니다.";
      messageElement.style.color = "#239aff";
    } else {
      messageElement.textContent = "일치하지 않습니다";
      messageElement.style.color = "red";
    }
  }, [confirmPassword, password]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8081/update", {
        mem_id: userInfo.mem_id,
        mem_name: userInfo.mem_name,
        mem_address: userInfo.mem_address,
        mem_number: userInfo.mem_number,
        mem_email: userInfo.mem_email,
        password: password,
      });

      if (response.data.success) {
        alert("회원수정이 완료되었습니다!");
        navigate("/");
      } else {
        alert("회원수정에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      alert("회원수정 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div>
      {userInfo.type === "1" ? <NavbarT /> : <Navbar />}
      <br />
      <br />
      <br />
      <div className="studiv">
        <h1>회원 정보 수정</h1>

        <table id="infoTable">
          <tbody>
            <tr>
              <th colSpan={2}>아이디</th>
              <td id="infoId">{userInfo.mem_id}</td>
            </tr>
            <tr>
              <th colSpan={2}>이름</th>
              <td id="infoName">{userInfo.mem_name}</td>
            </tr>
            <hr />
            <tr>
              <th colSpan={2}>비밀번호</th>
              <td>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="바꾸실 암호를 입력해주세요."
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </td>
            </tr>
            <tr>
              <th colSpan={2}>비밀번호 재입력</th>
              <td>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="비밀번호를 다시 입력하세요"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span id="passwordMessage"></span>
              </td>
            </tr>
            <hr />
            <tr>
              <th colSpan={2}>주소</th>
              <td>
                <input
                  type="text"
                  name="address"
                  placeholder="주소를 입력하세요"
                  required
                  value={userInfo.mem_address || ""}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, mem_address: e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <th colSpan={2}>이메일</th>
              <td>
                <input
                  type="email"
                  name="email"
                  placeholder="이메일을 입력하세요"
                  required
                  value={userInfo.mem_email || ""}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, mem_email: e.target.value })
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
        <Link to="/out" className="outservice">
          회원탈퇴
        </Link>
        <button className="container" onClick={handleSubmit}>
          입력완료
        </button>
      </div>
    </div>
  );
}

export default StudentPage;
