import { files, renderHints } from "../Constants";
import { castlingRights } from "../RenderPieces";

export function getValidKingMoves(position,piece,board,flipped) {
    const startX = flipped ? files.indexOf(position.split("-")[1][0]) : files.indexOf(position[0]);
    const startY = flipped ? parseInt(position.split("-")[1][1]) - 1 : parseInt(position[1]) - 1;
    const validMoves = [];
    const validCaptures = [];
    const pieceColor = piece[0];

    // Castling logic
    if (castlingRights != "-") {
        if (pieceColor == "w") {
            castlingRights.split("").forEach(side => {
                if (side == "K") {
                    const f1Square = document.querySelector(flipped ? ".flipped-f1" : ".f1");
                    const g1Square = document.querySelector(flipped ? ".flipped-g1" : ".g1");
                    if (f1Square == null && g1Square == null) {
                        validMoves.push("g1");
                    }
                }else if (side == "Q") {
                    const b1Square = document.querySelector(flipped ? ".flipped-b1" : ".b1");
                    const c1Square = document.querySelector(flipped ? ".flipped-c1" : ".c1");
                    const d1Square = document.querySelector(flipped ? ".flipped-d1" : ".d1");
                    if (b1Square == null && c1Square == null && d1Square == null) {
                        validMoves.push("c1");
                        validMoves.push("b1");
                    }
                }
            });
        }else if(pieceColor == "b"){
            castlingRights.split("").forEach(side => {
                if (side == "k") {
                    const f8Square = document.querySelector(flipped ? ".flipped-f8" : ".f8");
                    const g8Square = document.querySelector(flipped ? ".flipped-g8" : ".g8");
                    if (f8Square == null && g8Square == null) {
                        validMoves.push("g8");
                    }
                }else if(side == "q"){
                    const b8Square = document.querySelector(flipped ? ".flipped-b8" : ".b8");
                    const c8Square = document.querySelector(flipped ? ".flipped-c8" : ".c8");
                    const d8Square = document.querySelector(flipped ? ".flipped-d8" : ".d8");
                    if (b8Square == null && c8Square == null && d8Square == null) {
                        validMoves.push("c8");
                        validMoves.push("b8");
                    }
                }
            })
        }
    }

    const directions = [
        { xIncrement: 1, yIncrement: 0 }, // Right
        { xIncrement: -1, yIncrement: 0 }, // Left
        { xIncrement: 0, yIncrement: 1 }, // Up
        { xIncrement: 0, yIncrement: -1 }, // Down
        { xIncrement: -1, yIncrement: -1 }, // Up-Left
        { xIncrement: -1, yIncrement: 1 },  // Up-Right
        { xIncrement: 1, yIncrement: -1 },  // Down-Left
        { xIncrement: 1, yIncrement: 1 },   // Down-Right
    ];

    for (const direction of directions) {
        let x = startX + direction.xIncrement;
        let y = startY + direction.yIncrement;

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