import './index.css'

const DishDetails = props => {
  const {dishDetails, itemAddedInCart, itemRemovedInCart} = props
  const {
    dishId,
    dishPrice,
    addonCat,
    dishAvailability,
    dishType,
    dishCalories,
    dishCurrency,
    dishDescription,
    dishImage,
    dishName,
    nexturl,
  } = dishDetails

  const itemAdded = () => {
    itemAddedInCart()
  }

  const itemRemoved = () => {
    itemRemovedInCart()
  }

  return (
    <li className="dish-item-container">
      <img
        src={dishImage}
        alt={dishName}
        className="dish-availability-status"
      />
      <div className="dish-container">
        <h1 className="dish-heading">{dishName}</h1>
        <div className="dish-currency-container">
          <h1 className="dish-price">{`${dishCurrency} ${dishPrice}`}</h1>
          <h1 className="dish-calories">{`${dishCalories} Calories`}</h1>
        </div>
        <p className="dish-description">{dishDescription}</p>
        <div className="add-dish-container">
          <button
            type="button"
            className="modification-button"
            onClick={itemRemoved}
          >
            -
          </button>
          <p className="dish-count">0</p>
          <button
            type="button"
            className="modification-button"
            onClick={itemAdded}
          >
            +
          </button>
        </div>
        {addonCat.length > 0 && (
          <p className="dish-availability">Customization Available</p>
        )}
      </div>
      <img src={dishImage} alt={dishName} className="dish-image" />
    </li>
  )
}
export default DishDetails
