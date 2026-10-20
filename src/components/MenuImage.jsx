export function MenuImage({
  src,
  alt,
  className = '',
  priority = false,
  width = 800,
  height = 600,
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'low'}
      draggable="false"
    />
  );
}
