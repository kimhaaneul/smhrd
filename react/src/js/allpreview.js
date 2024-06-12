import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/allpreview.css";
import NavbarT from "../Component/NavbarT";
import Navbar from "../Component/Navbar";
import { useLocation, useNavigate } from "react-router-dom";

const AllPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedQuestions = location.state?.selectedQuestions || [];
  const [workbookName, setExamName] = useState("");
  const [startline, setStartDate] = useState("");
  const [deadline, setEndDate] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8081/studentsByType",
          { type: "0" }
        );
        setStudents(response.data);
        console.log("학생 데이터:", response.data);
      } catch (error) {
        console.error("학생 정보를 불러오는 중 오류 발생:", error);
      }
    };

    fetchData();
  }, []);

  const divideIntoColumns = (arr, columns) => {
    const divided = [];
    const chunkSize = Math.ceil(arr.length / columns);
    for (let i = 0; i < columns; i++) {
      divided.push(arr.slice(i * chunkSize, (i + 1) * chunkSize));
    }
    return divided;
  };

  const selectedColumns = divideIntoColumns(selectedQuestions, 2);
  const type = sessionStorage.getItem("mem_type");

  const handleConfirm = async () => {
    const workbookQes = JSON.stringify(selectedQuestions);

    // answer_check를 만들기 위한 객체 생성
    const answerCheck = {};
    selectedQuestions.forEach((question) => {
      answerCheck[question.qes_seq] = question.qes_answer;
    });

<<<<<<< Updated upstream:react/src/js/allpreview.js
=======
    // 선택된 각 학생에 대해 별도의 시험 정보 저장
    selectedStudents.forEach(async (student) => {
      const data = {
        memId: student.mem_id,
        workbook_qes: workbookQes,
        answer_check: JSON.stringify(answerCheck),
        deadline, // deadline 추가
        startline, // startline 추가
        workbook_name: workbookName,
      };

      console.log("보낼 데이터:", data);

      try {
        const response = await axios.post(
          "http://localhost:8081/saveTest",
          data
        );
        console.log("저장된 데이터:", response.data);
        navigate("/questionslist", {
          state: {
            studentName: student.mem_name,
            studentId: student.mem_id,
            selectedQuestions,
            workbook_name: workbookName, // 수정된 부분: workbookName을 workbook_name으로 변경
            startline,
            deadline,
          },
        });
      } catch (error) {
        console.error("데이터 저장 중 오류 발생:", error);
      }
    });

>>>>>>> Stashed changes:eduwords/eduwords/src/js/allpreview.js
    // tb_workbook에 저장할 데이터
    const workbookData = {
      memId: sessionStorage.getItem("mem_id"),
      deadline,
      workbook_qes: workbookQes,
<<<<<<< Updated upstream:react/src/js/allpreview.js
      work_name: workbookName,
=======
      work_name: workbookName, // 수정된 부분: workbookName을 workbook_name으로 변경
>>>>>>> Stashed changes:eduwords/eduwords/src/js/allpreview.js
      startline,
    };

    console.log("workbook 보낼 데이터:", workbookData);

    try {
      const workbookResponse = await axios.post(
        "http://localhost:8081/saveWorkbook",
        workbookData
      );
      console.log("workbook 저장된 데이터:", workbookResponse.data);

      // 저장된 workbook의 work_seq 가져오기
      const work_seq = workbookResponse.data.work_seq;
      if (!work_seq) {
        throw new Error("work_seq를 가져오는 데 실패했습니다.");
      }

      // 선택된 각 학생에 대해 별도의 시험 정보 저장
      const promises = selectedStudents.map(async (student) => {
        const data = {
          memId: student.mem_id, // 선택된 학생의 mem_id로 설정
          workbook_qes: workbookQes,
          answer_check: JSON.stringify(answerCheck), // answer_check를 JSON 형태로 변환하여 저장
          startline, // startline 추가
          deadline, // deadline 추가
          workbook_name: workbookName, // workbook_name 추가
          workSeq: work_seq, // 저장된 workbook의 work_seq 추가
          memName: student.mem_name,
        };

        console.log("보낼 데이터:", data); // 데이터를 확인합니다.

        try {
          const response = await axios.post(
            "http://localhost:8081/saveTest",
            data
          );
          console.log("저장된 데이터:", response.data);
          navigate("/questionslist", {
            state: {
              studentName: student.mem_name,
              studentId: student.mem_id,
              selectedQuestions,
              workbook_name: workbookName,
              startline,
              deadline,
              workSeq: work_seq,
            },
          });
        } catch (error) {
          console.error("데이터 저장 중 오류 발생:", error);
        }
      });

      await Promise.all(promises);
    } catch (error) {
      console.error("workbook 데이터 저장 중 오류 발생:", error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSelectStudent = (student) => {
    if (selectedStudents.some((s) => s.mem_id === student.mem_id)) {
      setSelectedStudents(
        selectedStudents.filter((s) => s.mem_id !== student.mem_id)
      );
    } else {
      setSelectedStudents([...selectedStudents, student]);
    }
  };

  return (
    <div>
      {type === "1" ? <NavbarT /> : <Navbar />}
      <h2 className="all-title">· 미리보기</h2>
      <div className="all-container">
        <div className="all-box">
          {selectedColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="all-column">
              {column.map((question, questionIndex) => (
                <div key={question.qes_seq} className="all-question">
                  <p>
                    {columnIndex * selectedColumns[0].length +
                      questionIndex +
                      1}
                    . {question.qes_desc}
                  </p>
                  {question.qes_detail && <p>{question.qes_detail}</p>}
                  {question.ex1 && <p>① {question.ex1}</p>}
                  {question.ex2 && <p>② {question.ex2}</p>}
                  {question.ex3 && <p>③ {question.ex3}</p>}
                  {question.ex4 && <p>④ {question.ex4}</p>}
                  {question.ex5 && <p>⑤ {question.ex5}</p>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <br />
      <div className="all-box2">
        <br />
        <div className="date-picker">
          <label>시험지 이름 : </label>
          <input
            className="all-input-box1"
            type="text"
            value={workbookName}
            onChange={(e) => setExamName(e.target.value)}
          />
          <br />
          <div className="alldate-box">
            <label>시작날짜 : </label>
            <input
              className="all-input-box2"
              type="date"
              value={startline}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label>끝나는날짜 : </label>
            <input
              className="all-input-box2"
              type="date"
              value={deadline}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <div className="namelist-box">
          <h2 className="namelist-title">학생 목록</h2>
          <ul>
            {students.map((student) => (
              <li
                className={`namelist-li ${
                  selectedStudents.some((s) => s.mem_id === student.mem_id)
                    ? "selected"
                    : ""
                }`}
                key={student.mem_id}
                onClick={() => handleSelectStudent(student)}
              >
                {student.mem_name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <br />
      <div className="all-btnbox">
        <button className="all-back" onClick={handleBack}>
          뒤로가기
        </button>
        <button className="all-btn" onClick={handleConfirm}>
          확인
        </button>
      </div>
    </div>
  );
};

export default AllPreview;
