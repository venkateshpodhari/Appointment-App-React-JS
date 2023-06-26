// Write your code here
import {v4 as uuidv4} from 'uuid'
import {Component} from 'react'
import './index.css'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {title: '', dateValue: '', appointmentLists: [], isFiltered: false}

  isFavorite = id => {
    this.setState(prevState => ({
      appointmentLists: [
        ...prevState.appointmentLists.map(eachList => {
          if (id === eachList.id) {
            return {...eachList, isStar: !eachList.isStar}
          }
          return eachList
        }),
      ],
    }))
  }

  onFilter = () => {
    const {isFiltered} = this.state
    this.setState({isFiltered: !isFiltered})
  }

  inputChange = event => {
    this.setState({title: event.target.value})
  }

  dateChange = event => {
    this.setState({dateValue: event.target.value})
  }

  addList = event => {
    const {title, dateValue} = this.state
    event.preventDefault()
    const newAppointment = {
      id: uuidv4(),
      title,
      dateValue,
      isStar: false,
    }

    this.setState(prevState => ({
      appointmentLists: [...prevState.appointmentLists, newAppointment],
      title: '',
      dateValue: '',
    }))
  }

  getFilteredAppointment = () => {
    const {appointmentLists, isFiltered} = this.state

    if (isFiltered) {
      return appointmentLists.filter(each => each.isStar === isFiltered)
    }
    return appointmentLists
  }

  render() {
    const {title, dateValue, appointmentLists, isFiltered} = this.state
    console.log(appointmentLists)
    const FilteredAppointment = this.getFilteredAppointment()
    const isStarred = isFiltered ? 'highlight-star-button' : 'star-button'
    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="appointment-container">
            <form className="input-container" onSubmit={this.addList}>
              <h1 className="title">Add Appointment</h1>
              <label htmlFor="input" className="label">
                Title
              </label>
              <input
                type="input"
                id="input"
                className="input"
                onChange={this.inputChange}
                value={title}
              />
              <label htmlFor="date" className="label">
                Date
              </label>
              <input
                type="date"
                id="date"
                className="input"
                onChange={this.dateChange}
                value={dateValue}
              />
              <button type="submit" className="button">
                Add
              </button>
            </form>
            <img
              src="http://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="img"
            />
          </div>
          <hr />
          <div className="appointments-container">
            <h1 className="appointment-title">Appointments</h1>
            <button type="button" className={isStarred} onClick={this.onFilter}>
              Starred
            </button>
          </div>
          <ul className="appointments-lists-container">
            {FilteredAppointment.map(eachList => (
              <AppointmentItem
                details={eachList}
                key={eachList.id}
                isFavorite={this.isFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
