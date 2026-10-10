export default function IntroSection({ images, imageColClass }) {
  return (
    <div className="intro">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="intro_content">
              <div className="intro_subtitle page_subtitle">Something new</div>
              <div className="intro_title">
                <h2>An Extraordinery Experience</h2>
              </div>
              <div className="intro_text">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada lorem maximus mauris
                  scelerisque, at rutrum nulla dictum. Ut ac ligula sapien. Suspendisse cursus faucibus finibus. Ut
                  non justo eleifend, facilisis nibh ut, interdum odio. Suspendisse potenti. Vivamus luctus diam eu
                  neque rutrum, vitae aliquet dolor venenatis. Nulla consequat fringilla massa.
                </p>
              </div>
            </div>
            <div className="row">
              {images.map((src) => (
                <div key={src} className={`${imageColClass} intro_col`}>
                  <div className="intro_image">
                    <img src={src} alt="The Venue" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
