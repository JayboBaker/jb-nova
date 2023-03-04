import React, { useReducer } from 'react'
import { v4 as uuid } from 'uuid'

enum TodoActionType {
  ADD_TODO = 'ADD_TODO',
  TOGGLE_TODO = 'TOGGLE_TODO',
}
type ITodosAction = IAddTodoAction | IToggleTodoAction

interface IAddTodoAction {
  type: TodoActionType.ADD_TODO
  payload: {
    description: string
  }
}
interface IToggleTodoAction {
  type: TodoActionType.TOGGLE_TODO
  payload: {
    id: string
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

type TGroupedTodos = Record<TodoStatus, ITodo[]>

function todosReducer(state: ITodosState, action: ITodosAction) {
  switch (action.type) {
    case TodoActionType.ADD_TODO:
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: uuid(),
            description: action.payload.description,
            status: TodoStatus.PENDING,
          },
        ],
      }

    case TodoActionType.TOGGLE_TODO: {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                status:
                  item.status === TodoStatus.PENDING
                    ? TodoStatus.COMPLETED
                    : TodoStatus.PENDING,
              }
            : item
        ),
      }
    }
    default:
      return state
  }
}

const EmptyState = () => (
  <div className="mb-6">
    <p>You don't have any todos.</p>
    <p>Try adding one using the text box above!</p>
  </div>
)

const TodosTable = ({
  todos,
  toggleTodo,
  title,
}: {
  todos: ITodo[]
  toggleTodo: (id: string) => void
  title: string
}) => {
  const handleSubmit = (evt: any) => {
    evt.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="has-text-left mb-6">
        <h2 className="title is-4">
          {title}
          <span className="is-sr-only"> todos</span>
        </h2>
        {!todos?.length && <div>No {title.toLowerCase()} todos to display</div>}
        {!!todos?.length && (
          <table
            data-cy="todo-list"
            className="table is-striped is-fullwidth is-narrow"
          >
            <thead>
              <tr className="is-sr-only">
                <th>status</th>
                <th>description</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <Todo
                  key={`${todo.status}-${todo.id}`}
                  {...{ todo, toggleTodo }}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </form>
  )
}

const Todo = ({
  todo,
  toggleTodo,
}: {
  todo: ITodo
  toggleTodo: (id: string) => void
}) => (
  <tr>
    <td style={{ width: 30 }}>
      <input
        type="checkbox"
        data-cy={`todo-input-toggle-${todo.id}`}
        className="checkbox"
        id={`status-${todo.id}`}
        name={`status-${todo.id}`}
        onChange={() => toggleTodo(todo.id)}
        checked={todo.status === TodoStatus.COMPLETED}
      />
    </td>
    <td>
      <label htmlFor={`status-${todo.id}`}>{todo.description}</label>
    </td>
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
  const toggleTodo = (id: string) =>
    dispatch({ type: TodoActionType.TOGGLE_TODO, payload: { id } })

  const groupedTodos = todos.reduce<TGroupedTodos>((todos, todo) => {
    const exisitingGroup = todos[todo.status] || []
    return {
      ...todos,
      [todo.status]: [...exisitingGroup, todo],
    }
  }, {} as TGroupedTodos)

  return (
    <div className="columns is-centered">
      <div className="column is-6">
        <TodoForm {...{ addTodo }} />
        {!todos?.length && <EmptyState />}
        <TodosTable
          {...{
            todos: groupedTodos[TodoStatus.PENDING],
            toggleTodo,
            title: 'Pending',
          }}
        />

        <TodosTable
          {...{
            todos: groupedTodos[TodoStatus.COMPLETED],
            toggleTodo,
            title: 'Complete',
          }}
        />
      </div>
    </div>
  )
}

export default Todos
