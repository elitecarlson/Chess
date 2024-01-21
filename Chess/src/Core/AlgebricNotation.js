import { CapturedPieces, moves } from "./Constants";

export default function addToMoves(opponentPiece,selectedPiece,Postion,flipped){
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