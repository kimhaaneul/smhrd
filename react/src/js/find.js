import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Component/Navbar";
import NavbarT from "../Component/NavbarT";
import axios from "axios";
import "../css/find.css";

const type = sessionStorage.getItem("mem_type");
const mem_id = sessionStorage.getItem("mem_id");
const mem_name = sessionStorage.getItem("mem_name");
const mem_address = sessionStorage.getItem("mem_address");
const mem_number = sessionStorage.getItem("mem_number");
const mem_email = sessionStorage.getItem("mem_email");

const Find = () => {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleFindId = async () => {
    try {
      const response = await axios.post("http://localhost:5000/find-id", {
        name,
        birthdate,
        email,
      });
      if (response.data.username) {
        navigate("/findid", { state: { username: response.data.username } });
      } else {
        alert("가입된 정보를 찾을 수 없습니다.");
      }
    } catch (err) {
      console.error(err);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleFindPassword = async () => {
    try {
      const response = await axios.post("http://localhost:5000/find-password", {
        username,
        name,
        birthdate,
        email,
      });
      if (response.data.success) {
        navigate("/findpw", { state: { username } });
      } else {
        alert("가입된 정보를 찾을 수 없습니다.");
      }
    } catch (err) {
      console.error(err);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="findBody">
      {type === 1 ? <NavbarT /> : <Navbar />}
      <br />
      <br />
      <br />
      <div>
        <h1 className="idFont">아이디찾기</h1>
        <br />
        <div className="idDiv">
          <table id="idTable">
            <tbody>
              <tr>
                <th colSpan={2}>이름</th>
                <td>
                  <input
                    type="text"
                    name="username"
                    placeholder="이름을 입력해주세요"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  ></input>
                </td>
              </tr>
              <hr />
              <tr>
                <th colSpan={2}>생년월일</th>
                <td>
                  <input
                    type="date"
                    name="birthday"
                    id="birthday"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    required
                  ></input>
                </td>
              </tr>
              <hr />
              <tr>
                <th colSpan={2}>가입한 이메일</th>
                <td>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@naver.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  ></input>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <button className="findIdBtn" onClick={handleFindId}>
          아이디찾기
        </button>
      </div>
      <br />
      <br />
      <div className="pwDiv">
        <br />
        <br />
        <h1 className="pwFont">비밀번호 찾기</h1>
        <br />

        <table id="pwTable">
          <tbody>
            <tr>
              <th colSpan={2}>아이디</th>
              <td>
                <input
                  type="text"
                  name="username"
                  placeholder="아이디를 입력해주세요"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                ></input>
              </td>
            </tr>
            <hr />
            <tr>
              <th colSpan={2}>이름</th>
              <td>
                <input
                  type="text"
                  name="fullname"
                  placeholder="이름을 입력하세요"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                ></input>
              </td>
            </tr>
            <hr />
            <tr>
              <th colSpan={2}>생년월일</th>
              <td>
                <input
                  type="date"
                  name="birthday"
                  id="birthday"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  required
                ></input>
              </td>
            </tr>
            <hr />
            <tr>
              <th colSpan={2}>가입한 이메일</th>
              <td>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@naver.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></input>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <button className="findPwBtn" onClick={handleFindPassword}>
          비밀번호 찾기
        </button>
      </div>
    </div>
  );
};

export default Find;
