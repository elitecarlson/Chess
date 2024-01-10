import { files, hideHints } from "./Constants";
import { hints } from "./Constants";

export function getValidRookMoves(position,piece,board) {
    const startX = files.indexOf(position[0]);
    const startY = parseInt(position[1]) - 1;
    const validMoves = [];
    const pieceColor = piece[0];
    
    const directions = [
        { xIncrement: 1, yIncrement: 0 }, // Right
        { xIncrement: -1, yIncrement: 0 }, // Left
        { xIncrement: 0, yIncrement: 1 }, // Up
        { xIncrement: 0, yIncrement: -1 }, // Down
    ];
    
    for (const direction of directions) {
        let x = startX + direction.xIncrement;
        let y = startY + direction.yIncrement;

        while (x >= 0 && x < 8 && y >= 0 && y < 8) {
            const currentPosition = files[x] + (y + 1);
            
            // Runs when there is piece in the way
            if (document.querySelector(`.${currentPosition}`) != null) {
                // Checking if piece is opponent
                if (document.querySelector(`.${currentPosition}`).className.split(" ")[2][0] != pieceColor) {
                    validMoves.push(currentPosition);
                    hints.push(currentPosition);
                }
                // Stop if piece is opponent
                break;
            }
            // If there is no piece in the way keep adding till limit of board
            validMoves.push(currentPosition);
            hints.push(currentPosition);
    
            x += direction.xIncrement;
            y += direction.yIncrement;
        }
    }

    // Render hints
    validMoves.forEach(validMove => {
        const hint = document.createElement('div');
        hint.className = `hint ${validMove}`;
        hint.addEventListener('click', ()=>{hintClicked(validMove)});
        board.current.appendChild(hint);
    });

    // Move Rook to hint position
    function hintClicked(hintPosition){
        const selectedPiece = document.querySelector(`.${position}`);
        selectedPiece.classList.replace(position,hintPosition);
        selectedPiece.classList.remove("selected");
        hideHints();
    }
    
}