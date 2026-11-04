import React from 'react';

const DEPARTMENTS = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Engineering'];
const DEPT_COLORS = {
  'Computer Science': '#6366f1', 'Mathematics': '#8b5cf6', 'Physics': '#ec4899',
  'Chemistry': '#f59e0b', 'Biology': '#10b981', 'Engineering': '#3b82f6'
};

const styles = {
  container: { background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', overflow: 'hidden' },
  header: {
    padding: '20px 24px', borderBottom: '1px solid #f1f5f9',
    display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap'
  },
  searchWrap: { position: 'relative', flex: 1, minWidth: '200px' },
  searchIcon: { position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '16px' },
  searchInput: {
    width: '100%', padding: '10px 14px 10px 36px',
    border: '1.5px solid #e2e8f0', borderRadius: '8px',
    fontSize: '14px', color: '#1e293b', outline: 'none', background: '#f8fafc'
  },
  select: {
    padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px',
    fontSize: '14px', color: '#1e293b', outline: 'none', background: '#f8fafc', cursor: 'pointer'
  },
  addBtn: {
    padding: '10px 20px', border: 'none', borderRadius: '8px',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff',
    fontSize: '14px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap'
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: {
    padding: '12px 20px', textAlign: 'left', fontSize: '12px',
    fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase',
    letterSpacing: '0.5px', background: '#f8fafc', borderBottom: '1px solid #f1f5f9'
  },
  td: { padding: '14px 20px', fontSize: '14px', color: '#334155', borderBottom: '1px solid #f8fafc' },
  avatar: {
    width: '36px', height: '36px', borderRadius: '50%',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontWeight: '700', fontSize: '14px', flexShrink: 0
  },
  nameCell: { display: 'flex', alignItems: 'center', gap: '12px' },
  name: { fontWeight: '600', color: '#1e293b' },
  email: { fontSize: '12px', color: '#94a3b8' },
  badge: {
    display: 'inline-block', padding: '3px 10px', borderRadius: '20px',
    fontSize: '12px', fontWeight: '600'
  },
  yearBadge: {
    display: 'inline-block', padding: '3px 10px', borderRadius: '20px',
    fontSize: '12px', fontWeight: '600', background: '#f1f5f9', color: '#475569'
  },
  editBtn: {
    padding: '6px 14px', border: '1.5px solid #e2e8f0', borderRadius: '6px',
    background: '#fff', color: '#6366f1', fontSize: '13px', fontWeight: '500',
    cursor: 'pointer', marginRight: '8px'
  },
  delBtn: {
    padding: '6px 14px', border: '1.5px solid #fecaca', borderRadius: '6px',
    background: '#fff', color: '#ef4444', fontSize: '13px', fontWeight: '500', cursor: 'pointer'
  },
  empty: { textAlign: 'center', padding: '60px 20px', color: '#94a3b8' },
  emptyIcon: { fontSize: '48px', marginBottom: '12px' },
  emptyText: { fontSize: '16px', fontWeight: '600', color: '#64748b', marginBottom: '4px' },
  footer: { padding: '14px 24px', borderTop: '1px solid #f1f5f9', fontSize: '13px', color: '#94a3b8' }
};

const YEAR_LABELS = { 1: 'Year 1', 2: 'Year 2', 3: 'Year 3', 4: 'Year 4' };

export default function StudentList({ students, onAdd, onEdit, onDelete, loading }) {
  const [search, setSearch] = React.useState('');
  const [filterDept, setFilterDept] = React.useState('');
  const [filterYear, setFilterYear] = React.useState('');

  const filtered = students.filter(s => {
    const matchSearch = !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchDept = !filterDept || s.department === filterDept;
    const matchYear = !filterYear || String(s.year) === filterYear;
    return matchSearch && matchDept && matchYear;
  });

  const getInitials = (name) => name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const getDeptColor = (dept) => DEPT_COLORS[dept] || '#6366f1';

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.searchWrap}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            style={styles.searchInput}
            placeholder="Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select style={styles.select} value={filterDept} onChange={e => setFilterDept(e.target.value)}>
          <option value="">All Departments</option>
          {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select style={styles.select} value={filterYear} onChange={e => setFilterYear(e.target.value)}>
          <option value="">All Years</option>
          {[1, 2, 3, 4].map(y => <option key={y} value={y}>Year {y}</option>)}
        </select>
        <button style={styles.addBtn} onClick={onAdd}>+ Add Student</button>
      </div>

      {loading ? (
        <div style={styles.empty}><div style={styles.emptyIcon}>⏳</div><div style={styles.emptyText}>Loading...</div></div>
      ) : filtered.length === 0 ? (
        <div style={styles.empty}>
          <div style={styles.emptyIcon}>🎓</div>
          <div style={styles.emptyText}>No students found</div>
          <div>Try adjusting your search or filters</div>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Student</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Department</th>
                <th style={styles.th}>Year</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={s.id} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                  <td style={styles.td}>
                    <div style={styles.nameCell}>
                      <div style={{ ...styles.avatar, background: `linear-gradient(135deg, ${getDeptColor(s.department)}, ${getDeptColor(s.department)}aa)` }}>
                        {getInitials(s.name)}
                      </div>
                      <div>
                        <div style={styles.name}>{s.name}</div>
                        <div style={styles.email}>{s.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={styles.td}>{s.phone || '—'}</td>
                  <td style={styles.td}>
                    {s.department ? (
                      <span style={{ ...styles.badge, background: `${getDeptColor(s.department)}18`, color: getDeptColor(s.department) }}>
                        {s.department}
                      </span>
                    ) : '—'}
                  </td>
                  <td style={styles.td}>
                    {s.year ? <span style={styles.yearBadge}>{YEAR_LABELS[s.year]}</span> : '—'}
                  </td>
                  <td style={styles.td}>
                    <button style={styles.editBtn} onClick={() => onEdit(s)}>✏️ Edit</button>
                    <button style={styles.delBtn} onClick={() => onDelete(s)}>🗑️ Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={styles.footer}>
        Showing {filtered.length} of {students.length} students
      </div>
    </div>
  );
}

