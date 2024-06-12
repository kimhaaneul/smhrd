import React, { useState } from "react";
import NavbarT from "../Component/NavbarT";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/markpage.css";
import oImg from "../img/o.png";
import xImg from "../img/x.png";
import axios from "axios";

const MarkPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const examInfo = location.state?.examInfo || { selectedQuestions: [] };
  const selectedAnswers = location.state?.selectedAnswers || {};
  const studentId = location.state?.studentId || "";
  const studentName = location.state?.studentName || "";

  const [gradingResults, setGradingResults] = useState([]);

  const gradeExam = () => {
    const results = [];
    examInfo.selectedQuestions.forEach((question) => {
      const correctAnswer = question.correctAnswer;
      const studentAnswer = selectedAnswers[question.id];
      const result = correctAnswer === studentAnswer ? "o" : "x";
      results.push(result);
    });
    setGradingResults(results);

    const score = results.filter((result) => result === "o").length * 5; // 문제당 5점

    alert("채점을 완료하였습니다!");

    // 점수를 서버로 전송
    axios.post("/is", { mem_id: studentId, score }).catch((error) => {
      console.error("점수를 전송하는 중 오류 발생:", error);
    });

    // StudyRecord로 이동
    navigate("/sr", {
      state: {
        examInfo,
        gradingResults: results,
        score,
        studentName,
      },
    });
  };

  const renderGradingResults = () => {
    return gradingResults.map((result, index) => (
      <div key={index} className="result-item">
        {result === "o" ? (
          <img src={oImg} alt="o" />
        ) : (
          <img src={xImg} alt="x" />
        )}
      </div>
    ));
  };

  return (
    <div>
      <NavbarT />
      <h2 className="mp-title">· 시험 채점 페이지</h2>
      <div className="mp-box">{renderGradingResults()}</div>
      <br />
      <br />
      <button className="mp-btn" onClick={gradeExam}>
        채점하기
      </button>
    </div>
  );
};

export default MarkPage;
