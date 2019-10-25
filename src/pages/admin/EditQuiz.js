import React from 'react'
import { halloweenIDGenerator } from '../../helpers'
import { Link } from 'react-router-dom'

export default class EditQuiz extends React.Component {
  state = {
    questions: [{ text: '' }],
    players: []
  }

  onChange = event => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  onChangeQuestion = (event, i) => {
    this.setState(state => {
      var newState = { ...state }
      if (!newState.questions[i]) newState.questions[i] = {}
      newState.questions[i].text = event.target.value
      return newState
    })
  }

  onChangeAnswer = (event, i) => {
    this.setState(state => {
      var newState = { ...state }
      if (!newState.questions[i]) newState.questions[i] = {}
      newState.questions[i].answer = event.target.value
      return newState
    })
  }

  componentDidMount() {
    const { quizzes } = this.props
    const { quizID } = this.props.match.params
    if (quizzes[quizID]) this.setState(quizzes[quizID])
    else
      this.setState({
        id: halloweenIDGenerator()
      })
  }

  saveQuiz = event => {
    event.preventDefault()
    this.props.setQuiz(this.state)
    event.currentTarget.reset()
  }

  addQuestion = () => {
    this.setState(state => {
      const quiz = state
      quiz.questions.push({ text: '' })
      return quiz
    })
  }

  render() {
    const quiz = this.state
    const isNew = !this.props.quizzes[this.state.id]
    const onChange = this.onChange

    return (
      <React.Fragment>
        <Link to="/admin/">Back</Link>
        <form onSubmit={this.saveQuiz}>
          <h2>Create quiz</h2>
          <div>
            <label htmlFor="title">ID</label>
            <input
              type="text"
              name="title"
              id="title"
              required
              placeholder="freaky-friday-pumpkin"
              readOnly={quiz.id || false}
              value={quiz.id}
              onChange={onChange}
            />
          </div>

          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              required
              placeholder="Halloween Quiz 1"
              value={quiz.title}
              onChange={onChange}
            />
          </div>

          <div>
            <label htmlFor="title">Theme</label>
            <input
              type="text"
              name="theme"
              id="theme"
              required
              value={quiz.theme}
              onChange={onChange}
            />
          </div>

          <button type="button" onClick={this.addQuestion}>
            Add New Question
          </button>
          <ul>
            {this.state.questions.map((question, i) => (
              <li key={i}>
                <label htmlFor="title">Question #{i}</label>
                <input
                  type="text"
                  name={`questions-${i}`}
                  id={`questions-${i}`}
                  value={quiz.questions[i].text}
                  onChange={e => {
                    e.persist()
                    this.onChangeQuestion(e, i)
                  }}
                />
                <input
                  type="text"
                  name={`questions-${i}-answer`}
                  id={`questions-${i}-answer`}
                  value={quiz.questions[i].answer}
                  onChange={e => {
                    e.persist()
                    this.onChangeAnswer(e, i)
                  }}
                />
              </li>
            ))}
          </ul>

          <button type="submit">{isNew ? 'Create' : 'Save'}</button>
        </form>
      </React.Fragment>
    )
  }
}
