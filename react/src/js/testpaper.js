import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/testpaper.css";
import Navbar from "../Component/Navbar";
import NavbarT from "../Component/NavbarT";
import { useNavigate, useLocation } from "react-router-dom";

const TestPaper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [examInfo, setExamInfo] = useState({});
  const { studentId, studentName } = location.state || {};
  const test_seq = sessionStorage.getItem("test_seq");

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axios.post("http://localhost:8081/getTestById", {
          testId: test_seq,
        });
        const testData = response.data;
        if (testData) {
          const parsedQuestions = JSON.parse(testData.workbook_qes);
          setExamInfo({ ...testData, selectedQuestions: parsedQuestions });
        }
      } catch (error) {
        console.error("시험 정보를 불러오는 중 오류 발생:", error);
      }
    };
    fetchTest();
  }, [test_seq]);

  const divideIntoColumns = (arr, columns) => {
    const divided = [];
    const chunkSize = Math.ceil(arr.length / columns);
    for (let i = 0; i < columns; i++) {
      divided.push(arr.slice(i * chunkSize, (i + 1) * chunkSize));
    }
    return divided;
  };

  const questions = examInfo.selectedQuestions || [];
  const selectedColumns = divideIntoColumns(questions, 2);

  const updateSelectedAnswer = (questionId, answer) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async () => {
    try {
      const currentDate = new Date().toISOString().split("T")[0];
      const response = await axios.post("http://localhost:8081/submitTest", {
        test_seq,
        selectedAnswers,
        submitted_at: currentDate,
      });
      console.log(response.data);
      navigate("/good", {
        state: {
          selectedAnswers,
          examInfo,
          studentId,
          studentName,
        },
      });
    } catch (error) {
      console.error("시험 제출 중 오류 발생:", error);
    }
  };

  return (
    <div>
      {sessionStorage.getItem("mem_type") === "1" ? <NavbarT /> : <Navbar />}
      <h2 className="testpaper-title">· 시험 보기</h2>
      <div className="testpaper-container">
        <div className="testpaper-box">
          {selectedColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="testpaper-column">
              {column.map((question, questionIndex) => (
                <div key={question.qes_seq} className="testpaper-question">
                  <p>
                    {columnIndex * 2 + questionIndex + 1}. {question.qes_desc}
                  </p>
                  {question.qes_detail && (
                    <p className="question-detail">{question.qes_detail}</p>
                  )}
                  {question.ex1 && <p>① {question.ex1}</p>}
                  {question.ex2 && <p>② {question.ex2}</p>}
                  {question.ex3 && <p>③ {question.ex3}</p>}
                  {question.ex4 && <p>④ {question.ex4}</p>}
                  {question.ex5 && <p>⑤ {question.ex5}</p>}
                  <div className="answer-options">
                    {question.ex1 ||
                    question.ex2 ||
                    question.ex3 ||
                    question.ex4 ||
                    question.ex5 ? (
                      [
                        question.ex1,
                        question.ex2,
                        question.ex3,
                        question.ex4,
                        question.ex5,
                      ].map(
                        (option, index) =>
                          option && (
                            <button
                              key={index}
                              className={`option-button ${
                                selectedAnswers[question.qes_seq] === option
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() =>
                                updateSelectedAnswer(question.qes_seq, option)
                              }
                            >
                              {option}
                            </button>
                          )
                      )
                    ) : (
                      <input
                        type="text"
                        placeholder="정답을 입력하세요"
                        className="answer-input"
                        value={selectedAnswers[question.qes_seq] || ""}
                        onChange={(e) =>
                          updateSelectedAnswer(question.qes_seq, e.target.value)
                        }
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <br />
      <div className="testpaper-btnbox">
        <button className="testpaper-btn" onClick={handleSubmit}>
          제출하기
        </button>
      </div>
    </div>
  );
};

export default TestPaper;
