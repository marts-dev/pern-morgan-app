import React from "react";
import { Link } from "react-router-dom";

export default function AppHeader() {
  return (
    <div style={headerStyle}>
      <h1>Covid Situation Tracker</h1>
      <Link style={linkStyle} to="/">
        Home
      </Link>{" "}
      |{" "}
      <Link style={linkStyle} to="/about">
        About
      </Link>
    </div>
  );
}

const headerStyle = {
  textAlign: "center",
  fontSize: "3rem",
  backgroundColor: "#24337a",
  color: "#f5f5f5",
  padding: "1rem 0rem",
};

const linkStyle = {
  color: "#f5f5f5",
  textDecoration: "none",
};
