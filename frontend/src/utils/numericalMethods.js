/**
 * Gauss-Seidel Method for solving systems of linear equations
 * @param {number[][]} A - Coefficient matrix (n x n)
 * @param {number[]} B - Constants vector (n x 1)
 * @param {number[]} initialGuess - Initial guess vector (n x 1)
 * @param {number} maxIterations - Maximum number of iterations
 * @param {number} tolerance - Allowed error tolerance
 * @returns {Object} - Result containing final solution, iterations history, and status
 */
export const gaussSeidel = (A, B, initialGuess, maxIterations = 100, tolerance = 0.0001) => {
    const n = A.length;
    let x = [...initialGuess];
    let iterationsHistory = [];
    let error = 100;
    let iter = 0;

    // Check for strictly diagonally dominant matrix to guarantee convergence
    // But we still attempt to solve even if not strictly dominant
    
    while (error > tolerance && iter < maxIterations) {
        let xOld = [...x];
        let maxError = 0;

        for (let i = 0; i < n; i++) {
            let sum = 0;
            for (let j = 0; j < n; j++) {
                if (j !== i) {
                    sum += A[i][j] * x[j];
                }
            }
            
            // Avoid division by zero
            if (A[i][i] === 0) {
                return {
                    success: false,
                    message: `Error: Division by zero at diagonal A[${i}][${i}]`,
                    solution: x,
                    iterations: iterationsHistory
                };
            }

            x[i] = (B[i] - sum) / A[i][i];
            
            // Calculate relative error
            let currentError = Math.abs((x[i] - xOld[i]) / x[i]) * 100;
            if (currentError > maxError) {
                maxError = currentError;
            }
        }

        error = maxError;
        
        iterationsHistory.push({
            iteration: iter + 1,
            values: [...x],
            error: error
        });
        
        iter++;
    }

    return {
        success: error <= tolerance,
        message: error <= tolerance ? 'Converged successfully' : 'Did not converge within max iterations',
        solution: x,
        iterations: iterationsHistory,
        finalError: error
    };
};

/**
 * Basic Matrix Operations Helper
 */
export const matrixOperations = {
    add: (A, B) => A.map((row, i) => row.map((val, j) => val + B[i][j])),
    subtract: (A, B) => A.map((row, i) => row.map((val, j) => val - B[i][j])),
    multiplyScalar: (A, scalar) => A.map(row => row.map(val => val * scalar)),
    multiply: (A, B) => {
        const result = Array(A.length).fill(0).map(() => Array(B[0].length).fill(0));
        for (let i = 0; i < A.length; i++) {
            for (let j = 0; j < B[0].length; j++) {
                for (let k = 0; k < A[0].length; k++) {
                    result[i][j] += A[i][k] * B[k][j];
                }
            }
        }
        return result;
    },
    transpose: (A) => A[0].map((_, colIndex) => A.map(row => row[colIndex]))
};
