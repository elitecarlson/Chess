export const files = ['a','b','c','d','e','f','g','h'];
export const CapturedPieces = [];
const moves = [];

//Remove all hints and capture hints
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

// Show hints
export function renderHints(validMoves,validCaptures,board,position,flipped){
    // Render Captureable piece
    validCaptures.forEach(validCapture => {
        const capture = document.createElement('div');
        const actualPostion = flipped ? `flipped-${validCapture}` : validCapture;
        capture.className = `capture ${actualPostion}`;
        capture.addEventListener('click', ()=>{hintActivated(position,validCapture,flipped)});
        capture.addEventListener('dragover', (e)=>{e.preventDefault()})
        capture.addEventListener('drop', ()=>{
            hintActivated(position,validCapture,flipped);
            document.querySelector('.'+actualPostion).style.transition = "0s";
        });
        board.current.appendChild(capture);
    });

    // Render available hint positions
    validMoves.forEach(validMove => {
        const hint = document.createElement('div');
        const actualPostion = flipped ? `flipped-${validMove}` : validMove;
        hint.className = `hint ${actualPostion}`;
        hint.addEventListener('click', ()=>{hintActivated(position,validMove,flipped)});
        hint.addEventListener('dragover', (e)=>{e.preventDefault()})
        hint.addEventListener('drop', ()=>{
            hintActivated(position,validMove,flipped);
            document.querySelector('.'+actualPostion).style.transition = "0s";
        });
        board.current.appendChild(hint);
    });
}

// Runs when hint is clicked or piece is dropped on hint
function hintActivated(position,hintPosition,flipped){
    const actualPostion = flipped ? `flipped-${hintPosition}` : hintPosition;
    const opponentPiece = document.getElementsByClassName(`piece ${actualPostion}`)[0];
    const selectedPiece = document.querySelector(`.${position}`);
    addToMoves(opponentPiece,selectedPiece,actualPostion,flipped);
    selectedPiece.classList.replace(position,actualPostion);
    selectedPiece.classList.remove("selected");
    hideHints();
}

// Add move to moves array
function addToMoves(opponentPiece,selectedPiece,Postion,flipped){
    let move,actualPostion

    if (flipped) {
        actualPostion = Postion.split("-")[1];
    }else{
        actualPostion = Postion;
    }

    if (opponentPiece) {
        CapturedPieces.push(opponentPiece.classList[2]);
        if(selectedPiece.classList[2][1] == "p"){
            move = `${selectedPiece.classList[1][0]}x${actualPostion}`
        }else{
            move = `${selectedPiece.classList[2][1].toUpperCase()}x${actualPostion}`;
        }
        opponentPiece.remove();
    }else{
        if(selectedPiece.classList[2][1] == "p"){
            move = actualPostion;
        }else{
            move = selectedPiece.classList[2][1].toUpperCase()+actualPostion;
        }
    }
    moves.push(move);
}