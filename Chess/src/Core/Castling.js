import PlayMove from "./PlayMove";
import { castlingRights, setCastlingRights } from "./RenderPieces";

export function kingCastling(flipped,hintPosition,position,piece){
    if (piece[0] == "w") {

        // White Kingside castling
        if (hintPosition == "g1" && castlingRights.includes("K")) {
            PlayMove(flipped,hintPosition,position,piece);
            const h1 = flipped ? "flipped-h1" : "h1";
            const f1 = flipped ? "flipped-f1" : "f1";
            const h1Rook = document.querySelector(`.${h1}`);
            h1Rook.classList.replace(h1,f1);

            // White Queenside castling
        }else if(hintPosition == "b1"  && castlingRights.includes("Q") || hintPosition == "c1" && castlingRights.includes("Q")){
            PlayMove(flipped,"c1",position,piece);
            const a1 = flipped ? "flipped-a1" : "a1";
            const d1 = flipped ? "flipped-d1" : "d1";
            const a1Rook = document.querySelector(`.${a1}`);
            a1Rook.classList.replace(a1,d1);
        }else{
            PlayMove(flipped,hintPosition,position,piece);
        }

        // Removing castling rights when white king moves
        setCastlingRights(castlingRights.replace("K",""));
        setCastlingRights(castlingRights.replace("Q",""));
        if (castlingRights == "") {setCastlingRights("-")}
    }else if(piece[0] == "b"){

        // Black king side castling
        if (hintPosition == "g8" && castlingRights.includes("k")) {
            PlayMove(flipped,hintPosition,position,piece);
            const h8 = flipped ? "flipped-h8" : "h8";
            const f8 = flipped ? "flipped-f8" : "f8";
            const h8Rook = document.querySelector(`.${h8}`);
            h8Rook.classList.replace(h8,f8);

            // Black queenside castling
        }else if(hintPosition == "b8"  && castlingRights.includes("q") || hintPosition == "c8" && castlingRights.includes("q")){
            PlayMove(flipped,"c8",position,piece);
            const a8 = flipped ? "flipped-a8" : "a8";
            const d8 = flipped ? "flipped-d8" : "d8";
            const a8Rook = document.querySelector(`.${a8}`);
            a8Rook.classList.replace(a8,d8);
        }else{
            PlayMove(flipped,hintPosition,position,piece);
        }

        // Removing castling rights when black king moves
        setCastlingRights(castlingRights.replace("k",""));
        setCastlingRights(castlingRights.replace("q",""));
        if (castlingRights == "") {setCastlingRights("-")}
    }
}

// Function for when a rook moves so that castling can be removed respectively and then play the move
export function rookMovementCastlingRights(flipped,hintPosition,position,piece){
    const rookPosition = flipped ? position.split("-")[1] : position;
        if (rookPosition == "a1") {
            setCastlingRights(castlingRights.replace("Q",""));
        }else if(rookPosition == "h1"){
            setCastlingRights(castlingRights.replace("K",""));
        }else if(rookPosition == "a8"){
            setCastlingRights(castlingRights.replace("q",""));
        }else if(rookPosition == "h8"){
            setCastlingRights(castlingRights.replace("k",""));
        }
        if (castlingRights == "") {setCastlingRights("-")}
        PlayMove(flipped,hintPosition,position,piece);
}