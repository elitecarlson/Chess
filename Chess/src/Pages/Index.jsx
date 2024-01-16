import "../assets/css/index.css"
import "../assets/css/Board.css"
import { useEffect, useRef, useState } from "react";
import { RenderPieces } from "../Core/RenderPieces";
import Promotion from "../Components/Promotion";

export default function Index(){
    const body = useRef();
    const board = useRef();
    const [flipped, setFlipped] = useState(false);
    const [startingPosition, setStartingPosition] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1

    // useEffect(()=>{
    //     RenderPieces(board,startingPosition,flipped);
    // },[startingPosition]);
    
    return(
        <>
        <div className="body" ref={body}>
            <div className="board" ref={board}>
                <Promotion flipped={flipped}/>
            </div>
        </div>
        </>
    );
}