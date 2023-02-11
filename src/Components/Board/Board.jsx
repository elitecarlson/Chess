import { useEffect } from "react";
import "../../Assets/css/Board.css";
export default function Chessboard(){
    useEffect(() => {
        const allPieces = Array.from(
          document.getElementsByClassName('piece')
        );
        console.log(allPieces);
        // allPieces.addEve
      }, []);
    return(
        <>
        <div className='board'>
            <div className='piece wr square-a1'/>
            <div className='piece wn square-b1'/>
            <div className='piece wb square-c1'/>
            <div className='piece wq square-d1'/>
            <div className='piece wk square-e1'/>
            <div className='piece wb square-f1'/>
            <div className='piece wn square-g1'/>
            <div className='piece wr square-h1'/>
            <div className='piece wp square-a2'/>
            <div className='piece wp square-b2'/>
            <div className='piece wp square-c2'/>
            <div className='piece wp square-d2'/>
            <div className='piece wp square-e2'/>
            <div className='piece wp square-f2'/>
            <div className='piece wp square-g2'/>
            <div className='piece wp square-h2'/>
            <div className='piece br square-a8'/>
            <div className='piece bn square-b8'/>
            <div className='piece bb square-c8'/>
            <div className='piece bq square-d8'/>
            <div className='piece bk square-e8'/>
            <div className='piece bb square-f8'/>
            <div className='piece bn square-g8'/>
            <div className='piece br square-h8'/>
            <div className='piece bp square-a7'/>
            <div className='piece bp square-b7'/>
            <div className='piece bp square-c7'/>
            <div className='piece bp square-d7'/>
            <div className='piece bp square-e7'/>
            <div className='piece bp square-f7'/>
            <div className='piece bp square-g7'/>
            <div className='piece bp square-h7'/>
        </div>
        </>
        );
}