import {useState} from 'react'
import {BsCircleFill} from 'react-icons/bs'
import './index.css'

const DishDetails = props => {
  const {dishDetails, itemAddedInCart, itemRemovedInCart} = props
  const [countValue, setValue] = useState(0)
  const {
    dishId,
    dishPrice,
    addonCat,
    dishCalories,
    dishAvailability,
    dishCurrency,
    dishDescription,
    dishImage,
    dishName,
  } = dishDetails

  const itemAdded = () => {
    setValue(countValue + 1)
    itemAddedInCart(dishId)
  }

  const itemRemoved = () => {
    if (countValue > 0) {
      setValue(countValue - 1)
      itemRemovedInCart(dishId)
    }
  }

  const addCon = addonCat.length > 0 ? 'green' : 'red'

  return (
    <li className="dish-item-container">
      <div className={addCon}>
        <BsCircleFill className="circle" />
      </div>
      <div className="dish-container">
        <h1 className="dish-heading">{dishName}</h1>
        <div className="dish-currency-container">
          <h1 className="dish-price">{`${dishCurrency} ${dishPrice}`}</h1>
        </div>
        <p className="dish-description">{dishDescription}</p>
        {dishAvailability === true && (
          <div className="add-dish-container">
            <button
              type="button"
              className="modification-button"
              onClick={itemRemoved}
            >
              -
            </button>
            <p className="dish-count">{countValue}</p>
            <button
              type="button"
              className="modification-button"
              onClick={itemAdded}
            >
              +
            </button>
          </div>
        )}
        {addonCat.length > 0 && (
          <p className="dish-availability">Customizations available</p>
        )}
        {dishAvailability === false && (
          <p className="dish-availability">Not available</p>
        )}
      </div>
      <div className="dish-calories-container">
        <h1 className="dish-calories">{`${dishCalories} Calories`}</h1>
      </div>
      <img src={dishImage} alt={dishName} className="dish-image" />
    </li>
  )
}
export default DishDetails
