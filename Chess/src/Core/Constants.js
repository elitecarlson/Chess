export const files = ['a','b','c','d','e','f','g','h'];
export const CapturedPieces = [];

export function hideHints(){
    const visibleHints = document.querySelectorAll('.hint');
        visibleHints.forEach(hint => {
            hint.remove();
        });
}

export function renderHints(validMoves,board,position,flipped){
    validMoves.forEach(validMove => {
        const hint = document.createElement('div');
        const actualPostion = flipped ? `flipped-${validMove}` : validMove;
        hint.className = `hint ${actualPostion}`;
        hint.addEventListener('click', ()=>{hintClicked(position,validMove,flipped)});
        board.current.appendChild(hint);
    });
}

function hintClicked(position,hintPosition,flipped){
    const actualPostion = flipped ? `flipped-${hintPosition}` : hintPosition;
    const opponentPiece = document.getElementsByClassName(`piece ${actualPostion}`)[0];
    if (opponentPiece) {
        CapturedPieces.push(opponentPiece.classList[2]);
        opponentPiece.remove();
    }
    const selectedPiece = document.querySelector(`.${position}`);
    selectedPiece.classList.replace(position,actualPostion);
    selectedPiece.classList.remove("selected");
    hideHints();
}