import './index.css'

const Categories = props => {
  const {categories, isActive, changeDishCategoryList} = props
  const {menuCategory, menuCategoryId} = categories

  const dishCategory = isActive && 'active'

  const changeDishCategory = () => {
    changeDishCategoryList(menuCategoryId)
  }

  return (
    <li className={`menu-element ${dishCategory}`}>
      <button
        type="button"
        className={`menu-heading ${dishCategory}`}
        onClick={changeDishCategory}
      >
        {menuCategory}
      </button>
    </li>
  )
}
export default Categories
