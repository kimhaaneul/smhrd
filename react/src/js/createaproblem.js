import React, { useState, useEffect } from "react";
import NavbarT from "../Component/NavbarT";
import Navbar from "../Component/Navbar";
import "../css/createaproblem.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const type = sessionStorage.getItem("mem_type");
const mem_id = sessionStorage.getItem("mem_id");

const CreateAProblem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [problemCount, setProblemCount] = useState(0);
  const [qes_detail, setQes_detail] = useState("");
  const [qes_type, setQes_type] = useState("객관식");
  const [qes_level, setQes_level] = useState(1);
  const [qes_desc, setQes_desc] = useState("");
  const [qes_answer, setQes_answer] = useState("");
  const [ex1, setEx1] = useState("");
  const [ex2, setEx2] = useState("");
  const [ex3, setEx3] = useState("");
  const [ex4, setEx4] = useState("");
  const [ex5, setEx5] = useState("");

  useEffect(() => {
    if (location.state) {
      setProblemCount(location.state.problemCount);
    }
  }, [location.state]);

  const saveProblem = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/addQes",
        {
          qes_desc,
          qes_detail,
          qes_answer,
          qes_level,
          qes_type,
          ex1,
          ex2,
          ex3,
          ex4,
          ex5, // ex5 추가
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setProblemCount((prevCount) => prevCount + 1);
        alert("문제가 성공적으로 저장되었습니다.");
        resetForm(); // 입력 필드를 초기화하는 함수 호출
      } else {
        alert("문제 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error saving problem:", error);
      alert("문제 저장 중 오류가 발생했습니다.");
    }
  };

  const resetForm = () => {
    setQes_detail("");
    setQes_type("객관식");
    setQes_level(1);
    setQes_desc("");
    setQes_answer("");
    setEx1("");
    setEx2("");
    setEx3("");
    setEx4("");
    setEx5("");
  };

  const handleNavigateWQ = () => {
    navigate("/wq");
  };

  return (
    <div>
<NavbarT></NavbarT>
      <h2 className="createproblem-title">· 직접 문제 생성</h2>
      <div>
        <table className="createproblem-table">
          <tbody>
            <tr>
              <th className="createproblem-th1" colSpan={2}>
                문제 유형
              </th>
              <td className="createproble-radio">
                <input
                  type="radio"
                  className="Short"
                  name="problemType"
                  checked={qes_type === "주관식"}
                  onChange={() => setQes_type("주관식")}
                />
                주관식
                <input
                  type="radio"
                  className="choice"
                  name="problemType"
                  checked={qes_type === "객관식"}
                  onChange={() => setQes_type("객관식")}
                />
                객관식
              </td>
            </tr>
            {/* <hr /> */}
            {/* <tr>
              <th className="createproblem-th2" colSpan={2}>
                난이도
              </th>
              <td>
                <input
                  type="number"
                  placeholder="난이도를 선택하세요"
                  min={1}
                  max={5}
                  value={qes_level}
                  onChange={(e) => setQes_level(Number(e.target.value))}
                />
              </td>
            </tr> */}
            <hr />
            <tr>
              <th className="createproblem-th2" colSpan={2}>
                출제문항수
              </th>
              <td>
                <p className="createproblem-p">
                  현재 {problemCount}문제가 저장되었습니다.
                </p>
              </td>
            </tr>
            <hr />
            <tr>
              <th className="createproblem-th3" colSpan={2}>
                문제
              </th>
              <td>
                <input
                  type="text"
                  className="createproblem-questions"
                  placeholder="문제를 입력해주세요."
                  value={qes_desc}
                  onChange={(e) => setQes_desc(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th className="createproblem-th4" colSpan={2}>
                지문
              </th>
              <td>
                <textarea
                  className="createproblem-detail"
                  placeholder="지문을 입력해주세요."
                  value={qes_detail}
                  onChange={(e) => setQes_detail(e.target.value)}
                />
              </td>
            </tr>
            {qes_type === "객관식" && (
              <>
                <tr>
                  <th className="createproblem-th4" colSpan={2}>
                    보기
                  </th>
                  <td>
                    <input
                      type="text"
                      name="createproblem-ex1"
                      placeholder="보기를 입력해주세요."
                      value={ex1}
                      onChange={(e) => setEx1(e.target.value)}
                    />
                    <input
                      type="radio"
                      name="correctAnswer"
                      onChange={() => setQes_answer(ex1)}
                    />
                  </td>
                </tr>
                <tr>
                  <th className="createproblem-th4" colSpan={2}></th>
                  <td>
                    <input
                      type="text"
                      name="createproblem-ex2"
                      placeholder="보기를 입력해주세요."
                      value={ex2}
                      onChange={(e) => setEx2(e.target.value)}
                    />
                    <input
                      type="radio"
                      name="correctAnswer"
                      onChange={() => setQes_answer(ex2)}
                    />
                  </td>
                </tr>
                <tr>
                  <th className="createproblem-th4" colSpan={2}></th>
                  <td>
                    <input
                      type="text"
                      name="createproblem-ex3"
                      placeholder="보기를 입력해주세요."
                      value={ex3}
                      onChange={(e) => setEx3(e.target.value)}
                    />
                    <input
                      type="radio"
                      name="correctAnswer"
                      onChange={() => setQes_answer(ex3)}
                    />
                  </td>
                </tr>
                <tr>
                  <th className="createproblem-th4" colSpan={2}></th>
                  <td>
                    <input
                      type="text"
                      name="createproblem-ex4"
                      placeholder="보기를 입력해주세요."
                      value={ex4}
                      onChange={(e) => setEx4(e.target.value)}
                    />
                    <input
                      type="radio"
                      name="correctAnswer"
                      onChange={() => setQes_answer(ex4)}
                    />
                  </td>
                </tr>
                <tr>
                  <th className="createproblem-th4" colSpan={2}></th>
                  <td>
                    <input
                      type="text"
                      name="createproblem-ex5"
                      placeholder="보기를 입력해주세요."
                      value={ex5}
                      onChange={(e) => setEx5(e.target.value)}
                    />
                    <input
                      type="radio"
                      name="correctAnswer"
                      onChange={() => setQes_answer(ex5)}
                    />
                  </td>
                </tr>
              </>
            )}
            {qes_type === "주관식" && (
              <tr>
                <th className="createproblem-th4" colSpan={2}>
                  정답
                </th>
                <td>
                  <input
                    type="text"
                    className="createproblem-answer"
                    placeholder="정답을 입력해주세요."
                    value={qes_answer}
                    onChange={(e) => setQes_answer(e.target.value)}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <br />
        <br />
        <br />
        <div className="btn-container">
          <button className="createproblem-btn" onClick={saveProblem}>
            문제저장
          </button>
          <button className="createproblem-btn2" onClick={handleNavigateWQ}>
            저장된 문제보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAProblem;
