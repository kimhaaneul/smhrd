import React, { useEffect } from "react";
import lg from "../img/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const mem_id = sessionStorage.getItem("mem_id");
  const mem_name = sessionStorage.getItem("mem_name");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const protectedPaths = ["/studyroom", "/note", "/result", "/sp"];
    if (!mem_id && protectedPaths.includes(location.pathname)) {
      alert("로그인이 필요합니다!");
      navigate("/login");
    }
  }, [location.pathname, mem_id, navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("mem_id");
    sessionStorage.removeItem("mem_name");
    sessionStorage.removeItem("mem_address");
    sessionStorage.removeItem("mem_email");
    sessionStorage.removeItem("mem_number");
    navigate("/");
    alert("로그아웃 되었습니다!");
  };

  const handleLoginClick = (event) => {
    if (!mem_id) {
      event.preventDefault();
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
            {mem_id ? `환영합니다. ${mem_name}님` : "로그인 해주세요"}
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
            <Link to="/studyroom" id="navA" onClick={handleLoginClick}>
              공부방
            </Link>
          </li>
          <li>
            <Link to="/note" id="navA" onClick={handleLoginClick}>
              내 단어장
            </Link>
          </li>
          <li>
            <Link to="/sr" id="navA" onClick={handleLoginClick}>
              공부 기록
            </Link>
          </li>
          <li>
            <Link to="/aw" id="navA" onClick={handleLoginClick}>
              단어 추가하기
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
