import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import lg from "../img/logo.png";

const NavbarT = () => {
  const [mem_id, setMemId] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(null);

  useEffect(() => {
    const storedMemId = sessionStorage.getItem("mem_id");
    const mem_name = sessionStorage.getItem("mem_name");
    setMemId(storedMemId);
    setName(mem_name);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("mem_id");
    sessionStorage.removeItem("mem_type");
    setMemId(null); // Update state to trigger re-render
    navigate("/"); // Redirect to home page
    sessionStorage.removeItem("mem_name");
    sessionStorage.removeItem("mem_address");
    sessionStorage.removeItem("mem_email");
    sessionStorage.removeItem("mem_number");
  };

  const handleLoginClick = (e) => {
    if (!mem_id) {
      e.preventDefault();
      alert("로그인 해주세요.");
      navigate("/login");
    }
  };

  const handleMenuClick = (event) => {
    if (!mem_id) {
      event.preventDefault();
      alert("로그인이 필요합니다!");
      navigate("/login");
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div id="bar">
          <div id="div1"></div>
          <div id="div2">
            {mem_id ? `환영합니다. ${name}님` : "로그인 해주세요"}
          </div>
          <div id="div3">
            {mem_id ? (
              <>
                <Link to="/sp" className="startLogin" onClick={handleMenuClick}>
                  마이 페이지
                </Link>
                <Link to="/" className="startJoin" onClick={handleLogout}>
                  로그아웃
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="startLogin"
                  onClick={handleLoginClick}
                >
                  로그인
                </Link>
                <Link to="/tp" className="startJoin">
                  회원가입
                </Link>
              </>
            )}
          </div>
          <Link to="/">
            <img src={lg} id="logo" alt="logo" />
          </Link>
        </div>

        <ul>
          <li>
            <NavLink
              to="/teacher"
              id="navA"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={handleLoginClick}
            >
              내 학생관리
            </NavLink>
          </li>
          <li>
            <Link to="/createhome" id="navA" onClick={handleLoginClick}>
              문제 생성
            </Link>
          </li>
          <li>
            <Link to="/questionslist" id="navA" onClick={handleLoginClick}>
              문제 리스트
            </Link>
          </li>
          <li>
            <Link to="/sp" id="navA" onClick={handleLoginClick}>
              내 정보 수정
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavbarT;
