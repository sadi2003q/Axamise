import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { iconsImgs } from "../../utils/images";
import "./Report.css";

const Report = () => {
  const navigate = useNavigate();
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [approvedQuestions, setApprovedQuestions] = useState(0);

  const [totalEvents, setTotalEvents] = useState(0);
  const [approvedEvents, setApprovedEvents] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ===== QUESTIONS =====
        const totalQuestionsSnap = await getDocs(collection(db, "questions"));
        const approvedQuestionsSnap = await getDocs(collection(db, "ApprovedQuestions"));

        // ===== EVENTS (updated logic) =====
        const totalEventsSnap = await getDocs(collection(db, "Events"));
        setTotalEvents(totalEventsSnap.size);

        const approvedEventsQuery = query(
          collection(db, "Events"),
          where("status", "==", "approved")
        );
        const approvedEventsSnap = await getDocs(approvedEventsQuery);
        setApprovedEvents(approvedEventsSnap.size);

        setTotalQuestions(totalQuestionsSnap.size);
        setApprovedQuestions(approvedQuestionsSnap.size);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching report data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = () => {
    navigate("/FINANCIAL_REPORT");
  };

  const chartData = [
    {
      name: "Questions",
      total: totalQuestions,
      approved: approvedQuestions,
      pending: totalQuestions - approvedQuestions,
    },
    {
      name: "Events",
      total: totalEvents,
      approved: approvedEvents,
      pending: totalEvents - approvedEvents,
    },
  ];

  return (
  <div className="grid-one-item grid-common grid-c3 report-glass" onClick={handleViewDetails} style={{ cursor: 'pointer' }}>
      <div className="grid-c-title" style={{marginBottom: '0.5rem'}}>
        <h3 className="grid-c-title-text" style={{fontWeight:700, fontSize:'1.35rem', letterSpacing:'0.5px', color:'#fff', textShadow:'0 2px 8px #29221d'}}>📊 Report & Analytics</h3>
        <button 
          className="grid-c-title-icon" 
          style={{background:'#29221d', borderRadius:'50%', boxShadow:'0 2px 8px #667eea33'}}
          onClick={(e) => {
            e.stopPropagation();
            handleViewDetails();
          }}
        >
          <img src={iconsImgs.plus} alt="View Details" style={{filter:'invert(1)'}} />
        </button>
      </div>

      <div className="grid-c3-content">
        {loading ? (
          <div className="loading-text">Loading report data...</div>
        ) : (
          <div className="report-chart-container">
            {(!totalEvents && !approvedEvents) && (
              <div style={{
                color: '#ffb347',
                background: '#29221d',
                padding: '10px',
                borderRadius: '8px',
                marginBottom: '10px',
                textAlign: 'center',
                fontWeight: 600
              }}>
                ⚠️ No events found. Please check Firestore "Events" collection.
              </div>
            )}

            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#473b33" />
                <XAxis dataKey="name" stroke="#bdbabb" />
                <YAxis stroke="#bdbabb" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e1611",
                    border: "1px solid #667eea",
                    borderRadius: "4px",
                    color: "#fff"
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: "10px" }} />
                <Bar dataKey="total" fill="#667eea" radius={[8, 8, 0, 0]} />
                <Bar dataKey="approved" fill="#27ae60" radius={[8, 8, 0, 0]} />
                <Bar dataKey="pending" fill="#e74c3c" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

            <div className="report-stats">
              <div className="stat-item">
                <span className="stat-label">Total Questions:</span>
                <span className="stat-value">{totalQuestions}</span>
              </div>

              <div className="stat-item">
                <span className="stat-label">Approved Questions:</span>
                <span className="stat-value approved">{approvedQuestions}</span>
              </div>

              <div className="stat-item">
                <span className="stat-label">Total Events:</span>
                <span className="stat-value">{totalEvents}</span>
              </div>

              <div className="stat-item">
                <span className="stat-label">Approved Events:</span>
                <span className="stat-value approved">{approvedEvents}</span>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Report;

