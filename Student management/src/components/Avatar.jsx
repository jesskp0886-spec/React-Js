// Shows the student's photo, or their initials when there is no photo.
export default function Avatar({ name = '', image, size = 40 }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

  const style = { width: size, height: size, fontSize: size * 0.38 };

  if (image) {
    return <img src={image} alt={name} className="avatar" style={style} />;
  }
  return (
    <span className="avatar avatar-initials" style={style} aria-label={name}>
      {initials || '?'}
    </span>
  );
}
