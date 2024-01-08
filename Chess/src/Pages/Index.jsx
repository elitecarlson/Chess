import "../assets/css/index.css"
import "../assets/css/Board.css"
export default function Index(){
    function RenderPieces(){
        const startingPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
        const files = ["a","b","c","d","e","f","g","h"];
        const pieceFEN = {
            "r" : "br",
            "n" : "bn",
            "b" : "bb",
            "q" : "bq",
            "k" : "bk",
            "p" : "bp",
            "R" : "br",
            "N" : "wn",
            "B" : "wb",
            "Q" : "wq",
            "K" : "wk",
            "P" : "wp",
        }
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
                    // const piece = JSON.parse(pieceFEN.char);
                    // console.log(piece)
                    file++
                }
            }
        });
    }
    RenderPieces();
    return(
        <>
        <div className="body">
            <div className="board">
                <div className="square"></div>
            </div>
        </div>
        </>
    );
}