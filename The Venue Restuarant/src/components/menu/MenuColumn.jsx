import Dish from './Dish';

export default function MenuColumn({ title, dishes, image }) {
  return (
    <div className="col-lg-4 themenu_column">
      {image && (
        <div className="themenu_image">
          <img src={image} alt={title} />
        </div>
      )}
      <div className={`themenu_col ${image ? 'trans_400' : ''}`}>
        <div className="themenu_col_title">{title}</div>
        <div className="dish_list">
          {dishes.map((dish, i) => (
            <Dish key={`${dish.title}-${i}`} {...dish} />
          ))}
        </div>
      </div>
    </div>
  );
}
