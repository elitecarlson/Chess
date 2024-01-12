import { getValidBishopMoves } from "./BishopMovement";
import { getValidRookMoves } from "./RookMovement";

export function getValidQueenMoves(position,piece,board){
    getValidRookMoves(position,piece,board);
    getValidBishopMoves(position,piece,board);
}