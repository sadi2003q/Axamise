import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./QuestionPendingList.css";

const QuestionPendingList = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      const snap = await getDocs(collection(db, "questions"));
      // Only show pending questions (not in ApprovedQuestions)
      // For demo, assume status field or filter by not approved
      const pending = snap.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(q => q.status === "pending" || !q.status);
      setQuestions(pending);
    };
    fetchQuestions();
  }, []);

  const handleApprove = (id) => {
    // Go to admin approval page for this question
    navigate("/ADMIN_APPROVAL", { state: { questionId: id } });
  };

  return (
    <div className="question-pending-list">
      <h2>Pending Questions</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {questions.map(q => (
            <tr key={q.id}>
              <td>{q.title || q.question || q.id}</td>
              <td>{q.description || '-'}</td>
              <td>{q.status || 'pending'}</td>
              <td>
                <button onClick={() => handleApprove(q.id)}>Approve</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionPendingList;
