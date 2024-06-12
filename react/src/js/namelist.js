import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarT from "../Component/NavbarT";
import "../css/namelist.css";
import { useNavigate, useLocation } from "react-router-dom";

const NameList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { examInfo } = location.state || {};
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8081/getStudentsByWorkbookName",
          { workSeq: examInfo.work_seq } // examInfo.work_seq에 work_seq가 포함되어 있다고 가정합니다.
        );
        setStudents(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("학생 정보를 불러오는 중 오류 발생:", error);
      }
    };

    if (examInfo && examInfo.work_seq) {
      fetchData();
    }
  }, [examInfo]);

  const handleSelectStudent = (student) => {
    sessionStorage.setItem("studentId", student.memId);
    sessionStorage.setItem("studentName", student.memName);
    navigate("/is", {
      state: {
        studentName: student.memName,
        studentId: student.memId,
        examInfo,
      },
    });
  };

  return (
    <div>
      <NavbarT />
      <br />
      <h2 className="titleText">· 문제 제출 학생 명단</h2>
      <br />
      <br />
      <div className="namelist-container">
        <div className="namelist-box">
          <h2 className="namelist-title">학생 목록</h2>
          <ul>
            {students.map((student) => (
              <li
                className={`namelist-li ${
                  student.submitted_at ? "blue-border" : "red-border"
                }`}
                key={student.memId}
                onClick={() => handleSelectStudent(student)}
              >
                {student.memName}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NameList;
