import React from "react";

export default function About() {
  return (
    <div style={aboutStyle}>
      <h1>Author: Martin Arrogante</h1>
      <h2>DW Morgan Technical Exam</h2>
    </div>
  );
}

const aboutStyle = {
  textAlign: "center",
  fontSize: "1.5rem",
  color: "#1c1c1c",
  padding: "1rem 0rem",
};
