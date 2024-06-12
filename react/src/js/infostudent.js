import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarT from "../Component/NavbarT";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useNavigate } from "react-router-dom";
import "../css/infostudent.css";
import "../css/chart.css";

Chart.register(...registerables);

const Infostudent = () => {
  const [memId, setMemId] = useState(sessionStorage.getItem("mem_id"));
  const [name, setName] = useState(sessionStorage.getItem("mem_name"));
  const [address, setAddress] = useState(sessionStorage.getItem("mem_address"));
  const [number, setNumber] = useState(sessionStorage.getItem("mem_number"));
  const [email, setEmail] = useState(sessionStorage.getItem("mem_email"));

  const [chartData, setChartData] = useState([]);
  const [formattedData, setFormattedData] = useState([]);

  const studentId = sessionStorage.getItem("studentId");
  const studentName = sessionStorage.getItem("studentName");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8081/getTests", {
          mem_id: studentId,
        });

        const calculateScore = (studentAnswer, answerKey) => {
          // studentAnswer와 answerKey가 null이거나 undefined인 경우에 대한 처리 추가
          if (!studentAnswer || !answerKey) {
            console.error("studentAnswer 또는 answerKey가 없습니다.");
            return 0; // 또는 다른 기본값으로 설정
          }

          const studentAnswers = JSON.parse(studentAnswer);
          const answerKeys = JSON.parse(answerKey);
          let correctAnswers = 0;
          const totalQuestions = Object.keys(answerKeys).length;

          for (let key in studentAnswers) {
            if (studentAnswers[key] === answerKeys[key]) {
              correctAnswers++;
            }
          }

          return ((correctAnswers / totalQuestions) * 100).toFixed(2);
        };

        const formattedData = response.data.map((item) => {
          const date = new Date(item.submitted_at);
          const formattedDate = date
            .toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
            .replace("년 ", "년 ")
            .replace("월 ", "월 ")
            .replace("일", "일");

          const score = calculateScore(item.answer, item.answer_check);

          return {
            date: formattedDate,
            workbookName: item.workbook_name,
            score: parseFloat(score), // 소수점 이하 2자리로 제한된 점수를 숫자로 변환
          };
        });

        setChartData(formattedData);
        setFormattedData(formattedData);
        console.log("응답", response.data);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [studentId]);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/teacher");
  };

  let averageScore =
    formattedData.reduce((sum, item) => sum + item.score, 0) /
    formattedData.length;

  if (isNaN(averageScore)) {
    averageScore = 0;
  }

  averageScore = Math.round(averageScore);

  const chartIn = {
    labels: formattedData.map((item) => item.date),
    datasets: [
      {
        label: "점수",
        data: formattedData.map((item) => item.score),
        backgroundColor: "#239aff",
        borderColor: "#239aff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          font: {
            size: 14,
          },
          color: "#239aff",
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
    maintainAspectRatio: true,
  };

  return (
    <div>
      <header>
        <NavbarT />
      </header>
      <br />
      <h2 className="titleText">· 내 학생관리</h2>
      <br />
      <br />
      <br />
      <br />
      <h3 className="stuName">{studentName}</h3>
      <div className="infoBody">
        <div className="doneHomework">
          <th>문제집</th>
          <br />
          <br />
          {formattedData.map((item, index) => (
            <tr key={index}>
              <td>{`${item.date} - ${item.workbookName}`}</td>
            </tr>
          ))}
        </div>
        <div className="lookEasy">
          <h2 className="chart-titles">학생 성적 보기</h2>
          <br></br>
          <div className="chart-box">
            <div className="chart">
              <Bar data={chartIn} options={options} />
            </div>
          </div>
          <h3 className="chart-scores">평균 점수: {averageScore}</h3>
        </div>
      </div>
      <br />
      <div className="infoEdit"></div>
      <br />
      <br />
      <button className="is-btn" onClick={handleBack}>
        확인
      </button>
      <br />
      <br />
    </div>
  );
};

export default Infostudent;
