import React from 'react'
import { Link } from 'react-router-dom'

export default function List({ quizzes }) {
  return (
    <ul>
      {Object.values(quizzes).map(quiz => (
        <li key={quiz.id}>
          <Link to={`/admin/edit/${quiz.id}`}>{quiz.title}</Link>
          <span> – </span>
          <Link to={`/admin/quiz/${quiz.id}`}>Start Quiz</Link>
        </li>
      ))}
    </ul>
  )
}
