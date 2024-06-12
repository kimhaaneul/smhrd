import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/studyrecord.css";
import Navbar from "../Component/Navbar";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const StudyRecord = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const examInfo = location.state?.examInfo || {};
  const gradingResults = location.state?.gradingResults || [];
  const score = location.state?.score || 0;
  const memId = sessionStorage.getItem("mem_id");
  const [chartData, setChartData] = useState([]);
  const [studentName, setStudentName] = useState("학생 이름"); // 예시로 학생 이름을 설정
  const [formattedData, setFormattedData] = useState([]);
  const [averageScore, setAverageScore] = useState(0);
  const [examsInfo, setExamsInfo] = useState([]);
  const [selectedExamScore, setSelectedExamScore] = useState(null);
  const [selectedExamQuestions, setSelectedExamQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedAnswerCheck, setSelectedAnswerCheck] = useState({});
  const [isAnswered, setIsAnswered] = useState(true); // 추가된 상태

  const selectedQuestions = examInfo.selectedQuestions || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8081/getTests", {
          mem_id: memId,
        });

        const calculateScore = (studentAnswer, answerKey) => {
          if (!studentAnswer || !answerKey) {
            console.error("studentAnswer 또는 answerKey가 없습니다.");
            return 0;
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
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/(\d{4})\.\s?(\d{2})\.\s?(\d{2})/, "$1년 $2월 $3일");

          const score = calculateScore(item.answer, item.answer_check);

          return {
            date: formattedDate,
            workbookName: item.workbook_name,
            score: parseFloat(score),
          };
        });

        setChartData(formattedData);
        setFormattedData(formattedData);

        const avgScore =
          formattedData.reduce((sum, item) => sum + item.score, 0) /
          formattedData.length;
        setAverageScore(avgScore);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };

    if (memId) {
      fetchData();
    } else {
      console.error("mem_id is null or undefined");
    }
  }, [memId]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8081/getExamsByMemId",
          { mem_id: memId }
        );
        setExamsInfo(response.data);
      } catch (error) {
        console.error("시험 정보를 불러오는 중 오류 발생:", error);
      }
    };

    if (memId) {
      fetchExams();
    } else {
      console.error("mem_id is null or undefined");
    }
  }, [memId]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const divideIntoColumns = (arr, columns) => {
    const divided = [];
    const chunkSize = Math.ceil(arr.length / columns);
    for (let i = 0; i < columns; i++) {
      divided.push(arr.slice(i * chunkSize, (i + 1) * chunkSize));
    }
    return divided;
  };

  const renderIncorrectQuestions = () => {
    if (!isAnswered) {
      return (
      <div className="all-box">

        <h2 className="studyrecord-title">아직 안푼 문제집입니다.</h2>
    </div>
      );
    }

    const columns = divideIntoColumns(selectedExamQuestions, 2);
    return (
      <div className="all-container">
        <div className="all-box">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="all-column">
              {column.map((question, questionIndex) => (
                <div key={question.qes_seq} className="all-question">
                  <p>
                    {columnIndex * columns[0].length + questionIndex + 1}.{" "}
                    {question.qes_desc}
                  </p>
                  {question.qes_detail && <p>{question.qes_detail}</p>}
                  {question.ex1 && <p>① {question.ex1}</p>}
                  {question.ex2 && <p>② {question.ex2}</p>}
                  {question.ex3 && <p>③ {question.ex3}</p>}
                  {question.ex4 && <p>④ {question.ex4}</p>}
                  {question.ex5 && <p>⑤ {question.ex5}</p>}
                  <p>
                    <strong>정답:</strong>{" "}
                    {selectedAnswerCheck[question.qes_seq]}
                  </p>
                  <p
                    style={{
                      color:
                        selectedAnswers[question.qes_seq] !==
                        selectedAnswerCheck[question.qes_seq]
                          ? "red"
                          : "black",
                    }}
                  >
                    <strong>내 답:</strong> {selectedAnswers[question.qes_seq]}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const gostudyroom = () => {
    navigate("/studyRoom");
  };

  const handleTableClick = async (exam) => {
    try {
      const response = await axios.post("http://localhost:8081/getTestById", {
        testId: exam.test_seq,
      });

      const { answer, answer_check, workbook_qes } = response.data;

      if (!answer) {
        setIsAnswered(false); // 답안이 제출되지 않은 경우
      } else {
        setIsAnswered(true); // 답안이 제출된 경우
        const score = calculateScore(answer, answer_check);
        const questions = JSON.parse(workbook_qes);
        const answers = JSON.parse(answer);
        const answerCheck = JSON.parse(answer_check);

        setSelectedExamScore(Math.round(score));
        setSelectedExamQuestions(questions);
        setSelectedAnswers(answers);
        setSelectedAnswerCheck(answerCheck);
        console.log("Selected Exam Score:", score);
      }
    } catch (error) {
      console.log(exam);
      console.error("시험 점수를 불러오는 중 오류 발생:", error);
    }
  };

  const calculateScore = (studentAnswer, answerKey) => {
    if (!studentAnswer || !answerKey) {
      console.error("studentAnswer 또는 answerKey가 없습니다.");
      return 0;
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

  // Chart.js data and options
  const chartIn = {
    labels: chartData.map((item) => item.date),
    datasets: [
      {
        label: "점수",
        data: chartData.map((item) => Math.round(item.score)),
        backgroundColor: "#239aff",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    aspectRatio: 2,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div>
      <Navbar />
      <h2 className="studyrecord-title">· 공부기록</h2>
      <br />
      <h3 className="sr-h3">· 시험 날짜</h3>
      <div className="srdate-box">
        {examsInfo.reduce((acc, exam, index, array) => {
          if (index % 2 === 0) {
            acc.push(array.slice(index, index + 2));
          }
          return acc;
        }, []).map((examPair, index) => (
          <div key={index} className="t-listtable-wrapper">
            {examPair.map((exam, subIndex) => (
              <table
                key={subIndex}
                className="t-listtable"
                onClick={() => handleTableClick(exam)}
              >
                <tbody>
                  <tr className="t-listtable-tr1">
                    <th colSpan={2}>
                      {formatDate(exam.startline)} ~ {formatDate(exam.deadline)}
                    </th>
                  </tr>
                  <tr className="t-listtable-tr2">
                    <td colSpan={2} className="exam-name">
                      {exam.workbook_name}
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
        ))}
      </div>

      <h3 className="sr-h3"></h3>
      {selectedExamScore !== null && isAnswered && (
        <div>
          <h3 className="sr-h3"> 점수: {selectedExamScore}</h3>
        </div>
      )}
      <hr className="sr-hr" />
      <div className="sr-box1">
        <h3 className="sr-h3">· 틀린 문제 보기</h3>
        <div>{renderIncorrectQuestions()}</div>
      </div>
      <br />
      <h3 className="sr-h3">· 최근 성적 한 눈에 보기</h3>
      <hr className="sr-hr" />
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
          <h2 className="chart-titles">내 성적</h2>
          <br/>
          <br/>
          <br/>
          <div className="chart-box">
            <div className="chart">
              <div className="chart-container" style={{ width: '400px', height: '300px' }}>
                <Bar data={chartIn} options={options} />
              </div>
            </div>
          </div>
          <h3 className="chart-scores">
                평균 점수: {Math.round(averageScore)}
              </h3>
        </div>
      </div>
      <br />
      <button className="is-btn" onClick={gostudyroom}>
        확인
      </button>
      <br />
      <br />
    </div>
  );
};

export default StudyRecord;
