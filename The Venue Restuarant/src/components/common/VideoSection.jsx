import { useEffect, useState } from 'react';

const VIDEO_URL = 'https://player.vimeo.com/video/99340873?autoplay=1&loop=1&title=0&autopause=0';

export default function VideoSection() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="video_section">
      <div className="background_image" style={{ backgroundImage: 'url(/images/video.jpg)' }}></div>
      <div className="video_section_content d-flex flex-column align-items-center justify-content-center text-center">
        <div className="video_section_title">Food for the soul</div>
        <div className="video_section_icon">
          <a
            className="vimeo video_button"
            href={VIDEO_URL}
            onClick={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
            aria-label="Play video"
          >
            <i className="fa fa-play" aria-hidden="true"></i>
          </a>
        </div>
      </div>

      {open && (
        <div
          className="video_modal"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div className="video_modal_inner" onClick={(e) => e.stopPropagation()}>
            <button className="video_modal_close" onClick={() => setOpen(false)} aria-label="Close video">
              &times;
            </button>
            <iframe
              src={VIDEO_URL}
              title="Food for the soul"
              allow="autoplay; fullscreen"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
