import { files, renderHints } from "./Constants";

export function getValidKnightMoves(position,piece,board){
    const startX = files.indexOf(position[0]);
    const startY = parseInt(position[1]) - 1;
    const validMoves = [];
    const pieceColor = piece[0];

    const knightMoves = [
        [-2, -1], // Move 2 squares up and 1 square to the left
        [-2, 1],  // Move 2 squares up and 1 square to the right
        [-1, -2], // Move 1 square up and 2 squares to the left
        [-1, 2],  // Move 1 square up and 2 squares to the right
        [1, -2],  // Move 1 square down and 2 squares to the left
        [1, 2],   // Move 1 square down and 2 squares to the right
        [2, -1],  // Move 2 squares down and 1 square to the left
        [2, 1]    // Move 2 squares down and 1 square to the right
    ];

    for (const [fileOffset, rankOffset] of knightMoves) {
        const newFile = startX + fileOffset;
        const newRank = startY + rankOffset;

        // Check if the new position is within the board bounds (1 to 8 for both file and rank)
        if (newFile >= 0 && newFile < 8 && newRank >= 0 && newRank < 8) {
            const currentPosition = files[newFile] + (newRank + 1);
            const targetPiece = document.querySelector(`.${currentPosition}`)
            if (targetPiece == null || targetPiece.className.split(" ")[2][0] != pieceColor) {
                validMoves.push(currentPosition);
            }
        }
    }

    renderHints(validMoves,board,position);
}