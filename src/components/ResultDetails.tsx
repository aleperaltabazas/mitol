import { marked } from 'marked'

interface ResultDetailsProps {
  answer: string
  description: string
  imageUrl?: string
}

export function ResultDetails({ answer, description, imageUrl }: ResultDetailsProps) {
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
    </>
  )
}
