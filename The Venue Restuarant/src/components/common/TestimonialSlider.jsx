import { useEffect, useState } from 'react';
import { testimonials } from '../../data/menuData';

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[index];
  return (
    <div className="test_slider_container">
      <div className="text-center">
        <div className="quote ml-auto mr-auto">
          <img src="/images/quote.png" alt="" />
        </div>
        <div className="test_text">
          <p>{t.text}</p>
        </div>
        <div className="test_info">
          {t.name}, <span>{t.role}</span>
        </div>
        <div className="slider_dots" role="tablist">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={i === index ? 'active' : ''}
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial ${i + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}
