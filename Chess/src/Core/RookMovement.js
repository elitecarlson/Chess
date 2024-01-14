import { files, renderHints } from "./Constants";

export function getValidRookMoves(position,piece,board,flipped) {
    const startX = flipped ? files.indexOf(position.split("-")[1][0]) : files.indexOf(position[0]);
    const startY = flipped ? parseInt(position.split("-")[1][1]) - 1 : parseInt(position[1]) - 1;
    const validMoves = [];
    const validCaptures = [];
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
            const targetPiece = document.querySelector(flipped ? `.flipped-${currentPosition}` : `.${currentPosition}`);
            
            // Runs when there is piece in the way
            if (targetPiece != null) {
                // Checking if piece is opponent
                if (targetPiece.className.split(" ")[2][0] != pieceColor) {
                    validCaptures.push(currentPosition);
                }
                // Stop if piece is ours
                break;
            }
            // If there is no piece in the way keep adding till limit of board
            validMoves.push(currentPosition);
    
            x += direction.xIncrement;
            y += direction.yIncrement;
        }
    }

    renderHints(validMoves,validCaptures,board,position,flipped);
}