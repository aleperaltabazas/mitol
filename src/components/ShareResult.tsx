import { CopyButton } from './CopyButton'
import { ResultDetails } from './ResultDetails'

interface ShareResultProps {
  shareText: string
  answer: string
  description: string
  imageUrl?: string
}

export function ShareResult({ shareText, answer, description, imageUrl }: ShareResultProps) {
  return (
    <div className="share-result">
      <ResultDetails shareText={shareText} answer={answer} description={description} imageUrl={imageUrl} />
      <div className="actions-row">
        <CopyButton shareText={shareText} />
      </div>
    </div>
  )
}
