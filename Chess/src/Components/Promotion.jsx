import '../assets/css/Components/Promotion.css';

export default function Promotion(props){
    if (props.flipped) {
        <div className='PromotionDiv b8'>
            <div className="promotion-piece black-queen"></div>
            <div className="promotion-piece black-rook"></div>
            <div className="promotion-piece black-bishop"></div>
            <div className="promotion-piece black-knight"></div>
            <div className="closeBTN">
                <div className="closingBUTTON"></div>
            </div>
        </div>
    }else{
        return( 
        <div className='PromotionDiv b8'>
            <div className="promotion-piece white-queen"></div>
            <div className="promotion-piece white-rook"></div>
            <div className="promotion-piece white-bishop"></div>
            <div className="promotion-piece white-knight"></div>
            <div className="closeBTN">
                <div className="closingBUTTON"></div>
            </div>
        </div>
        );
    }
}