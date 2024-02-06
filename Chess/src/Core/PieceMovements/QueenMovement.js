import { getValidBishopMoves } from "./BishopMovement";
import { getValidRookMoves } from "./RookMovement";

export function getValidQueenMoves(position,piece,board,flipped){
    getValidRookMoves(position,piece,board,flipped);
    getValidBishopMoves(position,piece,board,flipped);
}