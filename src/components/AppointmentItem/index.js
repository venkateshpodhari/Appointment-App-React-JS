// Write your code here
import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {details, isFavorite} = props
  const {id, title, dateValue, isStar} = details
  const formatDate = format(new Date(dateValue), 'dd MMMM yyyy, EEEE')

  const onChange = () => {
    isFavorite(id)
  }

  const imgUrl = isStar
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <div className="bottom-container">
      <li className="appointment">
        <div className="title-container">
          <p className="title-hed">{title}</p>
          <p className="date-hed">Date: {formatDate}</p>
        </div>
        <button
          type="button"
          onClick={onChange}
          data-testid="star"
          className="starButton"
        >
          <img src={imgUrl} alt="star" />
        </button>
      </li>
    </div>
  )
}

export default AppointmentItem
