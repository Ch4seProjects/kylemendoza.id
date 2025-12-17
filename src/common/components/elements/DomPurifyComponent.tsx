import DOMPurify from 'isomorphic-dompurify';

export default function DomPurifyComponent({
  htmlContent,
}: {
  htmlContent: string;
}) {
  const cleanHTML = DOMPurify.sanitize(htmlContent, {
    ALLOWED_TAGS: [
      'p',
      'br',
      'strong',
      'em',
      'u',
      'h1',
      'h2',
      'h3',
      'h4',
      'ul',
      'ol',
      'li',
      'a',
      'img',
      'blockquote',
      'pre',
      'code',
      'figure',
      'figcaption',
      'iframe',
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel'],
  });

  return (
    <article
      className='medium-content prose prose-lg max-w-none'
      dangerouslySetInnerHTML={{ __html: cleanHTML }}
    />
  );
}
