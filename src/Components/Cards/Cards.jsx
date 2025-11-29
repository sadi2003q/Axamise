import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { PieChart, Pie, Cell } from "recharts"; // Removed Legend import
import { iconsImgs } from "../../utils/images";
import "./Cards.css";

const COLORS = ["#FFA500", "#0088FE", "#00C49F", "#FFBB28"];

const Cards = () => {
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const snap = await getDocs(collection(db, "Students")); 
        setTotalStudents(snap.size);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };

    fetchStudents();
  }, []);

  const pieData = [
    { name: "Students", value: totalStudents },
  ]

  return (
    <div className="grid-one-item grid-common grid-c1">
      <div className="grid-c-title" style={{marginBottom: '0.5rem'}}>
        <h3 className="grid-c-title-text" style={{fontWeight:700, fontSize:'1.15rem', color:'#fff', letterSpacing:'0.5px', fontFamily:'Roboto Mono, monospace', textShadow:'0 2px 8px #29221d'}}>👥 Students</h3>
        <button className="grid-c-title-icon" style={{background:'#29221d', borderRadius:'50%', boxShadow:'0 2px 8px #667eea33'}}>
          <img src={iconsImgs.user} alt="Add Student" style={{filter:'invert(1)'}} />
        </button>
      </div>

      <div className="grid-c1-content">
        <p>Total Students</p>
        <div className="lg-value">{totalStudents}</div>

        <PieChart width={250} height={200}>
          <Pie
            data={pieData}
            cx={120}
            cy={90}
            innerRadius={50}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
          >
            {pieData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          {/* Legend removed */}
        </PieChart>
      </div>
    </div>
  );
};

export default Cards;
