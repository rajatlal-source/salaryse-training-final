import Card from './Card'
import Button from './Button'
import React from 'react'

export type QuizQ = {
  id: string
  q: string
  options: string[]
  correct: number
  rationale: string
}

export default function Quiz({
  items,
  onComplete,
  autoAdvanceMs = 1200, // auto-go to next module after this delay on final Q
}: {
  items: QuizQ[]
  onComplete: () => void
  autoAdvanceMs?: number
}) {
  const [ix, setIx] = React.useState(0)
  const [sel, setSel] = React.useState<number | null>(null)
  const [correctCount, setCorrectCount] = React.useState(0)
  const [finished, setFinished] = React.useState(false)

  const q = items[ix]

  const choose = (i: number) => {
    if (sel !== null) return // lock after selecting
    setSel(i)
    if (i === q.correct) setCorrectCount((c) => c + 1)
  }

  const next = () => {
    if (sel === null) return // must select first
    if (ix === items.length - 1) {
      setFinished(true)
      // Auto-advance to next module after a short delay
      const t = setTimeout(onComplete, autoAdvanceMs)
      return () => clearTimeout(t)
    } else {
      setIx((n) => n + 1)
      setSel(null)
    }
  }

  const scorePct = Math.round((correctCount / items.length) * 100)

  return (
    <Card>
      <div className="space-y-4">
        <div className="text-sm opacity-80">Question {ix + 1}/{items.length}</div>
        <div className="text-lg font-semibold">{q.q}</div>

        <div className="space-y-2">
          {q.options.map((opt, i) => {
            const isCorrect = sel !== null && i === q.correct
            const isWrong = sel !== null && i === sel && i !== q.correct
            return (
              <button
                key={i}
                onClick={() => choose(i)}
                className={`w-full text-left px-3 py-2 rounded-lg border transition
                  ${sel === null ? 'border-white/10 hover:border-white/30' : 'border-white/10'}
                  ${isCorrect ? 'bg-green-600/20 border-green-400/40' : ''}
                  ${isWrong ? 'bg-red-600/10 border-red-400/40' : ''}`}
              >
                {opt}
              </button>
            )
          })}
        </div>

        {sel !== null && (
          <div className="text-sm opacity-80">
            {sel === q.correct ? 'Correct! ' : 'Not quite. '} {q.rationale}
          </div>
        )}

        <div className="pt-2 flex items-center gap-3">
          {sel !== null && (
            <Button onClick={next}>
              {ix === items.length - 1 ? 'Finish' : 'Next'}
            </Button>
          )}
          {/* Manual fallback button after finishing (in case you don't want auto-advance) */}
          {finished && (
            <button
              className="text-sm underline opacity-80 hover:opacity-100"
              onClick={onComplete}
            >
              Next module →
            </button>
          )}
        </div>

        {/* Live score display */}
        <div className="text-sm opacity-70 pt-1">Score: {scorePct}%</div>
      </div>
    </Card>
  )
}
