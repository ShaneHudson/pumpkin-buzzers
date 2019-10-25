import React from 'react'
import logo from './logo.svg'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Quiz from './pages/Quiz'
import EditQuiz from './pages/admin/EditQuiz'
import QuizAdmin from './pages/admin/QuizAdmin'
import Admin from './pages/admin/Admin'
import base from './base'

class App extends React.Component {
  state = {
    quizzes: {},
    teamName: '',
    connectionList: {},
    teams: {}
  }

  componentDidMount() {
    this.ref = base.syncState(`quizzes`, {
      context: this,
      state: 'quizzes'
    })

    this.teamRef = base.bindToState(`teams`, {
      context: this,
      state: 'teams'
    })

    this.activeQuizRef = base.syncState(`activeQuizID`, {
      context: this,
      state: 'activeQuizID'
    })

    var cachedTeamName = localStorage.getItem('quiz-teamname')
    if (!this.state.teamName && cachedTeamName) {
      this.setTeamName(cachedTeamName)
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
    base.removeBinding(this.teamRef)
    base.removeBinding(this.activeQuizRef)
  }

  setQuiz = quiz => {
    const quizzes = { ...this.state.quizzes }
    quizzes[quiz.id] = quiz
    this.setState({ quizzes })
  }

  setActiveQuiz = activeQuizID => {
    this.setState({ activeQuizID })
  }

  buzzIn = (quiz, teamName, questionIndex) => {
    const quizzes = { ...this.state.quizzes }
    if (
      quizzes[quiz.id].questions &&
      quizzes[quiz.id].questions[questionIndex] &&
      !quizzes[quiz.id].questions[questionIndex].buzzed
    ) {
      quizzes[quiz.id].questions[questionIndex].buzzed = teamName
      this.setState({ quizzes })
    }
  }

  setTeamName = name => {
    localStorage.setItem('quiz-teamname', name)
    this.setState({ teamName: name })

    var ref = base.initializedApp.database().ref('teams/' + name)
    ref.update({
      onlineState: true,
      status: "I'm online."
    })
    ref.onDisconnect().update({
      onlineState: false,
      status: "I'm offline."
    })
  }

  joinQuiz = (quiz, name) => {
    const quizzes = { ...this.state.quizzes }
    if (!quizzes[quiz.id].players) quizzes[quiz.id].players = []
    var arr = [...new Set([...quizzes[quiz.id].players, name])]
    quizzes[quiz.id].players = arr
    if (this.state.teamName !== name) {
      this.setTeamName(name)
    }
    this.setState({ quizzes })
  }

  render() {
    const ProppedQuiz = props => {
      return (
        <Quiz
          quizzes={this.state.quizzes}
          joinQuiz={this.joinQuiz}
          teamName={this.state.teamName}
          activeQuizID={this.state.activeQuizID}
          buzzIn={this.buzzIn}
          {...props}
        />
      )
    }

    const ProppedQuizAdmin = props => {
      return (
        <QuizAdmin
          quizzes={this.state.quizzes}
          teams={this.state.teams}
          setQuiz={this.setQuiz}
          setActiveQuiz={this.setActiveQuiz}
          {...props}
        />
      )
    }

    const ProppedAdmin = props => {
      return <Admin quizzes={this.state.quizzes} {...props} />
    }

    const ProppedEditQuiz = props => {
      return (
        <EditQuiz
          quizzes={this.state.quizzes}
          setQuiz={this.setQuiz}
          {...props}
        />
      )
    }

    return (
      <div className="App">
        <link
          href="https://fonts.googleapis.com/css?family=Griffy|Spicy+Rice&display=swap"
          rel="stylesheet"
        />
        <Router>
          <React.Suspense fallback={<p>Loading</p>}>
            <Switch>
              <Route exact path="/" component={ProppedQuiz} />
              <Route
                exact
                path="/admin/quiz/:currentQuiz"
                component={ProppedQuizAdmin}
              />
              <Route exact path="/admin" component={ProppedAdmin} />
              <Route exact path="/admin/create" component={ProppedEditQuiz} />
              <Route
                exact
                path="/admin/edit/:quizID"
                component={ProppedEditQuiz}
              />
              <Route path="/:currentQuiz" component={ProppedQuiz} />
            </Switch>
          </React.Suspense>
        </Router>
      </div>
    )
  }
}

export default App
