import React from 'react';

const card = (bg, icon, label, value, sub) => ({
  bg, icon, label, value, sub
});

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '28px'
  },
  card: {
    background: '#fff', borderRadius: '12px', padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex',
    alignItems: 'center', gap: '16px'
  },
  iconBox: {
    width: '52px', height: '52px', borderRadius: '12px',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0
  },
  label: { fontSize: '13px', color: '#64748b', fontWeight: '500' },
  value: { fontSize: '28px', fontWeight: '700', color: '#1e293b', lineHeight: 1 },
  sub: { fontSize: '12px', color: '#94a3b8', marginTop: '2px' },
  deptGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '12px',
    marginBottom: '28px'
  },
  deptCard: {
    background: '#fff', borderRadius: '10px', padding: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
  },
  deptName: { fontSize: '13px', color: '#64748b', fontWeight: '500', marginBottom: '6px' },
  deptCount: { fontSize: '22px', fontWeight: '700', color: '#6366f1' },
  bar: { height: '4px', background: '#e2e8f0', borderRadius: '4px', marginTop: '8px' },
  barFill: { height: '100%', borderRadius: '4px', background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }
};

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

export default function Dashboard({ stats }) {
  if (!stats) return null;

  const yearLabels = { 1: 'Freshman', 2: 'Sophomore', 3: 'Junior', 4: 'Senior' };
  const maxDept = Math.max(...(stats.byDepartment?.map(d => parseInt(d.count)) || [1]));

  return (
    <div>
      {/* Stat Cards */}
      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={{ ...styles.iconBox, background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)' }}>🎓</div>
          <div>
            <div style={styles.label}>Total Students</div>
            <div style={styles.value}>{stats.total}</div>
            <div style={styles.sub}>Registered students</div>
          </div>
        </div>
        <div style={styles.card}>
          <div style={{ ...styles.iconBox, background: 'linear-gradient(135deg, #fce7f3, #fbcfe8)' }}>🏫</div>
          <div>
            <div style={styles.label}>Departments</div>
            <div style={styles.value}>{stats.byDepartment?.length || 0}</div>
            <div style={styles.sub}>Active departments</div>
          </div>
        </div>
        {stats.byYear?.map(y => (
          <div style={styles.card} key={y.year}>
            <div style={{ ...styles.iconBox, background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)' }}>
              {y.year === 1 ? '1️⃣' : y.year === 2 ? '2️⃣' : y.year === 3 ? '3️⃣' : '4️⃣'}
            </div>
            <div>
              <div style={styles.label}>{yearLabels[y.year] || `Year ${y.year}`}</div>
              <div style={styles.value}>{y.count}</div>
              <div style={styles.sub}>students</div>
            </div>
          </div>
        ))}
      </div>

      {/* Department Breakdown */}
      {stats.byDepartment?.length > 0 && (
        <>
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>
            📊 By Department
          </h3>
          <div style={styles.deptGrid}>
            {stats.byDepartment.map((d, i) => (
              <div style={styles.deptCard} key={d.department}>
                <div style={styles.deptName}>{d.department || 'Unassigned'}</div>
                <div style={{ ...styles.deptCount, color: COLORS[i % COLORS.length] }}>{d.count}</div>
                <div style={styles.bar}>
                  <div style={{ ...styles.barFill, width: `${(d.count / maxDept) * 100}%`, background: COLORS[i % COLORS.length] }} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

