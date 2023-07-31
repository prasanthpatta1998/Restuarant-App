import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {FaShoppingCart} from 'react-icons/fa'
import Categories from '../Categories'
import DishDetails from '../DishDetails'
import './index.css'

const applicationState = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
}

class RestoCafe extends Component {
  state = {
    restaurantState: applicationState.initial,
    restaurantData: [],
    categoryDishesId: '',
    categoriesList: [],
    count: 0,
  }

  componentDidMount() {
    this.getRestaurantData()
  }

  getRestaurantData = async () => {
    this.setState({restaurantState: applicationState.inProgress})
    const url = 'https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099'
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok === true) {
      const apiData = [
        {
          branchName: data[0].branch_name,
          restaurantName: data[0].restaurant_name,
          tableMenuList: data[0].table_menu_list.map(eachElement => ({
            menuCategory: eachElement.menu_category,
            menuCategoryId: eachElement.menu_category_id,
            menuCategoryImage: eachElement.menu_category_image,
            nexturl: eachElement.nexturl,
            categoryDishes: eachElement.category_dishes.map(eachCategory => ({
              dishId: eachCategory.dish_id,
              dishPrice: eachCategory.dish_price,
              addonCat: eachCategory.addonCat,
              dishAvailability: eachCategory.dish_Availability,
              dishType: eachCategory.dish_Type,
              dishCalories: eachCategory.dish_calories,
              dishCurrency: eachCategory.dish_currency,
              dishDescription: eachCategory.dish_description,
              dishImage: eachCategory.dish_image,
              dishName: eachCategory.dish_name,
              nexturl: eachCategory.nexturl,
            })),
          })),
        },
      ]
      console.log(apiData)

      this.setState({
        restaurantData: apiData,
        categoriesList: apiData[0].tableMenuList,
        restaurantState: applicationState.success,
        categoryDishesId: apiData[0].tableMenuList[0].menuCategoryId,
      })
    }
  }

  changeDishCategoryList = id => {
    const {categoriesList} = this.state
    const newId = categoriesList.filter(each => each.menuCategoryId === id)
    this.setState({categoryDishesId: newId[0].menuCategoryId})
  }

  renderDishes = () => {
    const {categoriesList, categoryDishesId} = this.state
    const newList = categoriesList.filter(
      each => each.menuCategoryId === categoryDishesId,
    )
    return newList[0]
  }

  itemAddedInCart = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  itemRemovedInCart = () => {
    this.setState(prevState => ({count: prevState.count - 1}))
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="red" height="50" width="50" />
    </div>
  )

  renderSuccess = () => {
    const {restaurantData, count, categoryDishesId} = this.state
    const {tableMenuList} = restaurantData[0]
    const {categoryDishes} = this.renderDishes()

    return (
      <>
        <nav className="nav-container">
          <h1 className="nav-heading">{restaurantData[0].restaurantName}</h1>
          <div className="orders-container">
            <h1 className="order-heading">My Orders</h1>
            <div className="cart-container">
              <FaShoppingCart className="cart-icon" />
              <span className="count">{count}</span>
            </div>
          </div>
        </nav>
        <ul className="menu-items">
          {tableMenuList.map(eachTab => (
            <Categories
              categories={eachTab}
              key={eachTab.menuCategoryId}
              isActive={eachTab.menuCategoryId === categoryDishesId}
              changeDishCategoryList={this.changeDishCategoryList}
            />
          ))}
        </ul>
        <ul className="dish-list">
          {categoryDishes.map(eachDish => (
            <>
              <DishDetails
                dishDetails={eachDish}
                key={eachDish.dishId}
                itemAddedInCart={this.itemAddedInCart}
                itemRemovedInCart={this.itemRemovedInCart}
              />
            </>
          ))}
        </ul>
      </>
    )
  }

  renderState = () => {
    const {restaurantState} = this.state

    switch (restaurantState) {
      case applicationState.inProgress:
        return this.renderLoader()
      case applicationState.success:
        return this.renderSuccess()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderState()}</div>
  }
}

export default RestoCafe
