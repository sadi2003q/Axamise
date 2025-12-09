import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { iconsImgs } from "../../utils/images";
import "./Transactions.css";

const COLORS = ["#4CAF50", "#FF8042"]; // Green = approved, orange = pending

const Questions = () => {
  const navigate = useNavigate();
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [approvedQuestions, setApprovedQuestions] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // All submitted questions
        const totalSnap = await getDocs(collection(db, "questions"));
        setTotalQuestions(totalSnap.size);

        // Approved questions
        const approvedSnap = await getDocs(collection(db, "ApprovedQuestions"));
        setApprovedQuestions(approvedSnap.size);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };

    fetchQuestions();
  }, []);

  // Prepare PieChart data
  const pieData = [
    { name: "Approved", value: approvedQuestions },
    { name: "Pending", value: totalQuestions - approvedQuestions },
  ];

  return (
    <div className="grid-one-item grid-common grid-c2">
      <div className="grid-c-title" style={{marginBottom: '0.5rem'}}>
        <h3 className="grid-c-title-text" style={{fontWeight:700, fontSize:'1.15rem', color:'#fff', letterSpacing:'0.5px', fontFamily:'Roboto Mono, monospace', textShadow:'0 2px 8px #29221d'}}>❓ Questions</h3>
        <button className="grid-c-title-icon" style={{background:'#29221d', borderRadius:'50%', boxShadow:'0 2px 8px #667eea33'}}>
          <img src={iconsImgs.search} alt="Add Question" style={{filter:'invert(1)'}} />
        </button>
      </div>

      <div className="grid-content">
        <div className="grid-items">

          {/* TOTAL QUESTIONS */}
          <div className="grid-item" style={{cursor:'pointer'}} onClick={() => navigate('/pending-questions')}>
            <div className="grid-item-l">
              <div className="avatar img-fit-cover">
                <img src={iconsImgs.plus} alt="Total Questions" />
              </div>
              <p className="text">Total Questions</p>
            </div>
            <div className="grid-item-r">
              <span className="text-blue">{totalQuestions}</span>
            </div>
          </div>

          {/* APPROVED QUESTIONS */}
          <div className="grid-item">
            <div className="grid-item-l">
              <div className="avatar img-fit-cover">
                <img src={iconsImgs.plus} alt="Approved Questions" />
              </div>
              <p className="text">Approved Questions</p>
            </div>
            <div className="grid-item-r">
              <span className="text-green">{approvedQuestions}</span>
            </div>
          </div>

          {/* PIE CHART */}
          <div className="grid-item-chart">
            <PieChart width={250} height={250}>
              <Pie
                data={pieData}
                cx={120}
                cy={100}
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend wrapperStyle={{ marginTop: 20 }} />
            </PieChart>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Questions;
