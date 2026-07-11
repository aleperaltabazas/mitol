// Derived from "Greek temple.svg" by Raymond1922A (Wikimedia Commons),
// licensed CC BY-SA 3.0: https://commons.wikimedia.org/wiki/File:Greek_temple.svg
// Simplified and recolored to use the site's theme variables. A single
// column, meant to be rendered twice (the second mirrored via CSS
// `scaleX(-1)`) flanking the title. Capital touches Pediment's underside;
// shaft base touches Staircase's top.
export function Column({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="6.5 195 98 324"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g
        transform="translate(2.0625,-138.90625)"
        style={{ fill: 'var(--marble)', stroke: 'var(--gold)', strokeWidth: 3.6, strokeLinejoin: 'round' }}
      >
        <path d="m 29.17581,372.36671 49.826505,0 c 0,0 3.977527,124.14952 3.772002,155.15954 -0.30474,45.97965 0.514638,128.4226 0.514638,128.4226 l -59.611987,0 c 0,0 -0.599043,-82.85774 0.530318,-127.68529 0.775817,-30.79435 4.968524,-155.89685 4.968524,-155.89685 z" />
        <rect x="6.2168694" y="334.89636" width="94.373444" height="22.100552" />
        <path d="m 6.9137804,357.13485 92.8327246,0 -20.763454,15.29412 -49.653674,0 z" />
      </g>
    </svg>
  )
}
