import Rating from '../common/Rating';

export default function SignatureDish({ name, price, image, list }) {
  return (
    <div className="sig_dish">
      <div className="row row-eq-height">
        <div className="col-lg-6 sig_col d-flex flex-column align-items-start justify-content-center">
          <div className="sig_content">
            <Rating className="sig_rating" />
            <div className="sig_name_container d-flex flex-row align-items-start justify-content-start">
              <div className="sig_name">{name}</div>
              <div className="sig_price ml-auto">{price}</div>
            </div>
            <div className="sig_content_list">
              <ul className="d-flex flex-row align-items-center justify-content-start">
                {list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="button sig_button trans_200">
              <a href="#order" onClick={(e) => e.preventDefault()}>
                Order Now
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-6 sig_col">
          <div className="sig_image">
            <img src={image} alt={name} />
          </div>
        </div>
      </div>
    </div>
  );
}
