const CategoryCard = ({ category, onClick }) => {
  return (
    <div className="category-card" onClick={onClick}>
      <img
        src={category.strCategoryThumb}
        alt={category.strCategory}
      />
      <div className="category-overlay">
        <h3>{category.strCategory}</h3>
      </div>
    </div>
  );
};

export default CategoryCard;