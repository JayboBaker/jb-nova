import React from 'react'
import './App.scss'
import Todos from './features/todos/Todos'

const App: React.FC = () => {
  return (
    <div className="container has-text-centered">
      <header>
        <h1 data-cy="title" className="title is-1 mb-5">
          Todo App
        </h1>
      </header>
      <main>
        <Todos />
      </main>
    </div>
  )
}

export default App
