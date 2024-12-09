import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, admin, loading } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async() => {
    const iflogout = await logout();
    if(iflogout){
      navigate('/adminLogin')
    }else{
      console.error("failed to logout")
    }
  }

  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2rem",
      backgroundColor: "#333",
      color: "white",
    },
    brand: {
      fontSize: "1.5rem",
      margin: 0,
    },
    menuToggle: {
      background: "none",
      border: "none",
      color: "white",
      fontSize: "1.5rem",
      cursor: "pointer",
      display: "none",
    },
    links: {
      display: "flex",
      listStyle: "none",
      gap: "1.5rem",
    },
    link: {
      textDecoration: "none",
      color: "white",
      fontWeight: "bold",
      transition: "color 0.3s",
    },
    linkHover: {
      color: "#f39c12",
    },
    responsiveLinks: {
      display: "none",
      flexDirection: "column",
      position: "absolute",
      top: "60px",
      right: "0",
      backgroundColor: "#333",
      width: "100%",
      textAlign: "center",
      padding: "1rem 0",
    },
    menuVisible: {
      display: "flex",
    },
    responsiveToggle: {
      display: "block",
    },
  };

  return (
    <nav style={styles.navbar}>
      <div>
        <h1 style={styles.brand}>DorManagePro</h1>
        <button
          style={{
            ...styles.menuToggle,
            ...(window.innerWidth <= 768 ? styles.responsiveToggle : {}),
          }}
          onClick={toggleMenu}
        >
          ☰
        </button>
      </div>
      <ul
        style={{
          ...styles.links,
          ...(window.innerWidth <= 768 && isOpen
            ? { ...styles.responsiveLinks, ...styles.menuVisible }
            : window.innerWidth <= 768
            ? styles.responsiveLinks
            : {}),
        }}
      >
        <li>
          <a
            href="/admin"
            style={styles.link}
            onMouseEnter={(e) => (e.target.style.color = styles.linkHover.color)}
            onMouseLeave={(e) => (e.target.style.color = styles.link.color)}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/admin_information"
            style={styles.link}
            onMouseEnter={(e) => (e.target.style.color = styles.linkHover.color)}
            onMouseLeave={(e) => (e.target.style.color = styles.link.color)}
          >
            {!loading && admin ? admin.email : "admin"}
          </a>
        </li>

        {/* <li>
          <a
            href="/contact"
            style={styles.link}
            onMouseEnter={(e) => (e.target.style.color = styles.linkHover.color)}
            onMouseLeave={(e) => (e.target.style.color = styles.link.color)}
          >
            Contact
            </a>
        </li> */}
        <li>
          <a
            href="#"
            style={styles.link}
            onMouseEnter={(e) => (e.target.style.color = styles.linkHover.color)}
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