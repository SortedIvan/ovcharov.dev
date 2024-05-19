var gridContainer = document.getElementById('astarGridId');
var hoveredOver = {};

function createAstarGrid(grid_y, grid_x) {
    var startCellRow = getRandomInt(grid_x);
    var endCellRow = getRandomInt(grid_x);

    var startCellColumn = getRandomInt(grid_y);
    var endCellColumn = getRandomInt(grid_y);

    // Ensure that start and end cells are different
    while (startCellRow === endCellRow && startCellColumn === endCellColumn) {
        endCellRow = getRandomInt(grid_x);
        endCellColumn = getRandomInt(grid_y);
    }

    for (let x = 0; x < grid_x; x++) {
        var col = document.createElement('div');
        col.classList.add('col');
        
        for (let y = 0; y < grid_y; y++) {
            var cell = document.createElement('div');
            cell.classList.add('cell');
            cell.classList.add("disable-select")
            var color = '#FBEAEB';

            if (x === startCellRow && y === startCellColumn) {
                color = '#2F3C7E';
                cell.id = "startCell";
                cell.textContent = "Hi,"
            } else if (x === endCellRow && y === endCellColumn) {
                cell.id = "endCell";
                color = '#2F3C7E';
                cell.textContent = "I'm Ivan."
            }
            
            cell.style.backgroundColor = color;
            cell.style.textAlign = 'center';
            cell.style.fontSize = '2em';
            cell.style.fontFamily = 'Roboto, sans-serif';

            cell.addEventListener('mouseenter', function() {
                if (this.id === "startCell" || this.id === "endCell") {
                    return;
                }
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            });
            
            cell.addEventListener('mouseleave', function() {
                // Check if the cell is the start or end cell
                if (this.id === "startCell") {
                    this.style.backgroundColor = '#2F3C7E';
                } else if (this.id === "endCell") {
                    this.style.backgroundColor = '#2F3C7E';
                } else {
                    // Change color back to light blue for other cells
                    this.style.backgroundColor = '#FBEAEB';
                }
            });
            
            col.appendChild(cell);
        }
        
        gridContainer.appendChild(col);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

/*
   ========= Grid adjustment section ============
*/
function adjustGridHeight() {
    var cellWidth = (gridContainer.offsetWidth - 18) / 18; // 18 columns
    var cellHeight = (gridContainer.offsetHeight - 10) / 10; // 10 rows

    // Loop through each cell to adjust width and height
    var cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.width = `${cellWidth}px`;
        cell.style.height = `${cellHeight}px`;
    });
}

window.onload = function() {
    createAstarGrid(9, 18);
    adjustGridHeight();
};

window.addEventListener('resize', adjustGridHeight);


/*
   ========= Drag-drop section ============
*/
var draggedCell = null;
var content = '';
var originalColor = '';

function handleMouseDown(event) {
    if (event.button !== 0) return; // Only handle left mouse button
    if (event.target.classList.contains('cell')) {
        draggedCell = event.target;
        originalColor = draggedCell.style.backgroundColor;
        content = draggedCell.textContent;
    }
}

function handleMouseUp(event) {
    if (draggedCell) {
        // Check if the mouse is over a valid drop target cell
        var targetCell = event.target;
        if (targetCell.classList.contains('cell') && targetCell.id != "startCell" && targetCell.id != "endCell") {
            // Update the color and id of the target cell
            targetCell.style.backgroundColor = originalColor;
            targetCell.id = draggedCell.id;
            targetCell.textContent = content;
            // Reset the color and id of the dragged cell
            draggedCell.style.backgroundColor = '#FBEAEB';
            draggedCell.id = '';
            draggedCell.textContent = '';
        }
        // Reset the dragged cell and original color
        draggedCell = null;
        originalColor = '';
    }
}

// Attach event listeners to the grid container
gridContainer.addEventListener('mousedown', handleMouseDown);
gridContainer.addEventListener('mouseup', handleMouseUp);

// Function to handle mouse enter event (update color during drag)
function handleMouseEnter(event) {
    if (draggedCell) {
        // Change color of the cell being hovered over during drag
        event.target.style.backgroundColor = originalColor;
    }
}

// Attach event listener to each cell for mouse enter event
var cells = document.querySelectorAll('.cell');
cells.forEach(cell => {
    cell.addEventListener('mouseenter', handleMouseEnter);
});
