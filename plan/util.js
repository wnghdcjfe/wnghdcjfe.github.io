
const lower = str => str.toLowerCase();
const findStr = a => /[a-z]{2}/.test(a)
const log = console.log
const INF = 987654321
const dy = [-1, 0, 1, 0]; 
const dx = [0, 1, 0, -1]; 
const setMatrix = (rows, cols, init) => Array.from(new Array(rows), () => Array.from(new Array(cols), () => init)); 
const setArray = (n, init) => Array.from(new Array(n), () => init);
const rotateRight90 = (matrix, board) =>{
    const cols = matrix.length; 
    const rows = matrix[0].length; 
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){ 
            matrix[i][j] = board[rows - j - 1][i];
        }
    } 
    return matrix;
} 
 