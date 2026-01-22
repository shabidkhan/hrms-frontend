import React from "react";

const Header = () => {
  return (
    <header className="hero">
      <div>
        <p className="eyebrow">HRMS Lite</p>
        <h1>Human Resource Management System</h1>
        <p className="subtitle">
          Manage employees, track daily attendance, and keep a steady view of
          workforce activity.
        </p>
      </div>
      <div className="hero-panel">
        <div>
          <p className="panel-title">Admin Workspace</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
