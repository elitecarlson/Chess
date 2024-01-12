import { files, renderHints } from "./Constants";

export function getValidBishopMoves(position,piece,board){
    const startX = files.indexOf(position[0]);
    const startY = parseInt(position[1]) - 1;
    const validMoves = [];
    const pieceColor = piece[0];
    
    const directions = [
        { xIncrement: -1, yIncrement: -1 }, // Up-Left
        { xIncrement: -1, yIncrement: 1 },  // Up-Right
        { xIncrement: 1, yIncrement: -1 },  // Down-Left
        { xIncrement: 1, yIncrement: 1 },   // Down-Right
    ];

    for (const direction of directions) {
        let x = startX + direction.xIncrement;
        let y = startY + direction.yIncrement;

        while (x >= 0 && x < 8 && y >= 0 && y < 8) {
            const currentPosition = files[x] + (y + 1);
            const targetPiece = document.querySelector(`.${currentPosition}`);

            // Runs when there is piece in the way
            if (targetPiece != null) {
                // Checking if piece is opponent
                if (targetPiece.className.split(" ")[2][0] != pieceColor) {
                    validMoves.push(currentPosition);
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
    
    renderHints(validMoves,board,position);
}