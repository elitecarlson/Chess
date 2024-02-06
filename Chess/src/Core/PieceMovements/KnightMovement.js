import { files, renderHints } from "../Constants";

export function getValidKnightMoves(position,piece,board,flipped) {
    const startX = flipped ? files.indexOf(position.split("-")[1][0]) : files.indexOf(position[0]);
    const startY = flipped ? parseInt(position.split("-")[1][1]) - 1 : parseInt(position[1]) - 1;
    const validMoves = [];
    const validCaptures = [];
    const pieceColor = piece[0];

    const directions = [
        { xIncrement: -2, yIncrement: -1 }, // Move 2 squares up and 1 square to the left
        { xIncrement: -2, yIncrement: 1 },  // Move 2 squares up and 1 square to the right
        { xIncrement: -1, yIncrement: -2 }, // Move 1 square up and 2 squares to the left
        { xIncrement: -1, yIncrement: 2 },  // Move 1 square up and 2 squares to the right
        { xIncrement: 1, yIncrement: -2 },  // Move 1 square down and 2 squares to the left
        { xIncrement: 1, yIncrement: 2 },   // Move 1 square down and 2 squares to the right
        { xIncrement: 2, yIncrement: -1 },  // Move 2 squares down and 1 square to the left
        { xIncrement: 2, yIncrement: 1 }    // Move 2 squares down and 1 square to the right
    ];

    for (const direction of directions) {
        let x = startX + direction.xIncrement;
        let y = startY + direction.yIncrement;

        // Check if the new position is within the board bounds (1 to 8 for both file and rank)
        if (x >= 0 && x < 8 && y >= 0 && y < 8) {
            const currentPosition = files[x] + (y + 1);
            const targetPiece = document.querySelector(flipped ? `.flipped-${currentPosition}` : `.${currentPosition}`);
            if (targetPiece == null){
                validMoves.push(currentPosition);
            }else if(targetPiece.className.split(" ")[2][0] != pieceColor) {
                validCaptures.push(currentPosition);
            }
        }
    }

    renderHints(validMoves,validCaptures,board,position,flipped,piece);
}