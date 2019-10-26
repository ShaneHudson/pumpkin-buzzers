import React from 'react'

export default class QuizAdmin extends React.Component {
  componentDidMount() {
    const { currentQuiz } = this.props.match.params
    const { quizzes } = this.props
    const quiz = quizzes[currentQuiz]

    if (Object.keys(quizzes).length && !quiz) {
      this.props.history.push(`/admin/list`)
    } else if (quiz) {
      document.body.parentElement.classList.toggle(`theme-${quiz.theme}`, true)
    }
  }

  render() {
    const { currentQuiz } = this.props.match.params
    const { quizzes, teams, setQuiz, setActiveQuiz } = this.props

    const quiz = quizzes[currentQuiz] || {}

    let hasQuestion = false
    let hasBuzzed = false
    if (
      quiz.currentQuestion >= 0 &&
      quiz.currentQuestion < quiz.questions.length
    ) {
      hasQuestion = true
      hasBuzzed = quiz.questions[quiz.currentQuestion].buzzed || false
    }

    return (
      <div>
        <h1 className="quiz-title">{quiz.title}</h1>

        {!Object.values(quiz.players || {}).length && (
          <React.Fragment>
            <p>Waiting for teams to join</p>
            <button
              onClick={() => {
                setActiveQuiz(quiz.id)
              }}>
              Set Active Quiz
            </button>
          </React.Fragment>
        )}

        {Object.values(quiz.players || {}).length > 0 && (
          <React.Fragment>
            <h2>Teams</h2>
            <ul>
              {quiz.players.map(team => (
                <li key={team}>
                  <span>{team}</span>
                  {Object.keys(teams).length && teams[team].onlineState ? (
                    <span> Connected </span>
                  ) : (
                    <span> Not Connected</span>
                  )}
                </li>
              ))}
            </ul>
            {(quiz.currentQuestion === undefined ||
              quiz.currentQuestion === null ||
              quiz.currentQuestion === -1) && (
              <button
                onClick={() => {
                  setQuiz({
                    ...quiz,
                    currentQuestion: 0
                  })
                  setActiveQuiz(quiz.id)
                }}>
                Start Quiz
              </button>
            )}
            {hasQuestion && !hasBuzzed && <p>Waiting for buzzes</p>}
            {hasQuestion && hasBuzzed && (
              <React.Fragment>
                <p>
                  {quiz.questions[quiz.currentQuestion].buzzed} Buzzed first!
                  <audio
                    controls
                    autoPlay={true}
                    src={`/${quiz.theme}/${quiz.players.indexOf(
                      quiz.questions[quiz.currentQuestion].buzzed
                    ) + 1}.mp3`}
                  />
                </p>
                <p>
                  Correct answer:{' '}
                  {quiz.questions[quiz.currentQuestion].answer || ''}
                </p>
                <p>Did they get it right?</p>
                <button
                  onClick={() => {
                    var newState = { ...quiz }
                    newState.questions[quiz.currentQuestion].winner =
                      quiz.questions[quiz.currentQuestion].buzzed
                    newState.currentQuestion += 1
                    setQuiz(newState)
                  }}>
                  Yes
                </button>
                <button
                  onClick={() => {
                    var newState = { ...quiz }
                    newState.questions[quiz.currentQuestion].buzzed = null
                    setQuiz(newState)
                  }}>
                  No
                </button>
              </React.Fragment>
            )}
          </React.Fragment>
        )}

        {quiz.questions &&
          quiz.currentQuestion >= 0 &&
          quiz.currentQuestion < quiz.questions.length && (
            <React.Fragment>
              <h2>Current Question</h2>
              <p>{quiz.questions[quiz.currentQuestion].text}</p>
            </React.Fragment>
          )}

        {quiz.questions && quiz.currentQuestion >= 0 && (
          <React.Fragment>
            <h2>Winners</h2>
            <ul>
              {quiz.questions.map((val, index) => (
                <li key={val.text}>
                  Question {index}: {val.winner}
                </li>
              ))}
            </ul>
          </React.Fragment>
        )}
      </div>
    )
  }
}
