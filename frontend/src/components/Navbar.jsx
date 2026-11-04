import React from 'react';

const styles = {
  nav: {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    padding: '0 32px', display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', height: '64px',
    boxShadow: '0 4px 20px rgba(99,102,241,0.3)'
  },
  left: { display: 'flex', alignItems: 'center', gap: '12px' },
  logo: { fontSize: '24px' },
  title: { fontSize: '20px', fontWeight: '700', color: '#fff' },
  subtitle: { fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '1px' },
  badge: {
    background: 'rgba(255,255,255,0.2)', color: '#fff',
    padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600'
  }
};

export default function Navbar({ total }) {
  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <span style={styles.logo}>🎓</span>
        <div>
          <div style={styles.title}>Student Directory</div>
          <div style={styles.subtitle}>Manage student records</div>
        </div>
      </div>
      <span style={styles.badge}>{total} Students</span>
    </nav>
  );
}

