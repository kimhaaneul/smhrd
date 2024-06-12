import React, { useState, useEffect } from "react";
import Navbar from "../Component/Navbar";
import NavbarT from "../Component/NavbarT";
import "../css/addword.css";
import pin from "../img/notepin1.png";
import axios from "axios";
import { Link } from "react-router-dom";

const AddWord = () => {
  const [word, setWord] = useState("");
  const [vocaMean, setTranslation] = useState("");
  const [error, setError] = useState(null);
  const [memId, setMemId] = useState("");
  const [memType, setMemType] = useState("");

  useEffect(() => {
    const updateSessionData = () => {
      setMemId(sessionStorage.getItem("mem_id"));
      setMemType(sessionStorage.getItem("mem_type"));
    };

    updateSessionData();

    window.addEventListener("storage", updateSessionData);

    return () => {
      window.removeEventListener("storage", updateSessionData);
    };
  }, []);

  const handleInputChange = (e) => {
    setWord(e.target.value);
  };

  const handleTranslate = async () => {
    try {
      const response = await axios.post("http://localhost:5050/translate", {
        word,
      });
      if (response.data.translation) {
        setTranslation(response.data.translation);
      } else {
        setTranslation("번역 오류");
      }
      setError(null);
    } catch (error) {
      console.error("trans" + error);
      setTranslation("번역 오류");
      setError("번역 서버에 문제가 있습니다. 나중에 다시 시도해 주세요.");
    }
  };

  const handleAddWordToDB = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/addWord",
        {
          memId,
          vocaWord: word,
          vocaMean,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data); // 서버로부터의 응답 확인
      // 성공적으로 추가되었다는 메시지가 필요하면 여기에 처리
      alert("단어가 저장되었습니다.");
    } catch (error) {
      console.error("에러" + error);
      setError("서버에 문제가 발생했습니다. 나중에 다시 시도해 주세요.");
    }
  };

  return (
    <div>
      {memType === "1" ? <NavbarT /> : <Navbar />}
      <h1 className="addtitle">· 단어장</h1>
      <img src={pin} className="pinimg" alt="pin" />
      <div className="addbox">
        <table className="addtable">
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="word"
                  id="addword"
                  placeholder="단어를 입력해주세요."
                  value={word}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <button onClick={handleTranslate} id="transbtn">
                  번역하기
                </button>
              </td>
              <td>
                <button onClick={handleAddWordToDB} id="addbtn">
                  단어장에 추가
                </button>
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="transpont">
                {vocaMean && <p>{vocaMean}</p>}
              </td>
            </tr>
            {error && (
              <tr>
                <td colSpan="2">
                  <p className="error">{error}</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <br />
      <Link to="/note" component="button" id="govoca">
        단어장으로
      </Link>
    </div>
  );
};

export default AddWord;
