export default function PageHero({ image, subtitle, title, text, scrollIcon = false }) {
  return (
    <div className="home">
      <div
        className="parallax_background parallax-window"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      ></div>
      <div className="home_container">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="home_content text-center">
                <div className="home_subtitle page_subtitle">{subtitle}</div>
                <div className="home_title">
                  <h1>{title}</h1>
                </div>
                {text && (
                  <div className="home_text ml-auto mr-auto">
                    <p>{text}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {scrollIcon && <div className="scroll_icon"></div>}
    </div>
  );
}
