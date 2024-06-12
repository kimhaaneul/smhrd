import React, { useState, useEffect } from "react";
import Navbar from "../Component/Navbar";
import NavbarT from "../Component/NavbarT";
import "../css/login.css";
import lg from "../img/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const memType = sessionStorage.getItem("mem_type");
    setType(memType);
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8081/login", {
        mem_id: username,
        mem_pw: password,
      });

      if (response.data.success) {
        const {
          memType,
          mem_id,
          mem_name,
          mem_address,
          mem_email,
          mem_number,
        } = response.data;

        sessionStorage.setItem("mem_id", mem_id);
        sessionStorage.setItem("mem_type", memType);
        sessionStorage.setItem("mem_name", mem_name);
        sessionStorage.setItem("mem_address", mem_address);
        sessionStorage.setItem("mem_email", mem_email);
        sessionStorage.setItem("mem_number", mem_number);

        navigate("/");
      } else {
        alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인하세요.");
      }
    } catch (error) {
      alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="logindiv">
      {type === "1" ? <NavbarT /> : <Navbar />}
      <img src={lg} id="logoImg" alt="Logo" />
      <br />
      <input
        type="text"
        name="username"
        placeholder="아이디"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="비밀번호"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} id="loginbtn">
        로그인
      </button>
      <br />
      <br />
      <div className="tool">
        <ul>
          <li>
            <a href="/find">ID 찾기 </a>
          </li>
          <li>
            <a href="/find">PW 찾기 </a>
          </li>
          <li>
            <a href="/tp">회원가입</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Login;
