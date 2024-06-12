// import React from "react";
// import { Bar } from "react-chartjs-2";
// import { Chart, registerables } from "chart.js";
// import { useLocation, useParams } from "react-router-dom";
// import "../css/chart.css";

// Chart.register(...registerables);

// const ScoreChart = () => {
//   const type = sessionStorage.getItem("mem_type");
//   const mem_id = sessionStorage.getItem("mem_id");
//   const mem_name = sessionStorage.getItem("mem_name");

//   const { studentId } = useParams();
//   const location = useLocation();
//   const score = location.state?.score || null;
//   const studentName = location.state?.studentName || "학생";

//   const studentsData = {
//     [studentId]: [
//       { date: "20240101", score: 85 },
//       { date: "20240201", score: 90 },
//       { date: new Date().toISOString().split("T")[0], score },
//     ],
//   };

//   const data = studentsData[studentId] || [];

//   // 평균 점수 계산
//   const averageScore =
//     data.reduce((sum, item) => sum + item.score, 0) / data.length;

//   const chartIn = {
//     labels: data.map((item) => item.date),
//     datasets: [
//       {
//         label: "점수",
//         data: data.map((item) => item.score),
//         backgroundColor: "#239aff",
//         borderColor: "#239aff",
//         borderWidth: 2,
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       x: {
//         ticks: {
//           maxRotation: 0,
//           minRotation: 0,
//           font: {
//             size: 14,
//           },
//           color: "#239aff",
//         },
//       },
//       y: {
//         beginAtZero: true,
//         max: 100,
//       },
//     },
//     maintainAspectRatio: true,
//   };

//   return (
//     <div>
//       <div>
//         <h2 className="chart-title">·{studentName} 학생 성적 보기</h2>
//         <br></br>
//         <div className="chart-box">
//           <div className="chart">
//             <Bar data={chartIn} options={options} />
//             <h3 className="chart-h3">평균 점수: {averageScore.toFixed(2)}</h3>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ScoreChart;
