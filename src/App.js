import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    activeOptionId: '',
    userEnterValue: '',
    tasksList: [],
    activeTab: false,
  }

  onClickTags = item => {
    const {tasksList} = this.state

    const a = tasksList.filter(eachValue => eachValue.activeOptionId === item)
    this.setState({
      tasksList: a,
      activeTab: true,
    })
  }

  onChangeSelect = event => {
    this.setState({activeOptionId: event.target.value})
  }

  onChangeUserValue = event => {
    this.setState({userEnterValue: event.target.value})
  }

  onSubmitTask = event => {
    event.preventDefault()
    const {activeOptionId, userEnterValue} = this.state

    const newTask = {
      id: uuidv4(),
      userEnterValue,
      activeOptionId,
    }
    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, newTask],
      userEnterValue: '',
      activeOptionId: '',
    }))
  }

  render() {
    const {activeOptionId, userEnterValue, tasksList, activeTab} = this.state

    return (
      <div className="app-container">
        <div className="task-create-container">
          <h1 className="heading">Create a task!</h1>
          <div className="form-btn-container">
            <form className="form-div" onSubmit={this.onSubmitTask}>
              <div className="input-div">
                <label htmlFor="task" className="label-element">
                  Task
                </label>
                <input
                  type="text"
                  id="task"
                  className="input-element"
                  onChange={this.onChangeUserValue}
                  value={userEnterValue}
                  placeholder="Enter the task here"
                />
              </div>
              <div className="input-div">
                <label htmlFor="task" className="label-element">
                  Tags
                </label>
                <select
                  className="select-element"
                  onChange={this.onChangeSelect}
                  value={activeOptionId}
                >
                  {tagsList.map(eachItem => (
                    <option
                      key={eachItem.optionId}
                      value={eachItem.optionId}
                      className="option"
                    >
                      {eachItem.displayText}
                    </option>
                  ))}
                </select>
              </div>
              <div className="btn-container">
                <button type="submit" className="add-btn">
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="tags-info-container">
          <h1 className="tasks-heading">Tags</h1>

          <ul className="ul-tasks">
            {tagsList.map(eachItem => (
              <li key={eachItem.optionId} className="list-item">
                <button
                  type="button"
                  className="btn-list"
                  onClick={() => this.onClickTags(eachItem.optionId)}
                >
                  {eachItem.displayText}
                </button>
              </li>
            ))}
          </ul>
          <h1 className="tasks-heading">Tasks</h1>
          {tasksList.length === 0 ? (
            <div className="no-task-div">
              <p className="tasks-heading">No Tasks Added Yet</p>
            </div>
          ) : (
            <ul className="ul-task-addedd">
              {tasksList.map(eachItem => (
                <li key={eachItem.id} className="task-item">
                  <p className="task-description">{eachItem.userEnterValue}</p>
                  <p className="task-option">{eachItem.activeOptionId}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}
export default App
