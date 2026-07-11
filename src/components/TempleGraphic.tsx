// Derived from "Greek temple.svg" by Raymond1922A (Wikimedia Commons),
// licensed CC BY-SA 3.0: https://commons.wikimedia.org/wiki/File:Greek_temple.svg
// Simplified and recolored to use the site's theme variables.
export function TempleGraphic({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 748.46875 616.34375"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g
        transform="translate(2.0625,-138.90625)"
        style={{ fill: 'var(--marble)', stroke: 'var(--gold)', strokeWidth: 2.4, strokeLinejoin: 'round' }}
      >
        {/* pediment */}
        <path d="m 6.1877685,334.93315 730.7666115,0 -365.3833,-195.33127 z" />
        <path d="m 75.454821,316.41832 592.232509,0 -296.11625,-158.3016 z" />

        {/* entablature steps */}
        <g transform="matrix(1.0510102,0,0,0.99995908,25.961778,0.01829536)">
          <rect x="-22.820341" y="698.93066" width="704.20508" height="7.0191512" />
          <rect x="-20.001213" y="691.86835" width="697.76917" height="6.9943771" />
          <rect x="-16.768015" y="684.54028" width="691.30273" height="7.005547" />
          <rect x="-13.073731" y="677.586" width="684.34363" height="6.9695764" />
          <rect x="-9.6530695" y="670.59479" width="677.15875" height="6.9862766" />
          <rect x="-5.9611864" y="663.36096" width="669.60321" height="7.0017328" />
          <rect x="-2.0772591" y="656.42053" width="662.06732" height="6.9300261" />
        </g>

        {/* columns */}
        {[0, 212.15311, 424.30621, 636.45932].map((offset, i) => (
          <g key={i} transform={`translate(${offset},0)`}>
            <path d="m 29.17581,372.36671 49.826505,0 c 0,0 3.977527,124.14952 3.772002,155.15954 -0.30474,45.97965 0.514638,128.4226 0.514638,128.4226 l -59.611987,0 c 0,0 -0.599043,-82.85774 0.530318,-127.68529 0.775817,-30.79435 4.968524,-155.89685 4.968524,-155.89685 z" />
            <rect x="6.2168694" y="334.89636" width="94.373444" height="22.100552" />
            <path d="m 6.9137804,357.13485 92.8327246,0 -20.763454,15.29412 -49.653674,0 z" />
          </g>
        ))}

        {/* base */}
        <rect x="-1.4395416" y="705.8114" width="373.61234" height="48.800392" />
        <rect x="372.17688" y="705.8114" width="373.60715" height="48.8004" />
      </g>
    </svg>
  )
}
