// 클라이언트 측 VocabularyNote 컴포넌트 코드
import React, { useState, useEffect } from "react";
import NavbarT from "./Component/NavbarT";
import Navbar from "./Component/Navbar";
import { useNavigate } from "react-router-dom";
import "../src/vocabularynote.css";
import pin from "../src/img/notepin1.png";
import axios from "axios";

const VocabularyNote = () => {
  const [wordSets, setWordSets] = useState([]);
  const navigate = useNavigate();
  const mem_id = sessionStorage.getItem("mem_id");
  const mem_type = sessionStorage.getItem("mem_type");
  const [selectedWords, setSelectedWords] = useState([]);

  useEffect(() => {
    if (mem_id) {
      axios
        .post("http://localhost:8081/words", { mem_id: mem_id })
        .then((response) => {
          console.log(response.data); // 데이터 확인
          setWordSets(response.data);
        })
        .catch((error) => {
          console.error("단어를 가져오는 중 오류 발생:", error);
        });
    }
  }, [mem_id]);

  const handleWordClick = (word, meaning) => {
    navigate("/vd", { state: { word, meaning } });
  };

  const handleWordDelete = (voca_seq) => {
    axios
      .post("http://localhost:8081/deleteWord", voca_seq, {
        headers: {
          "Content-Type": "application/json",
        },
      }) // 객체 형태로 전송하지 않고, 단순히 숫자 형태로 전송
      .then((response) => {
        console.log(response.data);
        const updatedWordSets = wordSets.filter(
          (wordSet) => wordSet.voca_seq !== voca_seq
        );
        setWordSets(updatedWordSets);
      })
      .catch((error) => {
        console.error("단어를 삭제하는 중 오류 발생:", error);
        alert("단어 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
      });
  };

  const divideArrayInHalf = (arr) => {
    const middleIndex = Math.ceil(arr.length / 2);
    return [arr.slice(0, middleIndex), arr.slice(middleIndex)];
  };

  const [firstHalf, secondHalf] = divideArrayInHalf(wordSets);

  return (
    <div>
      {mem_type === "1" ? <NavbarT /> : <Navbar />}
      <h1 className="vocabularynote-title">· 단어장</h1>
      <img src={pin} className="vn-pin" alt="Pin" />
      <div className="vn-box">
        <div className="vn-set">
          <table className="vn-table">
            <thead>
              <tr>
                <th className="vn-th">단어</th>
                <th className="vn-th">뜻</th>
                <th className="vn-th"></th> {/* 추가된 열 */}
              </tr>
            </thead>
            <tbody>
              {firstHalf.map((wordSet) => (
                <tr key={wordSet.voca_seq}>
                  <td
                    className="vn-td"
                    onClick={() =>
                      handleWordClick(wordSet.vocaWord, wordSet.vocaMean)
                    }
                  >
                    {wordSet.vocaWord}
                  </td>
                  <td
                    className="vn-td"
                    onClick={() =>
                      handleWordClick(wordSet.vocaWord, wordSet.vocaMean)
                    }
                  >
                    {wordSet.vocaMean}
                  </td>
                  <td>
                    <button
                      className="vn-btn-delete"
                      onClick={() => handleWordDelete(wordSet.voca_seq)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="vn-set">
          <table className="vn-table">
            <thead>
              <tr>
                <th className="vn-th">단어</th>
                <th className="vn-th">뜻</th>
                <th className="vn-th"></th> {/* 추가된 열 */}
              </tr>
            </thead>
            <tbody>
              {secondHalf.map((wordSet) => (
                <tr key={wordSet.voca_seq}>
                  <td
                    className="vn-td"
                    onClick={() =>
                      handleWordClick(wordSet.vocaWord, wordSet.vocaMean)
                    }
                  >
                    {wordSet.vocaWord}
                  </td>
                  <td
                    className="vn-td"
                    onClick={() =>
                      handleWordClick(wordSet.vocaWord, wordSet.vocaMean)
                    }
                  >
                    {wordSet.vocaMean}
                  </td>
                  <td>
                    <button
                      className="vn-btn-delete"
                      onClick={() => handleWordDelete(wordSet.voca_seq)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VocabularyNote;
