// Shared section heading: index + eyebrow, big Archivo title, optional lead.
const SIZES = {
  lg: 'mt-5 text-[clamp(3rem,9vw,8rem)]',
  sm: 'mt-4 text-[clamp(2.6rem,5.5vw,4.75rem)]',
}

export default function SectionHead({ index, eyebrow, title, lead, id, size = 'lg' }) {
  return (
    <div data-group className="max-w-4xl">
      <p data-reveal className="eyebrow">
        {index} — {eyebrow}
      </p>
      <h2 id={id} data-split className={`display ${SIZES[size]}`}>
        {title}
      </h2>
      {lead && (
        <p data-reveal className="mt-7 max-w-xl text-base leading-relaxed sm:text-lg">
          {lead}
        </p>
      )}
    </div>
  )
}
