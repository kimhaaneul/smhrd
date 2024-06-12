import React, { useEffect, useState } from "react";
import NavbarT from "../Component/NavbarT";
import Navbar from "../Component/Navbar";
import "../css/join.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const type = sessionStorage.getItem("mem_type");
const mem_id = sessionStorage.getItem("mem_id");
const mem_name = sessionStorage.getItem("mem_name");
const mem_address = sessionStorage.getItem("mem_address");
const mem_number = sessionStorage.getItem("mem_number");
const mem_email = sessionStorage.getItem("mem_email");
function Join() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mem_pw, setPassword] = useState("");
  const [mem_id, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [usernameMessageStyle, setUsernameMessageStyle] = useState({});
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [mem_name, setFullname] = useState("");
  const [mem_number, setPhone] = useState("");
  const [mem_address, setAddress] = useState("");
  const [mem_email, setEmail] = useState("");
  const [memType, setType] = useState("1");

  const navigate = useNavigate();

  useEffect(() => {
    const messageElement = document.getElementById("passwordMessage");

    if (confirmPassword === mem_pw) {
      messageElement.textContent = "비밀번호가 일치합니다.";
      messageElement.style.color = "#239aff";
    } else {
      messageElement.textContent = "일치하지 않습니다";
      messageElement.style.color = "red";
      setIsUsernameValid(false);
    }
  }, [confirmPassword, mem_pw]);

  const handleUsernameCheck = async () => {
    try {
      console.log(mem_id);
      const response = await axios.post("http://localhost:8081/check", {
        mem_id,
      });

      if (response.data.exists) {
        setUsernameMessage("이미 사용 중인 아이디입니다.");
        setUsernameMessageStyle({ color: "red", fontSize: "15px" });
        setIsUsernameValid(false);
      } else {
        setUsernameMessage("사용 가능한 아이디입니다.");
        setUsernameMessageStyle({ color: "#239aff", fontSize: "15px" });
        setIsUsernameValid(true);
      }
    } catch (error) {
      setUsernameMessage("아이디 중복 확인에 실패했습니다. 다시 시도해주세요.");
      setUsernameMessageStyle({ color: "red", fontSize: "15px" });
      setIsUsernameValid(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUsernameValid && mem_pw === confirmPassword) {
      const joined_at = new Date().toLocaleDateString();
      const member = {
        mem_id,
        mem_pw,
        mem_name,
        mem_number,
        mem_address,
        memType,
        mem_email,
        joined_at,
      };
      console.log(member);
      try {
        await axios.post("http://localhost:8081/register", member);
        navigate("/js", { state: { mem_id, joined_at } });
      } catch (error) {
        alert("회원 가입에 실패했습니다. 다시 시도해주세요.");
      }
    } else {
      alert("모든 정보를 올바르게 입력해주세요.");
    }
  };

  return (
    <div className="joindiv">
      {type === 1 ? <NavbarT /> : <Navbar />}
      <br />
      <br />
      <br />
      <h1>가입 정보 입력</h1>
      <form onSubmit={handleSubmit}>
        <table id="joinTable">
          <tbody className="section">
            <tr>
              <th colSpan={2}>아이디</th>
              <td>
                <input
                  type="text"
                  name="username"
                  placeholder="아이디를 입력하세요"
                  required
                  value={mem_id}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <button type="button" onClick={handleUsernameCheck} id="idbtn">
                  중복확인
                </button>
                <span id="usernameMessage" style={usernameMessageStyle}>
                  {usernameMessage}
                </span>
              </td>
            </tr>
            <tr>
              <th colSpan={2}>비밀번호</th>
              <td>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="비밀번호를 입력하세요"
                  required
                  value={mem_pw}
                  onChange={(e) => setPassword(e.target.value)}
                />
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
          </tbody>
          <hr />
          <tbody className="section">
            <tr>
              <th colSpan={2}>이름</th>
              <td>
                <input
                  type="text"
                  name="fullname"
                  placeholder="이름을 입력하세요"
                  required
                  value={mem_name}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th colSpan={2}>연락처</th>
              <td>
                <input
                  type="tel"
                  name="phone"
                  placeholder="연락처를 입력하세요"
                  required
                  value={mem_number}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th colSpan={2}>주소</th>
              <td>
                <input
                  type="text"
                  name="address"
                  placeholder="주소를 입력하세요"
                  required
                  value={mem_address}
                  onChange={(e) => setAddress(e.target.value)}
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
                  value={mem_email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <br></br>
        <br></br>
        <button type="submit" className="container" disabled={!isUsernameValid}>
          다음으로
        </button>
      </form>
    </div>
  );
}

export default Join;
