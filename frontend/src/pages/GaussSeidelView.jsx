import React, { useState, useRef } from 'react';
import MatrixInput from '../components/MatrixInput';
import { gaussSeidel } from '../utils/numericalMethods';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Play, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(useGSAP);

export default function GaussSeidelView() {
    const [size, setSize] = useState(3);
    const [matrixA, setMatrixA] = useState(Array(3).fill(0).map(() => Array(3).fill(0)));
    const [vectorB, setVectorB] = useState(Array(3).fill(0));
    
    const [maxIter, setMaxIter] = useState(100);
    const [tolerance, setTolerance] = useState(0.0001);
    
    const [results, setResults] = useState(null);
    const resultsRef = useRef(null);

    const handleSizeChange = (newSize) => {
        const s = parseInt(newSize);
        if (s >= 2 && s <= 8) {
            setSize(s);
            setMatrixA(Array(s).fill(0).map(() => Array(s).fill(0)));
            setVectorB(Array(s).fill(0));
            setResults(null);
        }
    };

    const handleSolve = () => {
        // Validate empty inputs
        const isAValid = matrixA.every(row => row.every(v => v !== ''));
        const isBValid = vectorB.every(v => v !== '');
        
        if (!isAValid || !isBValid) {
            alert('Por favor llene todos los campos de la matriz y el vector.');
            return;
        }

        const initialGuess = Array(size).fill(0);
        const res = gaussSeidel(matrixA, vectorB, initialGuess, maxIter, tolerance);
        setResults(res);
    };

    useGSAP(() => {
        if (results && resultsRef.current) {
            gsap.fromTo('.result-card', 
                { y: 30, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)' }
            );
        }
    }, { dependencies: [results], scope: resultsRef });

    return (
        <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 className="card-title" style={{ marginBottom: '0.25rem' }}>Método de Gauss-Seidel</h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Resolución iterativa de sistemas de ecuaciones lineales Ax = B</p>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div>
                        <label style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Dimensión (n×n)</label>
                        <select 
                            className="form-input" 
                            value={size} 
                            onChange={(e) => handleSizeChange(e.target.value)}
                            style={{ width: '100px' }}
                        >
                            {[2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} × {n}</option>)}
                        </select>
                    </div>
                    <div>
                        <label style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Iteraciones Max</label>
                        <input type="number" className="form-input" value={maxIter} onChange={e => setMaxIter(Number(e.target.value))} style={{ width: '100px' }} />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Tolerancia (Error)</label>
                        <input type="number" step="0.0001" className="form-input" value={tolerance} onChange={e => setTolerance(Number(e.target.value))} style={{ width: '120px' }} />
                    </div>
                </div>
            </div>

            <div style={{ background: 'var(--color-bg-primary)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <MatrixInput size={size} matrixA={matrixA} setMatrixA={setMatrixA} vectorB={vectorB} setVectorB={setVectorB} />
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                <button className="btn btn-primary" onClick={handleSolve} style={{ flex: 1, padding: '1rem', fontSize: '1rem' }}>
                    <Play size={18} /> Calcular Solución
                </button>
                <button className="btn btn-secondary" onClick={() => { setResults(null); setMatrixA(Array(size).fill(0).map(() => Array(size).fill(0))); setVectorB(Array(size).fill(0)); }} style={{ padding: '1rem' }}>
                    <RotateCcw size={18} /> Limpiar
                </button>
            </div>

            {/* Results Section */}
            {results && (
                <div ref={resultsRef} style={{ marginTop: '3rem', borderTop: '1px dashed var(--color-border)', paddingTop: '2rem' }}>
                    
                    <div className="result-card" style={{ 
                        padding: '1.5rem', 
                        borderRadius: 'var(--radius-md)', 
                        background: results.success ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        border: `1px solid ${results.success ? 'var(--color-success)' : 'var(--color-danger)'}`,
                        marginBottom: '2rem',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '1rem'
                    }}>
                        {results.success ? <CheckCircle2 color="var(--color-success)" size={32} /> : <AlertTriangle color="var(--color-danger)" size={32} />}
                        <div>
                            <h3 style={{ color: results.success ? 'var(--color-success)' : 'var(--color-danger)', marginBottom: '0.5rem', fontSize: '1.25rem' }}>
                                {results.message}
                            </h3>
                            <p style={{ color: 'var(--color-text-secondary)' }}>
                                El algoritmo completó <strong>{results.iterations.length}</strong> iteraciones con un error relativo final de <strong>{results.finalError?.toFixed(6)}%</strong>.
                            </p>
                        </div>
                    </div>

                    <div className="grid-2">
                        {/* Final Solution Vector */}
                        <div className="result-card card">
                            <h3 className="card-title">Vector Solución (X)</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {results.solution.map((val, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--color-bg-primary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                                        <span style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>x<sub>{i+1}</sub></span>
                                        <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}>{Number(val).toFixed(6)}</strong>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Iterations Table */}
                        <div className="result-card card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <h3 className="card-title">Historial de Iteraciones</h3>
                            <div className="table-wrap" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                <table className="data-table">
                                    <thead style={{ position: 'sticky', top: 0, background: 'var(--color-bg-secondary)' }}>
                                        <tr>
                                            <th>Iter</th>
                                            <th>Error (%)</th>
                                            {Array.from({length: size}).map((_, i) => <th key={i}>x{i+1}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.iterations.map((iter) => (
                                            <tr key={iter.iteration}>
                                                <td style={{ color: 'var(--color-text-muted)', fontWeight: 'bold' }}>{iter.iteration}</td>
                                                <td style={{ color: iter.error <= tolerance ? 'var(--color-success)' : 'var(--color-warning)' }}>
                                                    {iter.error.toFixed(4)}%
                                                </td>
                                                {iter.values.map((val, i) => (
                                                    <td key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{val.toFixed(4)}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
