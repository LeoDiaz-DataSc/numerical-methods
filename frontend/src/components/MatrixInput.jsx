import React from 'react';

export default function MatrixInput({ size, matrixA, setMatrixA, vectorB, setVectorB, readOnly = false }) {
    
    const handleMatrixChange = (i, j, value) => {
        if (readOnly) return;
        const newA = [...matrixA];
        newA[i][j] = value === '' ? '' : Number(value);
        setMatrixA(newA);
    };

    const handleVectorChange = (i, value) => {
        if (readOnly) return;
        const newB = [...vectorB];
        newB[i] = value === '' ? '' : Number(value);
        setVectorB(newB);
    };

    return (
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', overflowX: 'auto', padding: '1rem 0' }}>
            {/* Matrix A */}
            <div>
                <div style={{ marginBottom: '0.5rem', fontWeight: 600, color: 'var(--color-primary)' }}>Matriz de Coeficientes (A)</div>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: `repeat(${size}, 1fr)`, 
                    gap: '8px',
                    background: 'var(--color-bg-secondary)',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    {matrixA.map((row, i) => (
                        row.map((val, j) => (
                            <input
                                key={`A-${i}-${j}`}
                                type="number"
                                className="form-input"
                                value={val === '' ? '' : val}
                                onChange={(e) => handleMatrixChange(i, j, e.target.value)}
                                style={{ width: '60px', textAlign: 'center' }}
                                disabled={readOnly}
                            />
                        ))
                    ))}
                </div>
            </div>

            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-text-muted)' }}>×</div>

            {/* Vector X (Variables) */}
            <div>
                <div style={{ marginBottom: '0.5rem', fontWeight: 600, color: 'var(--color-info)' }}>Vector (X)</div>
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '8px',
                    padding: '1rem',
                    background: 'var(--color-bg-sidebar)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)'
                }}>
                    {Array.from({ length: size }).map((_, i) => (
                        <div key={`x-${i}`} style={{ height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontStyle: 'italic', width: '40px', color: 'var(--color-text-secondary)' }}>
                            x<sub>{i+1}</sub>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-text-muted)' }}>=</div>

            {/* Vector B */}
            <div>
                <div style={{ marginBottom: '0.5rem', fontWeight: 600, color: 'var(--color-success)' }}>Constantes (B)</div>
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '8px',
                    background: 'var(--color-bg-secondary)',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    {vectorB.map((val, i) => (
                        <input
                            key={`B-${i}`}
                            type="number"
                            className="form-input"
                            value={val === '' ? '' : val}
                            onChange={(e) => handleVectorChange(i, e.target.value)}
                            style={{ width: '60px', textAlign: 'center' }}
                            disabled={readOnly}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
