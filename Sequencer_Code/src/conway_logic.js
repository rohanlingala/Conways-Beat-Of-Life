export function updateGrid ( rows )
{
    const numRows = rows.length;
    const numCols = rows[ 0 ].length;

    for ( let i = 0; i < numRows; i++ )
    {
        for ( let j = 0; j < numCols; j++ )
        {
            const neighbors = countAliveNeighbors( rows, i, j );
            const currentState = rows[ i ][ j ].active;

            if ( currentState && ( neighbors < 2 || neighbors > 3 ) )
            {
                // Any live cell with fewer than two live neighbors dies, as if by underpopulation.
                // Any live cell with more than three live neighbors dies, as if by overpopulation.
                rows[ i ][ j ].active = false;
            } else if ( !currentState && neighbors === 3 )
            {
                // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
                rows[ i ][ j ].active = true;
            }
            // Otherwise, the cell remains in its current state.
        }
    }
}

function countAliveNeighbors ( grid, x, y )
{
    const numRows = grid.length;
    const numCols = grid[ 0 ].length;
    let count = 0;

    for ( let i = -1; i <= 1; i++ )
    {
        for ( let j = -1; j <= 1; j++ )
        {
            const neighborX = x + i;
            const neighborY = y + j;

            // Skip the current cell
            if ( i === 0 && j === 0 ) continue;

            // Check if the neighbor is within the grid boundaries
            if ( neighborX >= 0 && neighborX < numRows && neighborY >= 0 && neighborY < numCols )
            {
                // Increment count if the neighbor is alive
                if ( grid[ neighborX ][ neighborY ].active )
                {
                    count++;
                }
            }
        }
    }

    return count;
}

export function startGridUpdate ( interval, gridUpdateInterval, rows )
{
    // Clear any existing interval
    clearInterval( gridUpdateInterval );
    // Set a new interval to update the grid
    gridUpdateInterval = setInterval( () =>
    {
        const updatedRows = updateGrid( rows ); // Call updateGrid function with rows
        rows = updatedRows; // Update the rows variable with the new grid
    }, interval );
    return gridUpdateInterval; // Return the interval ID
}


export function stopGridUpdate ( gridUpdateInterval )
{
    clearInterval( gridUpdateInterval );
}