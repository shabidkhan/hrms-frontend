import React from "react";

const EmployeeTable = ({
  employees,
  loading,
  error,
  onDelete,
  selectedEmployeeId,
  onSelect
}) => {
  return (
    <section className="card" aria-live="polite">
      <div className="section-header">
        <div>
          <p className="eyebrow">Directory</p>
          <h2>Employee roster</h2>
        </div>
      </div>

      {loading ? <p className="muted">Loading employees...</p> : null}
      {error ? <p className="error">{error}</p> : null}

      {!loading && !error && employees.length === 0 ? (
        <div className="empty-state">
          <p>No employees yet. Add the first team member to begin.</p>
        </div>
      ) : null}

      {!loading && !error && employees.length > 0 ? (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Employee ID</th>
                <th>Email</th>
                <th>Department</th>
                <th>Present days</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr
                  key={employee.employee_id}
                  style={{ "--i": index }}
                  className="row-animate"
                >
                  <td>{employee.full_name}</td>
                  <td>{employee.employee_id}</td>
                  <td>{employee.email}</td>
                  <td>{employee.department}</td>
                  <td>{employee.present_days}</td>
                  <td className="row-actions">
                    <button
                      className={
                        selectedEmployeeId === employee.employee_id
                          ? "ghost active"
                          : "ghost"
                      }
                      onClick={() => onSelect(employee.employee_id)}
                    >
                      {selectedEmployeeId === employee.employee_id
                        ? "Selected"
                        : "View attendance"}
                    </button>
                    <button
                      className="danger"
                      onClick={() => onDelete(employee.employee_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
};

export default EmployeeTable;
