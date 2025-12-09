import { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { personsImgs, iconsImgs } from '../../utils/images';
import { navigationLinks } from '../../data/data';
import { SidebarContext } from '../../context/sidebarContext';
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext);
  const [sidebarClass, setSidebarClass] = useState("");

  useEffect(() => {
    setSidebarClass(isSidebarOpen ? 'sidebar-change' : '');
  }, [isSidebarOpen]);

  const handleLinkClick = (link) => {
    // If Home is clicked, toggle sidebar
    if(link.title === 'Home') toggleSidebar();
    navigate(link.path);
  }

  // Read admin profile from localStorage
  const [adminProfile, setAdminProfile] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('adminProfile')) || { name: 'Admin', image: '' };
    } catch {
      return { name: 'Admin', image: '' };
    }
  });

  // Listen for changes to localStorage (e.g., from SettingsPage)
  useEffect(() => {
    const updateProfile = () => {
      try {
        setAdminProfile(JSON.parse(localStorage.getItem('adminProfile')) || { name: 'Admin', image: '' });
      } catch {
        setAdminProfile({ name: 'Admin', image: '' });
      }
    };
    window.addEventListener('storage', updateProfile);
    window.addEventListener('adminProfileUpdated', updateProfile);
    return () => {
      window.removeEventListener('storage', updateProfile);
      window.removeEventListener('adminProfileUpdated', updateProfile);
    };
  }, []);

  return (
    <div className={`sidebar ${sidebarClass}`}>
      <div className="user-info">
        <div className="info-img img-fit-cover">
          {adminProfile.image ? (
            <img src={adminProfile.image} alt="profile image" />
          ) : (
            <img src={personsImgs.person_two} alt="profile image" />
          )}
        </div>
        <span className="info-name">{adminProfile.name || 'Admin'}</span>
      </div>

      <nav className="navigation">
        <ul className="nav-list">
          {navigationLinks.map((link) => (
            <li className="nav-item" key={link.id}>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); handleLinkClick(link); }}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                <img src={link.image} className="nav-link-icon" alt={link.title} />
                <span className="nav-link-text">{link.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
