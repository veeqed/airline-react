import "../assets/css/card.css"

export type CardModel = {
  card_id: number,
  title: string,
  description: string,
  image_url: string,
}

export interface CardProps {
  card: CardModel;
}

export function CardDemo(props: CardProps) {

  const card = props.card;

  return (
    <div className="mycard">
      <div>
        <img src={card.image_url} />
      </div>
      <div className="title">
        {card.title}
      </div>
      <div className="body">
        {card.description}
      </div>
      <div className="footer">
        <button type="button" className="readmore">Read More</button>
      </div>
    </div>
    
  );
}

export default CardDemo;
