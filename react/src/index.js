import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./main";
import Join from "./js/join";
import Login from "./js/login";
import Tp from "./js/termspage";
import Joinsuccess from "./js/joinsuccess";
import Createhome from "./js/createhome";
import Find from "./js/find";
import Createai from "./js/createai";
import Questionsok from "./js/questionsok";
import Questionslist from "./js/questionslist";
import StudyRoom from "./js/studyroom";
import Aipreview from "./js/aipreview";
import Createaproblem from "./js/createaproblem";
import Infostudent from "./js/infostudent";
import Vocabularynote from "./vocabularynote";
import StudentPage from "./js/studentPage";
import Outservice from "./js/outservice";
import Loading from "./js/loading";
import Vd from "./vocabularydetails";
import Outsuccess from "./js/outsuccess";
import Teacherpage from "./js/teacherpage";
import Wq from "./woorquestions";
import Mp from "./js/markpage";
import Goodboy from "./js/goodboy";
import All from "./js/allpreview";
import Addword from "./js/addword";
import Findid from "./js/findid";
import Findpw from "./js/findpw";
import Testpaper from "./js/testpaper";
import Namelist from "./js/namelist";
import Jointeacher from "./js/jointeacher";
import Chart from "./Component/Chart";
import ScoreChart from "./js/scorechart";
import EditExam from "./Component/EditExam";
import StudyRecord from "./js/studyrecord";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tp" element={<Tp />} />
        <Route path="/js" element={<Joinsuccess />} />
        <Route path="/createhome" element={<Createhome />} />
        <Route path="/find" element={<Find />} />
        <Route path="/findid" element={<Findid />} />
        <Route path="/findpw" element={<Findpw />} />
        <Route path="/createai" element={<Createai />} />
        <Route path="/questionsok" element={<Questionsok />} />
        <Route path="/questionslist" element={<Questionslist />} />
        <Route path="/studyRoom" element={<StudyRoom />} />
        <Route path="/aipreview" element={<Aipreview />} />
        <Route path="/createaproblem" element={<Createaproblem />} />
        <Route path="/is" element={<Infostudent />} />
        <Route path="/note" element={<Vocabularynote />} />
        <Route path="/sp" element={<StudentPage />} />
        <Route path="/out" element={<Outservice />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/vd" element={<Vd />} />
        <Route path="/os" element={<Outsuccess />} />
        <Route path="/teacher" element={<Teacherpage />} />
        <Route path="/wq" element={<Wq />} />
        <Route path="/markpage" element={<Mp />} />
        <Route path="/good" element={<Goodboy />} />
        <Route path="/allpreview" element={<All />} />
        <Route path="/aw" element={<Addword />} />
        <Route path="/testpaper" element={<Testpaper />} />
        <Route path="/namelist" element={<Namelist />} />
        <Route path="/jointeacher" element={<Jointeacher />} />
        <Route path="/sr" element={<StudyRecord />} />
        <Route path="/chart/:studentId" element={<Chart />} />
        <Route path="/scorechart" element={<ScoreChart />} />
        <Route path="/editexam" element={<EditExam />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
