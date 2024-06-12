import React, { useEffect, useState } from "react";
import axios from "axios";
import tb from "../img/tb.png";
import "../css/questionslist.css";
import NavbarT from "../Component/NavbarT";
import { useNavigate, useLocation } from "react-router-dom";

const QuestionsList = () => {
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const [examsInfo, setExamsInfo] = useState([]);
  const mem_id = sessionStorage.getItem("mem_id");

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    axios
      .post("http://localhost:8081/getAll")
      .then((response) => {
        const formattedExams = response.data.map((exam) => ({
          ...exam,
          startline: formatDate(exam.startline),
          deadline: formatDate(exam.deadline),
        }));
        setExamsInfo(formattedExams);
      })
      .catch((error) => {
        console.error("단어를 가져오는 중 오류 발생:", error);
      });
  }, []);

  const handleTableClick = (exam) => {
    navigate("/namelist", {
      state: {
        selectedAnswers: currentLocation.state?.selectedAnswers,
        examInfo: exam,
      },
    });
  };

  const handleDelete = (workSeq, e) => {
    e.stopPropagation(); // 테이블 클릭 이벤트가 발생하지 않도록 중지

    const confirmDelete = window.confirm("정말로 이 시험을 삭제하시겠습니까?");
    if (!confirmDelete) return;

    axios
      .post("http://localhost:8081/deleteExam", { workSeq })
      .then((response) => {
        if (response.data.success) {
          setExamsInfo(examsInfo.filter((exam) => exam.work_seq !== workSeq));
        } else {
          alert("시험 삭제에 실패했습니다.");
          console.log(workSeq);
        }
      })
      .catch((error) => {
        console.error("시험 삭제 중 오류 발생:", error);
        alert("시험 삭제 중 오류가 발생했습니다.");
      });
  };

  return (
    <div>
      <NavbarT />
      <img src={tb} className="tbimg" alt="table"></img>
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
                <div>
                  {exam.startline} ~ {exam.deadline}
                  <button
                    onClick={(e) => handleDelete(exam.work_seq, e)}
                    id="deletebtns"
                  >
                    삭제
                  </button>
                </div>
              </th>
            </tr>
            <tr className="t-listtable-tr2">
              <td colSpan={2} className="exam-name">
                {exam.work_name}
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default QuestionsList;
