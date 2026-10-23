/**
 * SectionCard — a titled card section wrapper used throughout the app.
 */
export default function SectionCard({ title, subtitle, children, action, className = '' }) {
  return (
    <div className={`card ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          <div>
            {title && <h2 className="font-semibold text-navy-900 text-base">{title}</h2>}
            {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  )
}
