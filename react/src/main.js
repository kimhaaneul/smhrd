import "./main.css";
import React, { useState, useEffect, useRef } from "react";
import banner1 from "./img/banner1.png";
import banner2 from "./img/banner2.png";
import banner3 from "./img/banner3.png";
import back from "./img/background.png";
import NavbarT from "./Component/NavbarT";
import Navbar from "./Component/Navbar"; // 기본 Navbar import
import Footer from "./Component/Footer";

const images = [banner1, banner2, banner3];
const background = [back];

function Banner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((index + 1) % images.length); // 순환 로직
    }, 3000); // 3초 간격으로 이미지 전환
    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
  }, [index]); // index 변경 시 useEffect 재실행

  return (
    <div>
      <img
        src={images[index]}
        alt={`Banner ${index + 1}`}
        style={{ width: "100%", marginTop: "40px" }}
      />
    </div>
  );
}

// 메뉴바

function Main() {
  const [type, setType] = useState(null);
  const [memName, setMemName] = useState(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    const mem_type = sessionStorage.getItem("mem_type");
    const mem_name = sessionStorage.getItem("mem_id");
    setType(mem_type);
    setMemName(mem_name);
    console.log("type" + mem_type);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-visible");
          } else {
            entry.target.classList.remove("fade-in-visible");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (backgroundRef.current) {
      observer.observe(backgroundRef.current);
    }

    return () => {
      if (backgroundRef.current) {
        observer.unobserve(backgroundRef.current);
      }
    };
  }, []);

  return (
    <div className="bodytext">
      {type === "1" ? <NavbarT /> : <Navbar />}
      <Banner />

      <br />

      <main>
        <img
          src={background}
          id="back"
          ref={backgroundRef}
          className="fade-in"
        ></img>
      </main>

      <Footer />
    </div>
  );
}

export default Main;
