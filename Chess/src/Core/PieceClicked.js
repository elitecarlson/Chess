import { getValidRookMoves } from "./RookMovement";
import { hideHints } from "./Constants";
import { getValidBishopMoves } from "./BishopMovement";
import { getValidQueenMoves } from "./QueenMovement";

export function pieceClicked(board){
    const piecePosition = event.target.classList[1];
    const piece = event.target.classList[2];
    const selectedPiece = document.querySelector(`.${piecePosition}`);

    // if selected piece is already selected deselect else select
    if (selectedPiece.classList.contains("selected")) {
        selectedPiece.classList.remove("selected");
        hideHints();
    }else{
        selectedPiece.classList.add("selected");
        if (piece[1] == 'r') {
            getValidRookMoves(piecePosition,piece,board); //if piece is rook
        }else if(piece[1] == 'b'){
            getValidBishopMoves(piecePosition,piece,board); //if piece is bishop
        }else if(piece[1] == 'q'){
            getValidQueenMoves(piecePosition,piece,board); //if piece is queen
        }
    }
}