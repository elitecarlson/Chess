import addToMoves from "./AlgebricNotation";
import { CapturedPieces, enpassant, hideHints, modifyenpassant, moves, playedMove } from "./Constants";

export default function PlayMove(flipped,hintPosition,position,piece) {
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
    modifyenpassant(null);
    hideHints();
}