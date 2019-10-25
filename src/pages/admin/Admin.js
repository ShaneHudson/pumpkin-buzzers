import React from 'react'
import List from './List'
import { Link } from 'react-router-dom'

export default function Admin({ quizzes }) {
  return (
    <React.Fragment>
      <Link to="/admin/create">Create</Link>
      <List quizzes={quizzes} />
    </React.Fragment>
  )
}
