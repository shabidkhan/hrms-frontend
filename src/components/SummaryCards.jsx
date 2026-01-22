import React from "react";

const SummaryCards = ({ summary, loading, error, date, onDateChange }) => {
  return (
    <section className="card" aria-live="polite">
      <div className="section-header">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h2>Daily snapshot</h2>
        </div>
        <div className="field">
          <label htmlFor="summary-date">Date</label>
          <input
            id="summary-date"
            type="date"
            value={date}
            onChange={(event) => onDateChange(event.target.value)}
          />
        </div>
      </div>

      {loading ? <p className="muted">Loading summary...</p> : null}
      {error ? <p className="error">{error}</p> : null}
      {console.log(summary, "summary")}
      
      {!loading && !error && summary ? (
        <div className="summary-grid">
          <div className="summary-card">
            <p>Total employees</p>
            <h3>{summary.total_employees}</h3>
          </div>
          <div className="summary-card">
            <p>Attendance marked</p>
            <h3>{summary.attendance_marked}</h3>
          </div>
          <div className="summary-card">
            <p>Present</p>
            <h3>{summary.present}</h3>
          </div>
          <div className="summary-card">
            <p>Absent</p>
            <h3>{summary.absent}</h3>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default SummaryCards;
