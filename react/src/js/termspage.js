import React, { useState } from "react";
import "../css/termspage.css";
import Navbar from "../Component/Navbar";
import NavbarT from "../Component/NavbarT";
import Footer from "../Component/Footer";
import { Link } from "react-router-dom";

const type = sessionStorage.getItem("mem_type");
const mem_id = sessionStorage.getItem("mem_id");
const mem_name = sessionStorage.getItem("mem_name");
const mem_address = sessionStorage.getItem("mem_address");
const mem_number = sessionStorage.getItem("mem_number");
const mem_email = sessionStorage.getItem("mem_email");

const Termspage = () => {
  const [firstCheck, setFirstCheck] = useState(null); // 상태 추가
  const [secondCheck, setSecondCheck] = useState(null); // 상태 추가
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태 추가

  const clickNext = (e) => { // 클릭 핸들러 추가
    if (firstCheck && secondCheck) {
      // 라디오 버튼 첫번째와 두번째 모두 체크해야 다음 페이지로 이동
    } else {
      e.preventDefault(); // 여기에 괄호 추가
      setErrorMessage("약관에 동의해주세요."); // 에러 메시지 설정
    }
  };

  return (
    <div>
      {type === 1 ? <NavbarT /> : <Navbar />}
      <div className="terms-container">
        <div className="terms-content">
          <h2 className="how">이용약관</h2>
          <div className="scrollable-content">
            제1조(목적)
            <br />본 약관은 에듀워드 학습지 회사(이하 '회사'라 한다)와 동 회사가
            제공하는 학습지를 제공받는 자<br />
            (이하 '학원'이라 한다) 사이의 계약상 권리. 의무에 관한 사항을
            규정함을 목적으로 합니다. <br />
            <br />
            제2조(계약 기간)
            <br /> ① 계약기간은 1개월을 원칙으로 하며, 회원이 월회비(대금)를
            매월 납부함에 따라 계약기간은 1개월씩 연장되는 것으로 합니다.
            <br /> ② 단, 장기(2개월 이상)계약을 체결하게 될 경우, 회사는 회원이
            중도해지시 지급하게 될 위약금 조항을 설명하여야 합니다.
            <br />
            <br /> 제3조 (입회비)
            <br /> 계약종료시 입회비는 반환되지 않으나, 회원과 재계약을 체결하게
            될 경우 회사는 그 회원에게 다시 입회비를 요구할 수 없습니다.
            <br />
            <br />
            제4조(계약내용의 변경)
            <br /> ① 회원이 계약서에 기재된 장소 또는 학습지 종류의 변경을
            원하는 경우 등에는 지체없이 회사에 통지하여야 합니다.
            <br /> ② 전항의 통지내용에 대해서는 회사와 합의하여야 합니다. ③
            전항의 합의가 이루어지지 않는 경우 회원과 회사는 계약을 <br />
            해지할 수 있으며, 해지된 경우 계약기간에 따라 제7조 또는 제8조
            제1항을 적용합니다.
            <br />
            <br /> 제5조(무단복제 등의 금지)
            <br /> ①회원에게 제공된 학습지의 저작권은 회사에 있습니다. ②회원은
            제공받은 학습지를 회사의 이익을 해하는 방향으로 <br />
            무단 복제할 수 없습니다. <br />
            ②전항의 사유로 인하여 회사에 발생되는 손해는 해당 회원이 배상하여야
            합니다. 제7조(단기계약의 해지) 계약기간을 1개월로 <br />
            정한 경우, 회원은 제6조의 철회기간 경과 후 언제든지 해지할 수
            있으며, 회사는 해지의 통지를 받은 날을 기준으로 회사가 합리적인{" "}
            <br />
            범위 내에서 정한 기준에 따라 잔여기간에 해당하는 월회비(대금)를
            환불하여야 합니다. <br />
            <br />제 12조(약관의 변경)
            <br /> ① 회사가 약관을 변경할 경우, 회사는 그 내용을 서명으로
            작성하여 적용 예정일로부터 14일 이전까지 회원에게 통지하여야 합니다.{" "}
            <br />
            ②회원이 전항의 변경사항에 관하여 명시적으로 동의하지 않으면 회사의
            변경된 약관은 회원에게 효력이 없습니다. <br />
            <br />
            제13조(기타) <br />
            ①본 약관에서 규정하지 않은 사항은 관계법령 및 거래관행을 고려하여
            신의성실의 원칙에 따라 회사와 회원간에 합의하여 <br />
            해결합니다.
          </div>
          <div className="radio-group">
            <input type="radio" id="agree" name="terms" onChange={() => setFirstCheck(true)} />
            <label htmlFor="agree">동의합니다</label>
            <input type="radio" id="disagree" name="terms" onChange={() => setFirstCheck(false)} />
            <label htmlFor="disagree">동의하지 않습니다</label>
          </div>
          <br></br>
          <br></br>
          <h2 className="how">개인정보 수집 및 이용에 대한 안내</h2>
          <div className="scrollable-content2">
            개인(신용)정보 수집·이용에 대한 동의 · 개인(신용)정보를 아래와 같이
            수집·이용하는 것에 동의합니다.
            <br />
            <br /> - 개인정보의 수집·이용목적 : 학습지 이용에 대한 가입 동의
            <br />- 수집·이용하는 개인(신용)정보의 항목 : 성명, 생년월일, 성별,
            휴대폰, 주소
            <br />- 개인(신용)정보의 보유기간 : 수집·이용 동의일로부터 1년
            <br />- 개인(신용)정보의 이용기간 : 수집·이용 동의일로부터 3개월
            <br />
            <br />
            소비자 권익보호에 관련한 사항
            <br /> · 최소한의 정보 처리및 동의거부에 관한 안내 정보동의 시
            최소한의 정보만 수집·이용하게 되며, 본 동의를 거부하시는 경우에는
            <br />
            정상적인 서비스 제공이 불가능할 수 있음을 알려드립니다.
            <br /> · 개인(신용)정보 제공동의 철회 개인(신용)정보 제공 및 이용에
            동의한 이후에도 전화 010-8945-1455, <br />
            서면 등을 통해 개인(신용)정보 제공 동의를 언제든지 철회할 수
            있습니다.
          </div>
        </div>
        <div className="radio-group">
          <input type="radio" id="agree" name="privacy" onChange={() => setSecondCheck(true)} />
          <label htmlFor="agree">동의합니다</label>
          <input type="radio" id="disagree" name="privacy" onChange={() => setSecondCheck(false)} />
          <label htmlFor="disagree">동의하지 않습니다</label>
        </div>
        <br></br>
        {errorMessage && <p style={{ color: 'red', fontSize:'15pt',fontWeight:'bold' }}>{errorMessage}</p>} {/* 에러 메시지 표시 */}
        <div className="join2">
          <a href="/jointeacher" className="moveTeacher"  onClick={clickNext}>선생님 가입하기</a> {/* onClick 이벤트 추가 */}
        </div>
        <div className="button-container">
          <Link to="/join" onClick={clickNext}>
            <button id="next">다음으로</button>
          </Link>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
      <Footer />
    </div>
  );
};

export default Termspage;
