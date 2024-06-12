import React from "react";
import "../css/footer.css";
import lg2 from "../img/logo2.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div id="footer" role="contentinfo">
      <div className="logo-box">
        <div className="logo-icon">
          <img src={lg2} className="footerimg" alt="" />
        </div>
        <div className="logo-box-1">
          <p className="footer-text1">대표 : 김진수</p>
          <p className="footer-text1">010-8945-1455</p>
        </div>

        <div className="logo-box-2">
          <p className="footer-text3">
            평일 09:00 ~ 18:00 / 점심 12:50 ~ 02:00
          </p>
          <p className="footer-text3">휴무 : 토 / 일 / 공휴일 </p>
        </div>

        <div className="logo-box-3">
          <p className="footer-text3">Team : 영구소 (영어연구소)</p>
          <p className="footer-text3">광주광역시 남구 송암로 60 CGI센터 2층</p>
        </div>

        <div className="logo-box-4">
          <p className="footer-text3">E-mail : Jinsuzzing@naver.com</p>
          <p className="footer-text3">Fax : 062-000-0000</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
