const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const jsonHeaders = {
  "Content-Type": "application/json"
};

const buildQuery = (params) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      query.append(key, value);
    }
  });
  const queryString = query.toString();
  return queryString ? `?${queryString}` : "";
};

const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...jsonHeaders,
      ...(options.headers || {})
    }
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const message = data?.detail || "Request failed.";
    throw new Error(message);
  }

  return data;
};

export const listEmployees = () => request("/employees");

export const createEmployee = (payload) =>
  request("/employees", {
    method: "POST",
    body: JSON.stringify(payload)
  });

export const deleteEmployee = (employeeId) =>
  request(`/employees/${employeeId}`, {
    method: "DELETE"
  });

export const createAttendance = (employeeId, payload) =>
  request(`/employees/${employeeId}/attendance`, {
    method: "POST",
    body: JSON.stringify(payload)
  });

export const listAttendance = ({ employeeId, date }) => {
  const query = buildQuery({ employee_id: employeeId, date });
  return request(`/attendance${query}`);
};

export const getSummary = (date) => {
  const query = buildQuery({ date });
  return request(`/summary${query}`);
};
