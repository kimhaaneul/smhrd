import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarT from "../Component/NavbarT";
import Navbar from "../Component/Navbar";
import "../css/teacherpage.css";
import { Link, useNavigate } from "react-router-dom";
import gptbtn from "../img/gptbtn.png";
import btn1 from "../img/btn1.png";
import btn2 from "../img/btn2.png";

const Teacherpage = () => {
  const type = sessionStorage.getItem("mem_type");
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8081/studentsByType",
          "0"
        );
        setStudents(response.data);
        console.log("응답", response.data);
      } catch (error) {
        console.error("학생 정보를 불러오는 중 오류 발생:", error);
      }
    };

    fetchData(); // 데이터 가져오는 함수 호출
  }, []);

  const studentColumn = 5;

  const columns = Math.ceil(students.length / studentColumn);

  const tableData = Array.from({ length: columns }, (_, columnIndex) => {
    const start = columnIndex * studentColumn;
    const end = start + studentColumn;
    return students.slice(start, end);
  });

  const handleStudentClick = (student) => {
    // student.mem_id와 student.mem_name을 sessionStorage에 저장
    sessionStorage.setItem("studentId", student.mem_id);
    sessionStorage.setItem("studentName", student.mem_name);

    navigate(`/is`, {
      state: { studentName: student.mem_name },
    });
  };

  return (
    <div>
      <header>{type === "1" ? <NavbarT /> : <Navbar />}</header>
      <br />
      <h2 className="titleText">·내 학생관리</h2>
      <br />
      <br />
      <br />
      <br />
      <h3 className="teacherText">
        학생 이름을 클릭하면 학생의 정보를 확인하실 수 있어요.
        <br />
        <br />
      </h3>
      <table className="tableData">
        <tbody>
          {tableData.map((columnStudents, columnIndex) => (
            <tr key={columnIndex}>
              {columnStudents.map((student) => (
                <td key={student.mem_id}>
                  <div
                    className="stu"
                    onClick={() => handleStudentClick(student)}
                  >
                    {student.mem_name}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <h2 className="questionText">· 문제 생성</h2>
      <br />
      <Link to="/createai">
        <img src={gptbtn} className="gptimg" alt="Create AI Problem" />
      </Link>
      <div className="btn12div">
        <Link to="/createaproblem">
          <img src={btn1} className="button1" alt="Create Problem" />
        </Link>
        <Link to="/wq">
          <img src={btn2} className="button2" alt="Button 2" />
        </Link>
      </div>
    </div>
  );
};

export default Teacherpage;
