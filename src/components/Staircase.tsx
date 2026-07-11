// Derived from "Greek temple.svg" by Raymond1922A (Wikimedia Commons),
// licensed CC BY-SA 3.0: https://commons.wikimedia.org/wiki/File:Greek_temple.svg
// Simplified and recolored to use the site's theme variables. Bottom slice
// of the temple facade (steps + a slim plinth) — top edge touches Column's
// shaft base.
export function Staircase({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 516.3 748.46875 72"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g
        transform="translate(2.0625,-138.90625)"
        style={{ fill: 'var(--marble)', stroke: 'var(--gold)', strokeWidth: 2.4, strokeLinejoin: 'round' }}
      >
        <g transform="matrix(1.0510102,0,0,0.99995908,25.961778,0.01829536)">
          <rect x="-22.820341" y="698.93066" width="704.20508" height="7.0191512" />
          <rect x="-20.001213" y="691.86835" width="697.76917" height="6.9943771" />
          <rect x="-16.768015" y="684.54028" width="691.30273" height="7.005547" />
          <rect x="-13.073731" y="677.586" width="684.34363" height="6.9695764" />
          <rect x="-9.6530695" y="670.59479" width="677.15875" height="6.9862766" />
          <rect x="-5.9611864" y="663.36096" width="669.60321" height="7.0017328" />
          <rect x="-2.0772591" y="656.42053" width="662.06732" height="6.9300261" />
        </g>
        <rect x="-1.4395416" y="705.8114" width="373.61234" height="20" />
        <rect x="372.17688" y="705.8114" width="373.60715" height="20" />
      </g>
    </svg>
  )
}
