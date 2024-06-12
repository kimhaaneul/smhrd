import React, { useState, useEffect } from "react";
import NavbarT from "../Component/NavbarT";
import { useNavigate, useLocation } from "react-router-dom";

const EditExam = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [examInfo, setExamInfo] = useState(location.state?.examInfo || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExamInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const storedExamsInfo = JSON.parse(localStorage.getItem("examsInfo")) || [];
    const updatedExamsInfo = storedExamsInfo.map((exam) =>
      exam.examName === examInfo.examName ? examInfo : exam
    );
    localStorage.setItem("examsInfo", JSON.stringify(updatedExamsInfo));
    navigate("/questionslist");
  };

  const handleCancel = () => {
    navigate("/questionslist");
  };

  return (
    <div>
      <NavbarT />
      <h2>시험 정보 수정</h2>
      <div>
        <label>시험 이름: </label>
        <input
          type="text"
          name="examName"
          value={examInfo.examName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>시작 날짜: </label>
        <input
          type="date"
          name="startDate"
          value={examInfo.startDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>끝나는 날짜: </label>
        <input
          type="date"
          name="endDate"
          value={examInfo.endDate}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSave}>저장</button>
      <button onClick={handleCancel}>취소</button>
    </div>
  );
};

export default EditExam;
