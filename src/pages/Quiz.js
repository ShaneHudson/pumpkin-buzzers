import React from 'react'
import queryString from 'query-string'

function CurrentQuiz({ joinQuiz, buzzIn, teamName, quiz }) {
  if (!quiz.questions) return null

  if (!teamName) {
    var error = false
    return (
      <form
        onSubmit={e => {
          if (quiz.players && quiz.players[teamName]) error = true
          else joinQuiz(quiz, e.target[0].value)
        }}>
        <h2 class="text-primary">Enter a team name</h2>
        <input type="text" required defaultValue={teamName} />
        {error && <p style={{ color: 'red' }}>This name is taken already</p>}
        <button type="submit">Join</button>
      </form>
    )
  } else {
    var buzzed =
      quiz.questions && quiz.questions[quiz.currentQuestion]
        ? quiz.questions[quiz.currentQuestion].buzzed
        : false
    joinQuiz(quiz, teamName)
    return (
      <div>
        <h1 className="quiz-title">{quiz.title || quiz.id}</h1>
        <button
          className="buzzer"
          disabled={buzzed}
          onClick={() => {
            buzzIn(quiz, teamName, quiz.currentQuestion)
          }}>
          <img
            src={`/${quiz.theme}/${(quiz.players.indexOf(teamName) + 1) %
              5}.svg`}
            alt="Buzz"
          />
        </button>
        <h2>Team name: {teamName}</h2>
      </div>
    )
  }
}

function ChooseQuiz({ submitHandler }) {
  return (
    <form onSubmit={submitHandler}>
      <h2>What is the ID of the quiz you want to join?</h2>
      <input type="text" required placeholder="jumpy-goose-quacking" />
      <button type="submit">Join</button>
    </form>
  )
}

export default class Quiz extends React.Component {
  state = {
    currentQuiz: null
  }

  goToQuiz = event => {
    event.preventDefault()
    const currentQuiz = event.target[0].value

    this.props.history.push(`/${currentQuiz}`)
    this.setState({
      currentQuiz: currentQuiz
    })
  }

  componentDidMount() {
    const { currentQuiz } = this.props.match.params
    const { quizzes, activeQuizID } = this.props

    const quiz = quizzes[currentQuiz] || quizzes[activeQuizID] || {}
    if (quiz.id) this.props.history.push(`/${quiz.id}`)
    this.setState({
      currentQuiz: quiz.id || null
    })

    if (quiz)
      document.body.parentElement.classList.toggle(`theme-${quiz.theme}`, true)
  }

  render() {
    const { currentQuiz } = this.state
    const { quizzes, joinQuiz, teamName, buzzIn } = this.props

    const quiz = quizzes[currentQuiz]

    return (
      <React.Fragment>
        {quiz ? (
          <CurrentQuiz
            quiz={quiz}
            joinQuiz={joinQuiz}
            teamName={teamName}
            buzzIn={buzzIn}
          />
        ) : (
          <ChooseQuiz submitHandler={this.goToQuiz} />
        )}
      </React.Fragment>
    )
  }
}
