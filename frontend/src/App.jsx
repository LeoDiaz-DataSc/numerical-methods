import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import GaussSeidelView from './pages/GaussSeidelView';
import { Calculator, LayoutDashboard, GitMerge } from 'lucide-react';
import './index.css';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/gauss-seidel', label: 'Gauss-Seidel', icon: <Calculator size={20} /> },
    { path: '/matrices', label: 'Operaciones Matriciales', icon: <LayoutDashboard size={20} /> },
    { path: '/interpolacion', label: 'Interpolación', icon: <GitMerge size={20} /> },
  ];

  return (
    <div style={{ width: '280px', background: 'var(--color-bg-sidebar)', borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '2rem', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.5rem' }}>
          Numerical Methods
        </div>
        <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
          Interactive Scientific Computing
        </div>
      </div>
      
      <nav style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', paddingLeft: '1rem' }}>
          Métodos Disponibles
        </div>
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                color: isActive ? 'white' : 'var(--color-text-secondary)',
                background: isActive ? 'var(--color-primary)' : 'transparent',
                textDecoration: 'none',
                fontWeight: isActive ? '600' : '400',
                transition: 'all 0.2s ease'
              }}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <div style={{ marginTop: 'auto', padding: '2rem', borderTop: '1px solid var(--color-border)', fontSize: '0.8rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
        Desarrollado para Portafolio Enterprise
      </div>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout" style={{ flexDirection: 'row' }}>
        <Sidebar />
        <main className="app-main">
          <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 className="page-title">Laboratorio de Análisis Numérico</h1>
              <p className="page-subtitle" style={{ margin: 0 }}>Resolución en tiempo real en el navegador (SPA)</p>
            </div>
          </header>
          
          <Routes>
            <Route path="/gauss-seidel" element={<GaussSeidelView />} />
            
            {/* Placeholder routes for future expansion */}
            <Route path="/matrices" element={<div className="card"><h2 className="card-title">Operaciones Matriciales</h2><p className="text-muted">Módulo en construcción (Próximamente)</p></div>} />
            <Route path="/interpolacion" element={<div className="card"><h2 className="card-title">Interpolación Polinomial</h2><p className="text-muted">Módulo en construcción (Próximamente)</p></div>} />
            
            <Route path="*" element={<Navigate to="/gauss-seidel" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
