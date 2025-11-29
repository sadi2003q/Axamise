import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { iconsImgs } from "../../utils/images";
import "./Loans.css";

const COLORS = ["#4CAF50", "#FF8042"]; // Green = approved, Orange = others

const Loans = () => {
  const [totalEvents, setTotalEvents] = useState(0);
  const [approvedEvents, setApprovedEvents] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Get all events
        const eventsSnap = await getDocs(collection(db, "Events"));
        setTotalEvents(eventsSnap.size);

        // Get approved events
        const approvedQuery = query(
          collection(db, "Events"),
          where("status", "==", "approved")
        );
        const approvedSnap = await getDocs(approvedQuery);
        setApprovedEvents(approvedSnap.size);

      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

  // Prepare piechart data
  const pieData = [
    { name: "Approved Events", value: approvedEvents },
    { name: "Other Events", value: totalEvents - approvedEvents },
  ];

  return (
    <div className="subgrid-two-item grid-common grid-c7">
      <div className="grid-c-title" style={{marginBottom: '0.5rem'}}>
        <h3 className="grid-c-title-text" style={{fontWeight:700, fontSize:'1.15rem', color:'#fff', letterSpacing:'0.5px', fontFamily:'Roboto Mono, monospace', textShadow:'0 2px 8px #29221d'}}>📅 Events</h3>
        <button className="grid-c-title-icon" style={{background:'#29221d', borderRadius:'50%', boxShadow:'0 2px 8px #667eea33'}}>
          <img src={iconsImgs.bell} alt="Add Event" style={{filter:'invert(1)'}} />
        </button>
      </div>

      <div className="grid-c7-content">
        {/* Circle Progress */}
        <div className="progress-bar">
          <div className="percent">
            <svg>
              <circle cx="105" cy="105" r="50"></circle>
            </svg>
            <div className="number">
              <h3>{totalEvents}</h3>
            </div>
          </div>
        </div>

        {/* List Information */}
        <ul className="data-list">
          <li className="data-item text-silver-v1">
            <span className="data-item-text">Total Events</span>
            <span className="data-item-value">{totalEvents}</span>
          </li>

          <li className="data-item text-silver-v1">
            <span className="data-item-text">Approved Events</span>
            <span className="data-item-value">{approvedEvents}</span>
          </li>
        </ul>

        {/* Pie Chart */}
        <div style={{ marginTop: "-15px", display: "flex", justifyContent: "center" }}>
          <PieChart width={250} height={270}>
            <Pie
              data={pieData}
              cx={120}
              cy={110}
              innerRadius={40}
              outerRadius={75}
              paddingAngle={3}
              dataKey="value"
            >
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Loans;
