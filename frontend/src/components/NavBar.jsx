import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "5px 20px",
      background: "#e4e4e",
      border: "2px groove #c3c7cb",
      fontFamily: "Tahoma, sans-serif",
      boxShadow: 'inset -1px -1px 1px #808080, inset 1px 1px 1px white',
    },
    brand: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "black",
      margin: 0,
    },
    menuToggle: {
      background: '#c3c7cb',
      border: '2px outset #c3c7cb',
      color: "#000",
      fontSize: "14px",
      padding: "2px 8px",
      cursor: "pointer",
      boxShadow: 'inset -1px -1px 1px #808080, inset 1px 1px 1px white',
    },
    links: {
      display: "flex",
      listStyle: "none",
      gap: "10px",
      margin: 0,
      padding: 0,
    },
    link: {
      textDecoration: "none",
      color: "#000",
      background: "#c3c7cb",
      padding: "3px 10px",
      border: "2px outset #c3c7cb",
      cursor: "pointer",
      fontSize: "12px",
      boxShadow: 'inset -1px -1px 1px #808080, inset 1px 1px 1px white',
      transition: "none",
    },
    linkActive: {
      background: "#000080",
      color: "white",
      border: "2px inset #c3c7cb",
    },
    responsiveLinks: {
      display: "none",
      flexDirection: "column",
      position: "absolute",
      top: "50px",
      right: "0",
      background: "#e4e4e4",
      width: "200px",
      border: "2px groove #c3c7cb",
      zIndex: 1000,
    },
    menuVisible: {
      display: "flex",
    },
  };

  return (
    <nav style={styles.navbar}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <h1 style={styles.brand}>DorManagePro</h1>
      </div>
      <ul
        style={{
          ...styles.links,
          ...(isOpen ? styles.menuVisible : {}),
        }}
      >
        <li>
          <a
            href="/"
            style={styles.link}
            onMouseEnter={(e) => (e.target.style.color = styles.link.color)}
            onMouseLeave={(e) => (e.target.style.color = styles.link.color)}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/about"
            style={styles.link}
            onMouseEnter={(e) => (e.target.style.color = styles.link.color)}
            onMouseLeave={(e) => (e.target.style.color = styles.link.color)}
          >
            Apply for transfer
          </a>
        </li>
        <li>
          <a
            href="/facility_reservation"
            style={styles.link}
            onMouseEnter={(e) => (e.target.style.color = styles.link.color)}
            onMouseLeave={(e) => (e.target.style.color = styles.link.color)}
          >
            View facility reservation
          </a>
        </li>

        <li>
          <a
            href="/discussion_board"
            style={styles.link}
            onMouseEnter={(e) => (e.target.style.color = styles.link.color)}
            onMouseLeave={(e) => (e.target.style.color = styles.link.color)}
          >
            Join discussion board
          </a>
        </li>

        <li>
          <a
            href="/user_information"
            style={styles.link}
            onMouseEnter={(e) => (e.target.style.color = styles.link.color)}
            onMouseLeave={(e) => (e.target.style.color = styles.link.color)}
          >
            {!loading && user ? user.studentId : "student id"}
          </a>
        </li>

        <li>
          <a
            href="#"
            style={styles.link}
            onMouseEnter={(e) => (e.target.style.color = styles.link.color)}
            onMouseLeave={(e) => (e.target.style.color = styles.link.color)}
            onClick={handleLogout}
          >
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;