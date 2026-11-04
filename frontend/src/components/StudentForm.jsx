import React from 'react';

const DEPARTMENTS = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Engineering'];
const YEARS = [1, 2, 3, 4];

const styles = {
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px'
  },
  modal: {
    background: '#fff', borderRadius: '12px', padding: '32px',
    width: '100%', maxWidth: '480px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
  },
  title: { fontSize: '20px', fontWeight: '700', color: '#1e293b', marginBottom: '24px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  fullWidth: { gridColumn: '1 / -1' },
  label: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' },
  input: {
    width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0',
    borderRadius: '8px', fontSize: '14px', color: '#1e293b', outline: 'none',
    transition: 'border-color 0.2s', background: '#f8fafc'
  },
  errorText: { color: '#ef4444', fontSize: '12px', marginTop: '4px' },
  actions: { display: 'flex', gap: '12px', marginTop: '28px', justifyContent: 'flex-end' },
  cancelBtn: {
    padding: '10px 20px', border: '1.5px solid #e2e8f0', borderRadius: '8px',
    background: '#fff', color: '#64748b', fontSize: '14px', fontWeight: '500',
    cursor: 'pointer'
  },
  submitBtn: {
    padding: '10px 24px', border: 'none', borderRadius: '8px',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff',
    fontSize: '14px', fontWeight: '600', cursor: 'pointer'
  }
};

export default function StudentForm({ student, onClose, onSave }) {
  const [form, setForm] = React.useState({
    name: student?.name || '',
    email: student?.email || '',
    phone: student?.phone || '',
    department: student?.department || '',
    year: student?.year || '',
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email format';
    if (form.year && (form.year < 1 || form.year > 4)) e.year = 'Year must be 1–4';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await onSave({ ...form, year: form.year ? parseInt(form.year) : null });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={styles.modal}>
        <h2 style={styles.title}>{student ? '✏️ Edit Student' : '➕ Add New Student'}</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.grid}>
            <div style={styles.fullWidth}>
              <label style={styles.label}>Full Name *</label>
              <input
                style={{ ...styles.input, borderColor: errors.name ? '#ef4444' : '#e2e8f0' }}
                name="name" value={form.name} onChange={handleChange} placeholder="e.g. Alice Johnson"
              />
              {errors.name && <p style={styles.errorText}>{errors.name}</p>}
            </div>
            <div style={styles.fullWidth}>
              <label style={styles.label}>Email *</label>
              <input
                style={{ ...styles.input, borderColor: errors.email ? '#ef4444' : '#e2e8f0' }}
                name="email" type="email" value={form.email} onChange={handleChange} placeholder="alice@example.com"
              />
              {errors.email && <p style={styles.errorText}>{errors.email}</p>}
            </div>
            <div>
              <label style={styles.label}>Phone</label>
              <input style={styles.input} name="phone" value={form.phone} onChange={handleChange} placeholder="555-0101" />
            </div>
            <div>
              <label style={styles.label}>Year</label>
              <select style={styles.input} name="year" value={form.year} onChange={handleChange}>
                <option value="">Select year</option>
                {YEARS.map(y => <option key={y} value={y}>Year {y}</option>)}
              </select>
              {errors.year && <p style={styles.errorText}>{errors.year}</p>}
            </div>
            <div style={styles.fullWidth}>
              <label style={styles.label}>Department</label>
              <select style={styles.input} name="department" value={form.department} onChange={handleChange}>
                <option value="">Select department</option>
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div style={styles.actions}>
            <button type="button" style={styles.cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? 'Saving...' : student ? 'Update Student' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

