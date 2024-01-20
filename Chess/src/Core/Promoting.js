import { hideHints } from "./Constants";
import { pieceClicked } from "./PieceClicked";

export default function pawnPromotion(piece,board,hintPosition,flipped,position){
    const promotionPieces = ["queen","rook","bishop","knight"];
    const piecePromotionJSON = {
        "queen" : "q",
        "rook" : "r",
        "bishop" : "b",
        "knight" : "n"
    }

    // Removing hints and clicked piece
    hideHints();
    document.querySelector(`.${position}`).classList.add("hidden");;

    // setting actual postion and piece color
    let actualPosition,color;
    if (flipped) {
        actualPosition = `flipped-${hintPosition}`;
    }else{
        actualPosition = hintPosition;
    }

    if (piece[0] == 'w') {
        color = "white"
    }else if(piece[0] == 'b'){
        color = "black";
    }

    // Creating DOM elements
    const promotionDiv = document.createElement("div");
    const closeBTN = document.createElement("div");
    const closingBUTTON = document.createElement("div");

    // Assigning class names
    promotionDiv.className = `PromotionDiv ${actualPosition}`;
    closeBTN.className = "closeBTN";
    closingBUTTON.className = "closingBUTTON";

    // Creating and appending promotion pieces
    promotionPieces.forEach(piece => {
        const promotionPiece = document.createElement("div");
        promotionPiece.className = `promotion-piece ${color}-${piece}`;
        promotionPiece.addEventListener('click', ()=>{
            const promotedPiece = document.createElement("div");
            promotedPiece.draggable = true;
            promotedPiece.className = `piece ${actualPosition} ${color[0]}${piecePromotionJSON[piece]}`;
            promotedPiece.addEventListener('dragstart', ()=>{
                pieceClicked(board, flipped);
                promotedPiece.classList.add("no-transition");
            });
            promotedPiece.addEventListener('dragend', ()=>{
                promotedPiece.classList.remove("no-transition");
            })
            promotedPiece.addEventListener('click', ()=>{pieceClicked(board,flipped)});
            promotionDiv.remove();
            if (document.querySelector(`.${actualPosition}`)) {
                document.querySelector(`.${actualPosition}`).remove();
            }
            board.current.appendChild(promotedPiece);
            document.querySelector(".hidden").remove();
        });
        promotionDiv.appendChild(promotionPiece);
    });

    // Appending elements
    closeBTN.appendChild(closingBUTTON);
    promotionDiv.appendChild(closeBTN);

    closeBTN.addEventListener('click', ()=>{
        promotionDiv.remove();
        document.querySelector('.hidden').classList.remove("hidden", "selected");

    });
    board.current.appendChild(promotionDiv);
}