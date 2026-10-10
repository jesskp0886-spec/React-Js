export default function Dish({ title, price, contents }) {
  return (
    <div className="dish">
      <div className="dish_title_container d-flex flex-xl-row flex-column align-items-start justify-content-start">
        <div className="dish_title">{title}</div>
        <div className="dish_price">{price}</div>
      </div>
      <div className="dish_contents">
        <ul className="d-flex flex-row align-items-start justify-content-start flex-wrap">
          {contents.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
      <div className="dish_order">
        <a href="#order" onClick={(e) => e.preventDefault()}>
          Order Now
        </a>
      </div>
    </div>
  );
}
