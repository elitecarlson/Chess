import { enpassant, files, renderHints } from "../Constants";

export function getValidPawnMoves(position,piece,board,flipped) {
    const startX = flipped ? files.indexOf(position.split("-")[1][0]) : files.indexOf(position[0]);
    const startY = flipped ? parseInt(position.split("-")[1][1]) - 1 : parseInt(position[1]) - 1;
    const validMoves = [];
    const pawnMoves = [];
    const pawnCaptures = [];
    const validCaptures = [];
    const pieceColor = piece[0];

    // Calculate all front pawn moves
    if (pieceColor == "w" && startY == 1) {
        const currentPosition = files[startX] + (startY + 2);
        const targetPiece = document.querySelector(flipped ? `.flipped-${currentPosition}` : `.${currentPosition}`);
        if (targetPiece == null) {
            pawnMoves.push(files[startX] + (startY + 3));
        }
        pawnMoves.push(files[startX] + (startY + 2));
    }else if(pieceColor == "b" && startY == 6){
        const currentPosition = files[startX] + (startY - 0);
        const targetPiece = document.querySelector(flipped ? `.flipped-${currentPosition}` : `.${currentPosition}`);
        if (targetPiece == null) {
            pawnMoves.push(files[startX] + (startY - 1));
        }
        pawnMoves.push(files[startX] + (startY - 0));
    }else if(pieceColor == "w"){
        pawnMoves.push(files[startX] + (startY + 2));
    }else if(pieceColor == "b"){
        pawnMoves.push(files[startX] + (startY - 0));
    }

    // Calcualte all pawn captures
    if (pieceColor == "w" && files[startX] == 'a') {
        pawnCaptures.push(files[startX + 1] + (startY + 2));
    }else if(pieceColor == "w" && files[startX] == 'h'){
        pawnCaptures.push(files[startX - 1] + (startY + 2));
    }else if(pieceColor == "w"){
        pawnCaptures.push(files[startX - 1] + (startY + 2));
        pawnCaptures.push(files[startX + 1] + (startY + 2));
    }else if(pieceColor == "b" && files[startX] == 'a'){
        pawnCaptures.push(files[startX + 1] + (startY - 0));
    }else if(pieceColor == "b" && files[startX] == 'h'){
        pawnCaptures.push(files[startX - 1] + (startY - 0));
    }else if(pieceColor == "b"){
        pawnCaptures.push(files[startX - 1] + (startY - 0));
        pawnCaptures.push(files[startX + 1] + (startY - 0));
    }

    // Calculate legal front moves
    pawnMoves.forEach(move => {
        const targetPiece = document.querySelector(flipped ? `.flipped-${move}` : `.${move}`);
        if (targetPiece == null) {
            validMoves.push(move);
        }
    });

    // Calculate all legal captures
    pawnCaptures.forEach(move => {
        const targetPiece = document.querySelector(flipped ? `.flipped-${move}` : `.${move}`);
        if (targetPiece != null && targetPiece.className.split(" ")[2][0] != pieceColor) {
            validCaptures.push(move);
        }
        if (move == enpassant && startY != "6" && startY != "1") {
            validCaptures.push(move);
        }
    });
    
    renderHints(validMoves,validCaptures,board,position,flipped,piece);
}