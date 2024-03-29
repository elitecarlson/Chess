import { pieceClicked } from "./PieceClicked";
import { files } from "./Constants";

export let castlingRights;
export function setCastlingRights( value ) { castlingRights = value; }
export function RenderPieces(board,startingPosition,flipped){
    setCastlingRights(startingPosition.split(" ")[2]);
    const pieceFEN = {
        "r" : "br",
        "n" : "bn",
        "b" : "bb",
        "q" : "bq",
        "k" : "bk",
        "p" : "bp",
        "R" : "wr",
        "N" : "wn",
        "B" : "wb",
        "Q" : "wq",
        "K" : "wk",
        "P" : "wp",
    }
    board.current.innerHTML = '';
    const pieces = startingPosition.split(" ")[0];
    let file = 0, rank = 8;
    pieces.split("").forEach(char => {
        if (char == "/") {
            file = 0;
            rank--;
        }else{
            // Checking if character is a number
            if(!isNaN(char)){
                file += parseInt(char);
            }else{
                const piecePosition = files[file]+rank;
                const piece = pieceFEN[char];

                // Setting classname on wether board is flipped or not.
                let piececlassName
                if (flipped) {
                    piececlassName = `piece flipped-${piecePosition} ${piece}`;
                }else{
                    piececlassName = `piece ${piecePosition} ${piece}`;
                }

                // Adding the piece to board
                const pieceDiv = document.createElement("div");
                pieceDiv.draggable = true;
                pieceDiv.addEventListener('dragstart', ()=>{
                    pieceClicked(board,flipped);
                    pieceDiv.classList.add("no-transition");
                });
                pieceDiv.addEventListener('dragend', ()=>{
                    pieceDiv.classList.remove("no-transition");
                })
                pieceDiv.addEventListener('click', ()=>{pieceClicked(board,flipped)});
                pieceDiv.className = piececlassName;
                board.current.appendChild(pieceDiv);
                file++;
            }
        }
    });
}