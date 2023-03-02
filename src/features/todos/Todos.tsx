import React, { useReducer } from 'react'

interface ITodosAction {
  type: any
  payload: any
}

enum TodoStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

interface ITodo {
  id: string
  status: TodoStatus
  description: string
}

interface ITodosState {
  items: ITodo[]
}

function todosReducer(state: ITodosState, action: ITodosAction) {
  const { type } = action
  switch (type) {
    default:
      return state
  }
}

const EmptyState = () => <div>You don't have any todos!</div>

const TodosTable = ({ todos }: { todos: ITodo[] }) => {
  return (
    <table className="table is-striped is-narrow">
      <thead>
        <tr>
          <th>Description</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <Todo {...{ todo }} />
        ))}
      </tbody>
    </table>
  )
}

const Todo = ({ todo }: { todo: ITodo }) => (
  <tr>
    <td>{todo.description}</td>
    <td className="has-text-right">{todo.status}</td>
  </tr>
)

const Todos = () => {
  const [state] = useReducer(todosReducer, {
    items: [],
  })
  const todos = state?.items

  return (
    <div className="columns is-centered">
      <div className="column is-narrow">
        {!todos.length && <EmptyState />}
        {!!todos.length && <TodosTable {...{ todos }} />}
      </div>
    </div>
  )
}

export default Todos
