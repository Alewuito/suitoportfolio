// Shared section heading: eyebrow, Archivo title, optional lead.
const SIZES = {
  lg: 'mt-4 t-5',
  sm: 'mt-3 t-4',
}

export default function SectionHead({ eyebrow, title, lead, id, size = 'lg' }) {
  return (
    <div data-group className="max-w-3xl">
      {eyebrow && (
        <p data-reveal className="eyebrow">
          {eyebrow}
        </p>
      )}
      <h2 id={id} data-split className={`display display--wrap ${eyebrow ? SIZES[size] : SIZES[size].replace(/mt-\d/, 'mt-0')}`}>
        {title}
      </h2>
      {lead && (
        <p data-reveal className="mt-5 max-w-xl text-base leading-relaxed">
          {lead}
        </p>
      )}
    </div>
  )
}
