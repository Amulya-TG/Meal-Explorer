import { useEffect, useState } from "react";
import {
  fetchCategories,
  fetchMealsByCategory,
  fetchRecipeDetails,
} from "../services/api";

import CategoryCard from "../components/CategoryCard";
import MealCard from "../components/MealCard";
import RecipePopup from "../components/RecipePopup";

const Home = ({ meals, setMeals, selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  // Loading
  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      const data = await fetchCategories();
      setCategories(data.categories);
      setLoading(false);
    };

    loadCategories();
  }, []);

  // Load meals when category changes
  useEffect(() => {
    if (!selectedCategory) return;
    const loadMeals = async () => {
      try {
        const data = await fetchMealsByCategory(selectedCategory);
        console.log(data);      
        setMeals(data.meals || []);
      } catch (err) {
        console.log(err);
      }
    };

    loadMeals();
  }, [selectedCategory]);

  //recipe details
  const handleRecipe = async (id) => {
    const data = await fetchRecipeDetails(id);    
    setRecipe(data.meals[0]);
  };

  return (
    <div className="container">
      <h1>Meal Categories</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="category-container">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.idCategory}
              category={cat}
              onClick={() => setSelectedCategory(cat.strCategory)}
            />
          ))}
        </div>
      )}

      <h2>Meals</h2>
      {meals.length === 0 && !loading && <p>No meals found</p>}
      <div className="meal-container">
        {meals?.map((meal) => (
          <MealCard
            key={meal.idMeal}
            meal={meal}
            onClick={() => handleRecipe(meal.idMeal)}
          />
        ))}
      </div>

      {recipe && (
        <RecipePopup recipe={recipe} onClose={() => setRecipe(null)} />
      )}
    </div>
  );
};

export default Home;
