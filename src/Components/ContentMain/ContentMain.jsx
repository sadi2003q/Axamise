import "./ContentMain.css";
import Students from "../Students/Students";
import Transactions from "../Transactions/Transactions";
import Report from "../Report/Report";
import StudentGrowthChart from "../StudentGrowthChart/StudentGrowthChart";
import Events from "../Events/Events";


const ContentMain = () => {
  return (
    <div className="main-content-holder">
    <div className="content-grid-one">
  <Students />
  <Transactions />
  <Report />
    </div>
        <div className="content-grid-two">
            <div className="grid-two-item" style={{gridColumn: 'span 3'}}>
              <StudentGrowthChart />
            </div>
            <div className="grid-two-item">
              <div className="subgrid-two">
                <Events />
                {/* Financial card moved to grid-one above */}
              </div>
            </div>
        </div>
    </div>
  )
}

export default ContentMain
