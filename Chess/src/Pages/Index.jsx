import "../assets/css/index.css"
import "../assets/css/Board.css"
import { useEffect, useRef, useState } from "react";

export default function Index(){
    const body = useRef();
    const board = useRef();
    const [flipped, setFlipped] = useState(false);
    const [startingPosition, setStartingPosition] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    
    function RenderPieces(){
        const files = ["a","b","c","d","e","f","g","h"];
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
                if(!isNaN(char)){
                    file += parseInt(char);
                }else{
                    const piecePosition = files[file]+rank;
                    const piece = pieceFEN[char];
                    
                    let piececlassName
                    if (flipped) {
                        piececlassName = `square flipped-${piecePosition} ${piece}`;
                    }else{
                        piececlassName = `square ${piecePosition} ${piece}`;
                    }

                    const pieceDiv = document.createElement("div");
                    pieceDiv.className = piececlassName;
                    board.current.appendChild(pieceDiv)
                    file++
                }
            }
        });
    }
    
    useEffect(()=>{
        RenderPieces();
    },[startingPosition]);
    return(
        <>
        <div className="body" ref={body}>
            <div className="board" ref={board}>
            </div>
        </div>
        </>
    );
}