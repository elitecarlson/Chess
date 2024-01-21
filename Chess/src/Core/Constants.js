import { pieceClicked } from "./PieceClicked";
import pawnPromotion from "./Promoting";

export const files = ['a','b','c','d','e','f','g','h'];
export const CapturedPieces = [];
const moves = [];
const playedMove = [];
export let enpassant = null;

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

// Show hints
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

    // Render available hint positions
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
        if (hintPosition[1] == "1" || hintPosition[1] == "8") { //Pawn promotion
            pawnPromotion(piece,board,hintPosition,flipped,position);
            enpassant = null;
        }else if(piece[0] == "w" && hintPosition[1] == "4" || piece[0] == "b" && hintPosition[1] == "5"){ //Add Enpassant Square
            PlayMove(flipped,hintPosition,position,piece);
            const enpassantSquare = piece[0] == "w" ? hintPosition[0]+(parseInt(hintPosition[1])-1) : hintPosition[0]+(parseInt(hintPosition[1])+1);
            const firstPawnMove = playedMove[0][1] == "2" || playedMove[0][1] == "7";
            firstPawnMove ? enpassant = enpassantSquare : enpassant = null;
        }else{
            PlayMove(flipped,hintPosition,position,piece);
        }
        // if piece isn't pawn
    }else{
        PlayMove(flipped,hintPosition,position,piece);
    }
}

// Play the move
function PlayMove(flipped,hintPosition,position,piece) {
    const actualPostion = flipped ? `flipped-${hintPosition}` : hintPosition;
    const opponentPiece = document.getElementsByClassName(`piece ${actualPostion}`)[0];
    const selectedPiece = document.querySelector(`.${position}`);
    // Capture by enpassant
    if (piece[1] == "p" && hintPosition == enpassant) {
        const enpassantCapture = piece[0] == "w" ? enpassant[0]+(parseInt(enpassant[1])-1) : enpassant[0]+(parseInt(enpassant[1])+1);
        const actualEnpassantCaptureSquare = flipped ? `flipped-${enpassantCapture}` : enpassantCapture;
        document.querySelector(`.${actualEnpassantCaptureSquare}`).remove();
        if (flipped) {
            moves.push(position.split("-")[1][0]+"x"+enpassantCapture);
        }else{
            moves.push(position[0]+"x"+enpassantCapture);
        }
        piece[0] == "w" ? CapturedPieces.push("bp") : CapturedPieces.push("wp");
    }else{
        addToMoves(opponentPiece,selectedPiece,actualPostion,flipped);
    }

    // Store the move in playedMove Array
    if (flipped) {   
        playedMove[0] = position.split("-")[1];
        playedMove[1] = actualPostion.split("-")[1];
    }else{
        playedMove[0] = position;
        playedMove[1] = actualPostion;
    }

    // Move the piece to it's appropriate place
    selectedPiece.classList.replace(position,actualPostion);
    selectedPiece.classList.remove("selected");
    enpassant = null;
    hideHints();
}

// Add move to moves array
function addToMoves(opponentPiece,selectedPiece,Postion,flipped){
    let move,actualPostion

    // Making the actualPosition be consistant wether flipped or not
    if (flipped) {
        actualPostion = Postion.split("-")[1];
    }else{
        actualPostion = Postion;
    }

    if (opponentPiece) {
        CapturedPieces.push(opponentPiece.classList[2]);
        if(selectedPiece.classList[2][1] == "p"){
            if (flipped) {
                move = `${selectedPiece.classList[1].split("-")[1][0]}x${actualPostion}`
            }else{
                move = `${selectedPiece.classList[1][0]}x${actualPostion}`
            }
        }else{
            move = `${selectedPiece.classList[2][1].toUpperCase()}x${actualPostion}`;
        }
        opponentPiece.remove();
    }else{
        if(selectedPiece.classList[2][1] == "p"){
            move = actualPostion;
        }else{
            move = selectedPiece.classList[2][1].toUpperCase()+actualPostion;
        }
    }
    moves.push(move);
}