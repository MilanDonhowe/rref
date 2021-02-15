/* Row Reduction */

const ZERO_CUTOFF = 0.0001;

/*
==================================================
    Elemntary Row Operations 
==================================================
*/
// returns matrix[row] = matrix[row]*scalar
function multRows(matrix, row, scalar){
    for (let i=0; i < matrix[row].length; i++){
        matrix[row][i] *= scalar;
    }
    return matrix;
}
// swaps matrix[row1] <--> matrix[row2]
function swapRows(matrix, row1, row2){
    let intermediate = matrix[row1];
    matrix[row1] = matrix[row2]
    matrix[row2] = intermediate;
    return matrix;
}

// returns matrix[row1] = matrix[row1] + (scalar*matrix[row2])
function addRows(matrix, row1, row2, scalar){
    for (let i=0; i < matrix[row1].length; i++){
        matrix[row1][i] += (scalar*matrix[row2][i]);
    }
    return matrix;
}

/*
==================================================
    Misc. Helper Functions for Row-Reduction
==================================================

*/

// returns -1 if not a pivot column.
// otherwise returns row index j of pivot position
function find_pivot_position(matrix, row_start, col, ROW_MAX){
    let entry_i = row_start;
    while (matrix[entry_i][col] == 0){
        if (entry_i+1 >= ROW_MAX){
            return -1;
        }
        entry_i++;
    }
    return entry_i;
}

// returns first non-zero entry below matrix[row][col]
function get_target_below(matrix, row, col, ROW_MAX){
    let target = row+1;
    while (target < ROW_MAX){
        if (Math.abs(matrix[target][col]) > ZERO_CUTOFF) return target;
        target++;
    }
    return -1;
}
/* Round answers to what they come arbitrarily close to. */
function arbitrary_correct(matrix){
    for (let i=0; i < matrix.length; i++){
        for (let j=0; j < matrix[0].length;j++){
            //if (Math.abs(matrix[i][j]) < ZERO_CUTOFF) matrix[i][j] = 0;
            if ( Math.abs(matrix[i][j]-Math.round(matrix[i][j]) ) < ZERO_CUTOFF)  matrix[i][j] = Math.round(matrix[i][j]);
        }
    }
    return matrix;
}


/* Row-Reduction Algorithm */
export function rref(matrix){
    //console.table(matrix);

    const ROW_MAX = matrix.length;
    const COL_MAX = matrix[0].length;
    // find first non-zero column entry (switching rows if necessary)
    let row_i = 0; 
    let col_j = 0;

    while (col_j < COL_MAX && row_i < ROW_MAX){

        // find pivot position of col_j
        let pivot = find_pivot_position(matrix, row_i, col_j, ROW_MAX);
        if (pivot == -1) {
            col_j++;
            continue;
        }
        if (pivot != row_i){
            matrix = swapRows(matrix, pivot, row_i);
        }

        /* Use row operations to zero-out entries below pivot in our column */
        let target = get_target_below(matrix, row_i, col_j, ROW_MAX);

        while (target != -1){
            let zeroing_scalar = -(matrix[target][col_j])/(matrix[row_i][col_j]);
            matrix = addRows(matrix, target, row_i, zeroing_scalar);
            target = get_target_below(matrix, row_i, col_j, ROW_MAX);            
        }

        //now let's zero out all entries above the pivot position
        target = get_target_below(matrix, -1, col_j, ROW_MAX)
        while (target != row_i && target != -1){
            let zeroing_scalar = -(matrix[target][col_j])/(matrix[row_i][col_j]);
            matrix = addRows(matrix, target, row_i, zeroing_scalar);
            target = get_target_below(matrix, 0, col_j, ROW_MAX);
        }
        
        // make sure pivot is 1 
        if (matrix[row_i][col_j] != 1){
            matrix = multRows(matrix, row_i, 1/matrix[row_i][col_j]);
        }

        row_i++;
        col_j++;
    }
    

    return arbitrary_correct(matrix);
}