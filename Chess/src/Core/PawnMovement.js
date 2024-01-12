import { files, renderHints } from "./Constants";

export function getValidPawnMoves(position,piece,board) {
    const startX = files.indexOf(position[0]);
    const startY = parseInt(position[1]) - 1;
    const validMoves = [];
    const pieceColor = piece[0];

    // Calculate legal moves for a pawn
    const isFirstMove = [
        pieceColor == "w" && startY == 1,
        pieceColor == "b" && startY == 6
    ];

    if (pieceColor == "w") {
        if (isFirstMove[0]) {
            validMoves.push(files[startX] + (startY + 3));
            validMoves.push(files[startX] + (startY + 2));
        }else{
            validMoves.push(files[startX] + (startY + 2));
        }
    }else if(pieceColor == "b"){
        if (isFirstMove[1]) {
            validMoves.push(files[startX] + (startY - 0));
            validMoves.push(files[startX] + (startY - 1));
        }else{
            validMoves.push(files[startX] + (startY - 0));
        }
    }

    // Pawn captures diagonally
    // Check if there is a piece to capture on the left diagonal
    // if (file.charCodeAt(0) > 97) {
    //   validMoves.push(String.fromCharCode(file.charCodeAt(0) - 1) + (rank + 1));
    // }

    // // Check if there is a piece to capture on the right diagonal
    // if (file.charCodeAt(0) < 104) {
    //   validMoves.push(String.fromCharCode(file.charCodeAt(0) + 1) + (rank + 1));
    // }
    renderHints(validMoves,board,position);
}