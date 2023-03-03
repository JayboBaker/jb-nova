import React, { useReducer } from 'react'
import { v4 as uuid } from 'uuid'

enum TodoActionType {
  ADD_TODO = 'ADD_TODO',
}
interface ITodosAction {
  type: TodoActionType
  payload: {
    description: string
  }
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
  const { type, payload } = action
  switch (type) {
    case TodoActionType.ADD_TODO:
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: uuid(),
            description: payload.description,
            status: TodoStatus.PENDING,
          },
        ],
      }
    default:
      return state
  }
}

const EmptyState = () => <div>You don't have any todos!</div>

const TodosTable = ({ todos }: { todos: ITodo[] }) => {
  return (
    <table data-cy="todo-list" className="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th>Description</th>
          <th className="has-text-right">Status</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <Todo key={todo.id} {...{ todo }} />
        ))}
      </tbody>
    </table>
  )
}

const Todo = ({ todo }: { todo: ITodo }) => (
  <tr>
    <td className="has-text-left">{todo.description}</td>
    <td className="has-text-right">{todo.status}</td>
  </tr>
)

const TodoForm = ({ addTodo }: { addTodo: (description: string) => void }) => {
  const handleSubmit = (evt: any) => {
    evt.preventDefault()
    addTodo(evt.target.description.value)
    evt.target.reset()
  }

  return (
    <div className="mb-5">
      <form onSubmit={handleSubmit}>
        <div className="field has-addons has-addons-centered">
          <div className="control">
            <label className="is-sr-only" htmlFor="description">
              Description
            </label>
            <input
              data-cy="todo-input-description"
              className="input"
              id="description"
              name="description"
              placeholder="Something to do..."
              required
            />
          </div>
          <div className="control">
            <button type="submit" className="button is-link">
              Add todo
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

const Todos = () => {
  const [state, dispatch] = useReducer(todosReducer, {
    items: [],
  })
  const todos = state?.items

  const addTodo = (description: string) =>
    dispatch({ type: TodoActionType.ADD_TODO, payload: { description } })

  return (
    <div className="columns is-centered">
      <div className="column is-6">
        <TodoForm {...{ addTodo }} />
        {!todos.length && <EmptyState />}
        {!!todos.length && <TodosTable {...{ todos }} />}
      </div>
    </div>
  )
}

export default Todos
