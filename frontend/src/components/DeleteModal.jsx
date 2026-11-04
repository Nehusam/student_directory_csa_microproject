import React from 'react';

const styles = {
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px'
  },
  modal: {
    background: '#fff', borderRadius: '12px', padding: '32px',
    width: '100%', maxWidth: '400px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', textAlign: 'center'
  },
  icon: { fontSize: '48px', marginBottom: '16px' },
  title: { fontSize: '20px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' },
  subtitle: { fontSize: '14px', color: '#64748b', marginBottom: '28px' },
  name: { fontWeight: '600', color: '#ef4444' },
  actions: { display: 'flex', gap: '12px', justifyContent: 'center' },
  cancelBtn: {
    padding: '10px 24px', border: '1.5px solid #e2e8f0', borderRadius: '8px',
    background: '#fff', color: '#64748b', fontSize: '14px', fontWeight: '500', cursor: 'pointer'
  },
  deleteBtn: {
    padding: '10px 24px', border: 'none', borderRadius: '8px',
    background: '#ef4444', color: '#fff', fontSize: '14px', fontWeight: '600', cursor: 'pointer'
  }
};

export default function DeleteModal({ student, onClose, onConfirm }) {
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={styles.modal}>
        <div style={styles.icon}>🗑️</div>
        <h2 style={styles.title}>Delete Student</h2>
        <p style={styles.subtitle}>
          Are you sure you want to delete{' '}
          <span style={styles.name}>{student?.name}</span>?
          <br />This action cannot be undone.
        </p>
        <div style={styles.actions}>
          <button style={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button style={styles.deleteBtn} onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

