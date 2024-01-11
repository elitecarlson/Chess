export const files = ['a','b','c','d','e','f','g','h'];
export const CapturedPieces = [];
export const hints = [];

export function hideHints(){
    const visibleHints = document.querySelectorAll('.hint');
        visibleHints.forEach(hint => {
            hint.remove();
        });
    hints.length = 0;
}

export function renderHints(validMoves,board,position){
    validMoves.forEach(validMove => {
        const hint = document.createElement('div');
        hint.className = `hint ${validMove}`;
        hint.addEventListener('click', ()=>{hintClicked(position,validMove)});
        board.current.appendChild(hint);
    });
}

function hintClicked(position,hintPosition){
    const opponentPiece = document.getElementsByClassName(`piece ${hintPosition}`)[0];
    if (opponentPiece) {
        CapturedPieces.push(opponentPiece.classList[2]);
        opponentPiece.remove();
    }
    const selectedPiece = document.querySelector(`.${position}`);
    selectedPiece.classList.replace(position,hintPosition);
    selectedPiece.classList.remove("selected");
    hideHints();
}