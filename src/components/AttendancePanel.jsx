import React, { useState } from "react";

const AttendancePanel = ({
  employees,
  selectedEmployeeId,
  attendanceRecords,
  loading,
  error,
  onSelect,
  onMark,
  filterDate,
  onFilter,
  marking,
  feedback
}) => {
  const [form, setForm] = useState({ date: "", status: "Present" });

  const handleFormChange = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedEmployeeId) {
      return;
    }
    const ok = await onMark({
      employee_id: selectedEmployeeId,
      date: form.date,
      status: form.status
    });
    if (ok) {
      setForm((prev) => ({ ...prev, date: "", status: "Present" }));
    }
  };

  return (
    <section className="card" aria-live="polite">
      <div className="section-header">
        <div>
          <p className="eyebrow">Attendance</p>
          <h2>Daily tracking</h2>
        </div>
      </div>

      <div className="attendance-grid">
        <form className="form-stack" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="attendance-employee">Employee</label>
            <select
              id="attendance-employee"
              value={selectedEmployeeId}
              onChange={(event) => onSelect(event.target.value)}
              required
            >
              <option value="">Select employee</option>
              {employees.map((employee) => (
                <option key={employee.employee_id} value={employee.employee_id}>
                  {employee.full_name} ({employee.employee_id})
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="attendance-date">Date</label>
            <input
              id="attendance-date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="attendance-status">Status</label>
            <select
              id="attendance-status"
              name="status"
              value={form.status}
              onChange={handleFormChange}
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
          <button
            className="primary"
            type="submit"
            disabled={marking || !selectedEmployeeId}
          >
            {marking ? "Saving..." : "Mark attendance"}
          </button>
          {feedback ? (
            <p className={feedback.type === "error" ? "error" : "success"}>
              {feedback.message}
            </p>
          ) : null}
        </form>

        <div className="attendance-list">
          <div className="section-header">
            <div>
              <p className="eyebrow">Records</p>
              <h3>
                {selectedEmployeeId
                  ? `Attendance for ${selectedEmployeeId}`
                  : "Select an employee"}
              </h3>
            </div>
            <div className="field">
              <label htmlFor="filter-date">Filter date</label>
              <input
                id="filter-date"
                type="date"
                value={filterDate}
                onChange={(event) => onFilter(event.target.value)}
              />
            </div>
          </div>

          {employees.length === 0 ? (
            <div className="empty-state">
              <p>Add employees to begin tracking attendance.</p>
            </div>
          ) : null}

          {selectedEmployeeId ? (
            <div className="filter-select">
              <label htmlFor="employee-filter">Viewing</label>
              <select
                id="employee-filter"
                value={selectedEmployeeId}
                onChange={(event) => onSelect(event.target.value)}
              >
                {employees.map((employee) => (
                  <option key={employee.employee_id} value={employee.employee_id}>
                    {employee.full_name}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          {loading ? <p className="muted">Loading attendance...</p> : null}
          {error ? <p className="error">{error}</p> : null}

          {!loading &&
          !error &&
          selectedEmployeeId &&
          attendanceRecords.length === 0 ? (
            <div className="empty-state">
              <p>No attendance records yet.</p>
            </div>
          ) : null}

          {!loading && !error && attendanceRecords.length > 0 ? (
            <ul className="attendance-items">
              {attendanceRecords.map((record, index) => (
                <li
                  key={`${record.employee_id}-${record.date}`}
                  style={{ "--i": index }}
                  className="row-animate"
                >
                  <div>
                    <p className="strong">{record.date}</p>
                    <p className="muted">{record.employee_id}</p>
                  </div>
                  <span
                    className={
                      record.status === "Present" ? "tag present" : "tag absent"
                    }
                  >
                    {record.status}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default AttendancePanel;
