import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "./StudentGrowthChart.css";

function getMonthName(monthIndex) {
  return [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ][monthIndex];
}

const StudentGrowthChart = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyStudentData = async () => {
      try {
        const snap = await getDocs(collection(db, "Students"));
        const monthCount = {};
        snap.forEach(doc => {
          const data = doc.data();
          if (data.createdAt) {
            const date = data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt);
            const key = `${date.getFullYear()}-${date.getMonth()}`;
            monthCount[key] = (monthCount[key] || 0) + 1;
          }
        });
        // Convert to chart data
        const chartData = Object.entries(monthCount)
          .map(([key, count]) => {
            const [year, month] = key.split("-").map(Number);
            return {
              name: `${getMonthName(month)} ${year}`,
              Students: count
            };
          })
          .sort((a, b) => {
            const [aMonth, aYear] = a.name.split(" ");
            const [bMonth, bYear] = b.name.split(" ");
            return new Date(`${aYear}-${aMonth}-01`) - new Date(`${bYear}-${bMonth}-01`);
          });
        setMonthlyData(chartData);
      } catch (err) {
        setMonthlyData([]);
      }
      setLoading(false);
    };
    fetchMonthlyStudentData();
  }, []);

  return (
    <div className="student-growth-card">
      <div className="grid-c-title" style={{marginBottom: '0.5rem'}}>
        <h3 className="grid-c-title-text" style={{fontWeight:700, fontSize:'1.15rem', color:'#fff'}}>📈 Student Growth (Monthly)</h3>
      </div>
      <div className="student-growth-chart-area">
        {loading ? (
          <div className="loading-text">Loading chart...</div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#473b33" />
              <XAxis dataKey="name" stroke="#bdbabb" />
              <YAxis stroke="#bdbabb" />
              <Tooltip contentStyle={{ backgroundColor: "#1e1611", border: "1px solid #667eea", borderRadius: "4px", color: "#fff" }} />
              <Line type="monotone" dataKey="Students" stroke="#667eea" strokeWidth={3} dot={{ r: 5, fill: '#27ae60' }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default StudentGrowthChart;
