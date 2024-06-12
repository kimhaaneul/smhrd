import React, { useEffect, useState } from "react";
import axios from "axios";
import sb from "../img/stb1.png";
import "../css/questionslist.css";
import NavbarT from "../Component/NavbarT";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Component/Navbar";

const StudyRoom = () => {
  const type = sessionStorage.getItem("mem_type");
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const [examsInfo, setExamsInfo] = useState([]);
  const mem_id = sessionStorage.getItem("mem_id");

  useEffect(() => {
    const fetchExams = async () => {
      try {
        console.log("Fetching exams for mem_id:", mem_id); // mem_id 값 로그 출력
        const response = await axios.post(
          "http://localhost:8081/getExamsByMemId",
          { mem_id }
        );
        setExamsInfo(response.data);
        console.log("response", response.data); // 전체 response 로그 출력
      } catch (error) {
        console.error("시험 정보를 불러오는 중 오류 발생:", error);
      }
    };

    if (mem_id) {
      fetchExams();
    } else {
      console.error("mem_id is null or undefined");
    }
  }, [mem_id]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더합니다.
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleTableClick = (exam) => {
    sessionStorage.setItem("test_seq", exam.test_seq); // 클릭한 문제집의 test_seq를 저장
    navigate("/testpaper", {
      state: {
        selectedAnswers: currentLocation.state?.selectedAnswers,
        examInfo: exam,
      },
    });
    console.log("exam", exam);
  };

  return (
    <div>
      {type === "1" ? <NavbarT /> : <Navbar />}
      <img src={sb} className="tbimg" alt="table" />
      <br/>
      <br/>
      <div className="t-margin-box"></div>
      {examsInfo.map((exam, index) => (
        <table
          key={index}
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
  );
};

export default StudyRoom;
