import { getValidRookMoves } from "./RookMovement";
import { hideHints } from "./Constants";

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
        // Check if piece is rook
        if (piece[1] == 'r') {
            getValidRookMoves(piecePosition,piece,board);
        }
    }
}