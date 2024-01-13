import { getValidRookMoves } from "./RookMovement";
import { hideHints } from "./Constants";
import { getValidBishopMoves } from "./BishopMovement";
import { getValidQueenMoves } from "./QueenMovement";
import { getValidKnightMoves } from "./KnightMovement";
import { getValidPawnMoves } from "./PawnMovement";
import { getValidKingMoves } from "./KingMovement";

export function pieceClicked(board,flipped){
    const piecePosition = event.target.classList[1];
    const piece = event.target.classList[2];
    const selectedPiece = document.querySelector(`.${piecePosition}`);
    const selectedPieces = document.querySelector(".selected");

    // If already selected then deselect
    if(selectedPiece.classList.contains("selected")){
        selectedPieces.classList.remove("selected");
        hideHints();
    }else{
        // Prevent selecting multiple pieces
        if (selectedPieces) {
            selectedPieces.classList.remove("selected");
            hideHints();
        }
        // selected piece
        selectedPiece.classList.add("selected");
        if (piece[1] == 'r') {
            getValidRookMoves(piecePosition,piece,board,flipped); //if piece is rook
        }else if(piece[1] == 'b'){
            getValidBishopMoves(piecePosition,piece,board,flipped); //if piece is bishop
        }else if(piece[1] == 'q'){
            getValidQueenMoves(piecePosition,piece,board,flipped); //if piece is queen
        }else if(piece[1] == 'n'){
            getValidKnightMoves(piecePosition,piece,board,flipped); //if piece is knight
        }else if(piece[1] == 'p'){
            getValidPawnMoves(piecePosition,piece,board,flipped); //if piece is pawn
        }else if(piece[1] == 'k'){
            getValidKingMoves(piecePosition,piece,board,flipped); //if piece is king
        }
    }
}