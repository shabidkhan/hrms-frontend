import React, { useState } from "react";

const initialState = {
  employee_id: "",
  full_name: "",
  email: "",
  department: ""
};

const EmployeeForm = ({ onCreate, submitting, feedback }) => {
  const [form, setForm] = useState(initialState);

  const handleChange = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ok = await onCreate(form);
    if (ok) {
      setForm(initialState);
    }
  };

  return (
    <section className="card">
      <div className="section-header">
        <div>
          <p className="eyebrow">Employees</p>
          <h2>Add employee</h2>
        </div>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="employee_id">Employee ID</label>
          <input
            id="employee_id"
            name="employee_id"
            value={form.employee_id}
            onChange={handleChange}
            placeholder="EMP-001"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="full_name">Full name</label>
          <input
            id="full_name"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            placeholder="Jordan Lane"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="jordan@company.com"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="department">Department</label>
          <input
            id="department"
            name="department"
            value={form.department}
            onChange={handleChange}
            placeholder="Operations"
            required
          />
        </div>
        <button type="submit" className="primary" disabled={submitting}>
          {submitting ? "Saving..." : "Add employee"}
        </button>
      </form>

      {feedback ? (
        <p className={feedback.type === "error" ? "error" : "success"}>
          {feedback.message}
        </p>
      ) : null}
    </section>
  );
};

export default EmployeeForm;
