import React, { useState, useEffect } from "react";
import "../css/aipreview.css";
import NavbarT from "../Component/NavbarT";
import Navbar from "../Component/Navbar";
import { useLocation, useNavigate } from "react-router-dom";

const Aipreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [previewQuestions, setPreviewQuestions] = useState([]);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    option5: "",
  });
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);

  const type = sessionStorage.getItem("mem_type");

  useEffect(() => {
    const problemCount = location.state?.problemCount || 0;
    setPreviewQuestions(
      Array.from({ length: problemCount }, (_, index) => ({
        id: index + 1,
        content: `문제 ${index + 1}`,
        options: [`선택지 1`, `선택지 2`, `선택지 3`, `선택지 4`, `선택지 5`],
      }))
    );
  }, [location.state]);

  const handleGenerateai = () => {
    localStorage.setItem("aiProblems", JSON.stringify(previewQuestions));
    navigate("/wq");
  };

  const handleEdit = (question) => {
    setEditingQuestionId(question.id);
    setEditedQuestion({
      question: question.content,
      option1: question.options[0],
      option2: question.options[1],
      option3: question.options[2],
      option4: question.options[3],
      option5: question.options[4],
    });
  };

  const handleSave = (id) => {
    setPreviewQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === id
          ? {
              ...q,
              content: editedQuestion.question,
              options: [
                editedQuestion.option1,
                editedQuestion.option2,
                editedQuestion.option3,
                editedQuestion.option4,
                editedQuestion.option5,
              ],
            }
          : q
      )
    );
    setEditingQuestionId(null);
    setEditedQuestion({
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      option5: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedQuestion((prevQuestion) => ({
      ...prevQuestion,
      [name]: value,
    }));
  };

  const deleteQ = (id) => {
    setPreviewQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== id)
    );
  };

  const handleSelect = (id) => {
    setSelectedQuestionIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((selectedId) => selectedId !== id)
        : [...prevIds, id]
    );
  };

  const columns = previewQuestions.reduce((result, item, index) => {
    const columnIndex = index % 2;
    if (!result[columnIndex]) result[columnIndex] = [];
    result[columnIndex].push(item);
    return result;
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      {type === 1 ? <NavbarT /> : <Navbar />}
      <h2 className="aipreview-title">· 생성된 문제 미리보기</h2>
      <div className="aipreview-box">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="aipreview-column">
            {column.map((previewQuestion) => (
              <div
                key={previewQuestion.id}
                className={`aipreview-question ${
                  selectedQuestionIds.includes(previewQuestion.id)
                    ? "aipreview-selected"
                    : ""
                }`}
                onClick={() => handleSelect(previewQuestion.id)}
              >
                {editingQuestionId === previewQuestion.id ? (
                  <div>
                    <input
                      className="editQ"
                      type="text"
                      name="question"
                      value={editedQuestion.question}
                      onChange={handleInputChange}
                    />
                    <br />
                    <br />
                    <input
                      className="radioA1"
                      type="radio"
                      name="option"
                      id="option1"
                      value={1}
                      onClick={handleInputChange}
                    />
                    <input
                      className="editA1"
                      type="text"
                      name="option1"
                      value={editedQuestion.option1}
                      onChange={handleInputChange}
                    />
                    <br />
                    <input
                      className="radioA2"
                      type="radio"
                      name="option"
                      id="option2"
                      value={2}
                      onClick={handleInputChange}
                    />
                    <input
                      className="editA2"
                      type="text"
                      name="option2"
                      value={editedQuestion.option2}
                      onChange={handleInputChange}
                    />
                    <br />
                    <input
                      className="radioA3"
                      type="radio"
                      name="option"
                      id="option3"
                      value={3}
                      onClick={handleInputChange}
                    />
                    <input
                      className="editA3"
                      type="text"
                      name="option3"
                      value={editedQuestion.option3}
                      onChange={handleInputChange}
                    />
                    <br />
                    <input
                      className="radioA4"
                      type="radio"
                      name="option"
                      id="option4"
                      value={4}
                      onClick={handleInputChange}
                    />
                    <input
                      className="editA4"
                      type="text"
                      name="option4"
                      value={editedQuestion.option4}
                      onChange={handleInputChange}
                    />
                    <br />
                    <input
                      className="radioA5"
                      type="radio"
                      name="option"
                      id="option5"
                      value={5}
                      onClick={handleInputChange}
                    />
                    <input
                      className="editA5"
                      type="text"
                      name="option5"
                      value={editedQuestion.option5}
                      onChange={handleInputChange}
                    />
                    <br />
                    <br />
                    <button
                      className="aipreview-btn1"
                      onClick={() => handleSave(previewQuestion.id)}
                    >
                      저장
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="Q">{previewQuestion.content}</p>
                    <p className="A1">① {previewQuestion.options[0]}</p>
                    <p className="A2">② {previewQuestion.options[1]}</p>
                    <p className="A3">③ {previewQuestion.options[2]}</p>
                    <p className="A4">④ {previewQuestion.options[3]}</p>
                    <p className="A5">⑤ {previewQuestion.options[4]}</p>
                    <button
                      className="aipreview-btn1"
                      onClick={() => handleEdit(previewQuestion)}
                    >
                      수정
                    </button>
                    <button
                      className="aipreview-btn2"
                      onClick={() => deleteQ(previewQuestion.id)}
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <br />
      <div className="aipreview-butbox">
        <button className="aipreview-back" onClick={handleBack}>
          뒤로가기
        </button>
        <br></br>
        <button className="aipreview-btn" onClick={handleGenerateai}>
          문제저장
        </button>
      </div>
    </div>
  );
};

export default Aipreview;
