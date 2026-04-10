const RecipePopup = ({ recipe, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="close-btn" onClick={onClose}> ✖</span>
        <h2>{recipe.strMeal}</h2>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        
        <h3>Instructions</h3>
        <p>{recipe.strInstructions}</p>
      </div>
    </div>
  );
};

export default RecipePopup;