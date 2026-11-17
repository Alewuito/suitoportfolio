import { ArrowUpRight } from './icons'

// The Ous pill CTA: cream pill, ink arrow circle that rotates 45° on hover.
// Pass `icon` for a non-arrow glyph (it scales instead of rotating).
export default function Pill({ as: Tag = 'a', children, ghost, small, icon, external, className = '', ...rest }) {
  const ext = external ? { target: '_blank', rel: 'noreferrer noopener' } : null
  const classes = ['pill', ghost && 'pill--ghost', small && 'pill--sm', icon && 'pill--plain', className]
    .filter(Boolean)
    .join(' ')
  return (
    <Tag className={classes} {...ext} {...rest}>
      <span>{children}</span>
      <span className="pill-arrow" aria-hidden="true">
        {icon ?? <ArrowUpRight />}
      </span>
    </Tag>
  )
}
