interface ShareResultProps {
  shareText: string
  answer: string
}

export function ShareResult({ shareText, answer }: ShareResultProps) {
  return (
    <div className="share-result">
      <pre>{shareText}</pre>
      <p>
        La respuesta era: <strong>{answer}</strong>
      </p>
      <button type="button" onClick={() => navigator.clipboard.writeText(shareText)}>
        Copiar resultado
      </button>
    </div>
  )
}
