import { marked } from 'marked'

interface ResultDetailsProps {
  shareText: string
  answer: string
  description: string
  imageUrl?: string
}

export function ResultDetails({ shareText, answer, description, imageUrl }: ResultDetailsProps) {
  return (
    <>
      {imageUrl && <img className="result-image" src={imageUrl} alt={answer} />}
      <p>
        La respuesta era: <strong>{answer}</strong>
      </p>
      <div
        className="result-description"
        dangerouslySetInnerHTML={{ __html: marked.parse(description, { async: false }) }}
      />
      <pre>{shareText}</pre>
    </>
  )
}
