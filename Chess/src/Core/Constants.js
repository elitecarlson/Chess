import { kingCastling, rookMovementCastlingRights } from "./Castling";
import PlayMove from "./PlayMove";
import pawnPromotion from "./Promoting";

export const files = ['a','b','c','d','e','f','g','h'];
export const CapturedPieces = [];
export const moves = [];
export const playedMove = [];
export var enpassant = null;
export function modifyenpassant( value ) { enpassant = value; }

//Remove all hints and capture hints
export function hideHints(){

    // Remove hints
    const visibleHints = document.querySelectorAll('.hint');
    visibleHints.forEach(hint => {
        hint.remove();
    });

    // Remove captures
    const visibleCaptures = document.querySelectorAll('.capture');
    visibleCaptures.forEach(capture => {
        capture.remove();
    });
}

// Render hints and captureable's
export function renderHints(validMoves,validCaptures,board,position,flipped,piece){

    // Render Captureable piece
    validCaptures.forEach(validCapture => {
        const capture = document.createElement('div');
        const actualPostion = flipped ? `flipped-${validCapture}` : validCapture;
        capture.className = `capture ${actualPostion}`;
        capture.addEventListener('click', ()=>{hintActivated(position,validCapture,flipped,piece,board)});
        capture.addEventListener('dragover', (e)=>{e.preventDefault()})
        capture.addEventListener('drop', ()=>{
            hintActivated(position,validCapture,flipped,piece,board);
        });
        board.current.appendChild(capture);
    });

    // Render available hints
    validMoves.forEach(validMove => {
        const hint = document.createElement('div');
        const actualPostion = flipped ? `flipped-${validMove}` : validMove;
        hint.className = `hint ${actualPostion}`;
        hint.addEventListener('click', ()=>{hintActivated(position,validMove,flipped,piece,board)});
        hint.addEventListener('dragover', (e)=>{e.preventDefault()})
        hint.addEventListener('drop', ()=>{
            hintActivated(position,validMove,flipped,piece,board);
        });
        board.current.appendChild(hint);
    });
}

// Runs when hint is clicked or piece is dropped on hint
function hintActivated(position,hintPosition,flipped,piece,board){
    
    // Check if piece is pawn
    if (piece[1] == "p"){
        if (hintPosition[1] == "1" || hintPosition[1] == "8") {
            pawnPromotion(piece,board,hintPosition,flipped,position);
            enpassant = null;
        }else if(piece[0] == "w" && hintPosition[1] == "4" || piece[0] == "b" && hintPosition[1] == "5"){
            PlayMove(flipped,hintPosition,position,piece);
            addEnpassantSquare(piece,hintPosition);
        }else{
            PlayMove(flipped,hintPosition,position,piece);
        }
        // Check if piece is king
    }else if (piece[1] == "k") {
        kingCastling(flipped,hintPosition,position,piece);
    }else if (piece[1] == "r") {
        rookMovementCastlingRights(flipped,hintPosition,position,piece);
    }else{
        PlayMove(flipped,hintPosition,position,piece);
    }
}

//Add Enpassant Square
function addEnpassantSquare(piece,hintPosition){
    const enpassantSquare = piece[0] == "w" ? hintPosition[0]+(parseInt(hintPosition[1])-1) : hintPosition[0]+(parseInt(hintPosition[1])+1);
    const firstPawnMove = playedMove[0][1] == "2" || playedMove[0][1] == "7";
    firstPawnMove ? enpassant = enpassantSquare : enpassant = null;
}