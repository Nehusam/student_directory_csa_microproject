import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import DeleteModal from './components/DeleteModal';
import { getStudents, getStats, createStudent, updateStudent, deleteStudent } from './api/students';

const styles = {
  page: { minHeight: '100vh', background: '#f1f5f9' },
  main: { maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' },
  sectionTitle: {
    fontSize: '18px', fontWeight: '700', color: '#1e293b',
    marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px'
  },
  toast: {
    position: 'fixed', bottom: '24px', right: '24px',
    padding: '14px 20px', borderRadius: '10px', color: '#fff',
    fontSize: '14px', fontWeight: '500', zIndex: 9999,
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '8px',
    animation: 'slideIn 0.3s ease'
  }
};

function Toast({ message, type }) {
  if (!message) return null;
  const bg = type === 'error' ? '#ef4444' : '#10b981';
  return <div style={{ ...styles.toast, background: bg }}>{type === 'error' ? '❌' : '✅'} {message}</div>;
}

export default function App() {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 3000);
  };

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      const [studentsRes, statsRes] = await Promise.all([getStudents(), getStats()]);
      setStudents(studentsRes.data);
      setStats(statsRes.data);
    } catch (err) {
      showToast('Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleSave = async (data) => {
    try {
      if (editStudent) {
        await updateStudent(editStudent.id, data);
        showToast(`${data.name} updated successfully!`);
      } else {
        await createStudent(data);
        showToast(`${data.name} added successfully!`);
      }
      setShowForm(false);
      setEditStudent(null);
      fetchAll();
    } catch (err) {
      showToast(err.response?.data?.error || 'Something went wrong', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteStudent(deleteTarget.id);
      showToast(`${deleteTarget.name} deleted successfully!`);
      setDeleteTarget(null);
      fetchAll();
    } catch (err) {
      showToast('Failed to delete student', 'error');
    }
  };

  return (
    <div style={styles.page}>
      <Navbar total={stats?.total || 0} />
      <main style={styles.main}>
        <div style={styles.sectionTitle}>📊 Overview</div>
        <Dashboard stats={stats} />

        <div style={styles.sectionTitle}>🎓 Student Records</div>
        <StudentList
          students={students}
          loading={loading}
          onAdd={() => { setEditStudent(null); setShowForm(true); }}
          onEdit={(s) => { setEditStudent(s); setShowForm(true); }}
          onDelete={(s) => setDeleteTarget(s)}
        />
      </main>

      {showForm && (
        <StudentForm
          student={editStudent}
          onClose={() => { setShowForm(false); setEditStudent(null); }}
          onSave={handleSave}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          student={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}

      <Toast message={toast.message} type={toast.type} />
    </div>
  );
}

