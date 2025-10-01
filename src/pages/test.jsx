

// Dashboard.jsx
import { useGlobal } from "../GlobalContext";

export default function Dashboard() {
  const { adminEmail, setAdminEmail } = useGlobal();

  return (
    <div>
      <button onClick={() => setAdminEmail("admin@example.com")}>Set Admin Email</button>


      <p>Email: {adminEmail}</p>

      
    </div>
  );
}
