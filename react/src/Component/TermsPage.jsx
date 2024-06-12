import React from "react";
import "./styles.css";

const TermsPage = () => {
  return (
    <div className="container">
      <h1>이용약관</h1>
      <div className="content">
        <div className="terms">
          <textarea
            id="terms-content"
            rows="10"
            cols="50"
            placeholder="이용약관을 입력하세요"
          ></textarea>
        </div>
        <div className="agree">
          <label>
            <input type="radio" name="agree" value="agree" />
            동의합니다
          </label>
          <label>
            <input type="radio" name="agree" value="disagree" />
            동의하지 않습니다
          </label>
        </div>
      </div>
    </div>
  );
};
