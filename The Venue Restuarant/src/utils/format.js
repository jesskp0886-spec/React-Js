export const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

export const splitParagraphs = (text = '') =>
  text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
