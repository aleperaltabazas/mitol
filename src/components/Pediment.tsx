// Derived from "Greek temple.svg" by Raymond1922A (Wikimedia Commons),
// licensed CC BY-SA 3.0: https://commons.wikimedia.org/wiki/File:Greek_temple.svg
// Simplified and recolored to use the site's theme variables. Top slice of
// the temple facade — sits directly on top of Column's capitals.
export function Pediment({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 748.46875 197.5"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g
        transform="translate(2.0625,-138.90625)"
        style={{ fill: 'var(--marble)', stroke: 'var(--gold)', strokeWidth: 2.4, strokeLinejoin: 'round' }}
      >
        <path d="m 6.1877685,334.93315 730.7666115,0 -365.3833,-195.33127 z" />
        <path d="m 75.454821,316.41832 592.232509,0 -296.11625,-158.3016 z" />
      </g>
    </svg>
  )
}
