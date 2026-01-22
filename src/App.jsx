import React, { useCallback, useEffect, useState } from "react";
import {
  createAttendance,
  createEmployee,
  deleteEmployee,
  getSummary,
  listAttendance,
  listEmployees
} from "./api.js";
import AttendancePanel from "./components/AttendancePanel.jsx";
import EmployeeForm from "./components/EmployeeForm.jsx";
import EmployeeTable from "./components/EmployeeTable.jsx";
import Header from "./components/Header.jsx";
import SummaryCards from "./components/SummaryCards.jsx";

const todayString = () => new Date().toISOString().slice(0, 10);

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [employeesLoading, setEmployeesLoading] = useState(true);
  const [employeesError, setEmployeesError] = useState("");
  const [employeeFeedback, setEmployeeFeedback] = useState(null);
  const [employeeSubmitting, setEmployeeSubmitting] = useState(false);

  const [summary, setSummary] = useState(null);
  const [summaryDate, setSummaryDate] = useState(todayString());
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [summaryError, setSummaryError] = useState("");

  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const [attendanceError, setAttendanceError] = useState("");
  const [attendanceFilterDate, setAttendanceFilterDate] = useState("");
  const [attendanceFeedback, setAttendanceFeedback] = useState(null);
  const [attendanceSubmitting, setAttendanceSubmitting] = useState(false);

  const loadEmployees = useCallback(async () => {
    setEmployeesLoading(true);
    setEmployeesError("");
    try {
      const data = await listEmployees();
      setEmployees(data);
      setSelectedEmployeeId((prev) => {
        if (data.length === 0) {
          return "";
        }
        const stillExists = data.some((employee) => employee.employee_id === prev);
        return stillExists ? prev : data[0].employee_id;
      });
    } catch (error) {
      setEmployeesError(error.message);
    } finally {
      setEmployeesLoading(false);
    }
  }, []);

  const loadSummary = useCallback(async (dateValue) => {
    setSummaryLoading(true);
    setSummaryError("");
    try {
      const data = await getSummary(dateValue);
      setSummary(data);
    } catch (error) {
      setSummaryError(error.message);
    } finally {
      setSummaryLoading(false);
    }
  }, []);

  const loadAttendance = useCallback(async (employeeId, dateValue) => {
    if (!employeeId) {
      setAttendanceRecords([]);
      setAttendanceError("");
      setAttendanceLoading(false);
      return;
    }
    setAttendanceLoading(true);
    setAttendanceError("");
    try {
      const data = await listAttendance({
        employeeId,
        date: dateValue
      });
      setAttendanceRecords(data);
    } catch (error) {
      setAttendanceError(error.message);
    } finally {
      setAttendanceLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  useEffect(() => {
    loadSummary(summaryDate);
  }, [loadSummary, summaryDate]);

  useEffect(() => {
    loadAttendance(selectedEmployeeId, attendanceFilterDate);
  }, [selectedEmployeeId, attendanceFilterDate, loadAttendance]);

  const handleCreateEmployee = async (payload) => {
    setEmployeeSubmitting(true);
    setEmployeeFeedback(null);
    try {
      await createEmployee(payload);
      setEmployeeFeedback({
        type: "success",
        message: "Employee added successfully."
      });
      await loadEmployees();
      await loadSummary(summaryDate);
      return true;
    } catch (error) {
      setEmployeeFeedback({ type: "error", message: error.message });
      return false;
    } finally {
      setEmployeeSubmitting(false);
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    setEmployeeFeedback(null);
    try {
      await deleteEmployee(employeeId);
      setEmployeeFeedback({
        type: "success",
        message: "Employee removed."
      });
      await loadEmployees();
      await loadSummary(summaryDate);
      if (employeeId === selectedEmployeeId) {
        setAttendanceRecords([]);
      }
    } catch (error) {
      setEmployeeFeedback({ type: "error", message: error.message });
    }
  };

  const handleMarkAttendance = async ({ employee_id, date, status }) => {
    setAttendanceSubmitting(true);
    setAttendanceFeedback(null);
    try {
      await createAttendance(employee_id, { date, status });
      setAttendanceFeedback({
        type: "success",
        message: "Attendance recorded."
      });
      await loadEmployees();
      await loadSummary(summaryDate);
      if (employee_id === selectedEmployeeId) {
        await loadAttendance(employee_id, attendanceFilterDate);
      }
      return true;
    } catch (error) {
      setAttendanceFeedback({ type: "error", message: error.message });
      return false;
    } finally {
      setAttendanceSubmitting(false);
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="layout">
        <SummaryCards
          summary={summary}
          loading={summaryLoading}
          error={summaryError}
          date={summaryDate}
          onDateChange={setSummaryDate}
        />
        <EmployeeForm
          onCreate={handleCreateEmployee}
          submitting={employeeSubmitting}
          feedback={employeeFeedback}
        />
        <EmployeeTable
          employees={employees}
          loading={employeesLoading}
          error={employeesError}
          onDelete={handleDeleteEmployee}
          selectedEmployeeId={selectedEmployeeId}
          onSelect={setSelectedEmployeeId}
        />
        <AttendancePanel
          employees={employees}
          selectedEmployeeId={selectedEmployeeId}
          attendanceRecords={attendanceRecords}
          loading={attendanceLoading}
          error={attendanceError}
          onSelect={setSelectedEmployeeId}
          onMark={handleMarkAttendance}
          filterDate={attendanceFilterDate}
          onFilter={setAttendanceFilterDate}
          marking={attendanceSubmitting}
          feedback={attendanceFeedback}
        />
      </main>
    </div>
  );
};

export default App;
