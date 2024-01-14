export const files = ['a','b','c','d','e','f','g','h'];
export const CapturedPieces = [];

export function hideHints(){
    // Remove hints
    const visibleHints = document.querySelectorAll('.hint');
    visibleHints.forEach(hint => {
        hint.remove();
    });

    // Remove captures
    const visibleCaptures = document.querySelectorAll('.capture');
    visibleCaptures.forEach(capture => {
        capture.remove();
    })
}

export function renderHints(validMoves,validCaptures,board,position,flipped){
    // Render Captureable piece
    validCaptures.forEach(validCapture => {
        const capture = document.createElement('div');
        const actualPostion = flipped ? `flipped-${validCapture}` : validCapture;
        capture.className = `capture ${actualPostion}`;
        capture.addEventListener('click', ()=>{hintClicked(position,validCapture,flipped)});
        capture.addEventListener('dragover', (e)=>{e.preventDefault()})
        capture.addEventListener('drop', ()=>{
            hintClicked(position,validCapture,flipped);
            document.querySelector('.'+validCapture).style.transition = "0s";
        });
        board.current.appendChild(capture);
    });

    // Render available hint positions
    validMoves.forEach(validMove => {
        const hint = document.createElement('div');
        const actualPostion = flipped ? `flipped-${validMove}` : validMove;
        hint.className = `hint ${actualPostion}`;
        hint.addEventListener('click', ()=>{hintClicked(position,validMove,flipped)});
        hint.addEventListener('dragover', (e)=>{e.preventDefault()})
        hint.addEventListener('drop', ()=>{
            hintClicked(position,validMove,flipped);
            document.querySelector('.'+validMove).style.transition = "0s";
        });
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