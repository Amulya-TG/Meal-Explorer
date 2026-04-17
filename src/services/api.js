const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const fetchCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories.php`);
  return res.json();
};

export const fetchMealsByCategory = async (category) => {
  const res = await fetch(`${BASE_URL}/filter.php?c=${category}`);
  return res.json();
};

export const fetchRecipeDetails = async (id) => {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  return res.json();
};

export const searchMeals = async (query) => {
  if (!query || !query.trim()) return { meals: [] };
  const trimmed = query.trim();
  try {
    // Search by meal name (case-insensitive on API side)
    const nameRes = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(trimmed)}`);
    const nameData = await nameRes.json();
    const nameResults = nameData.meals || [];

    const ingRes = await fetch(`${BASE_URL}/filter.php?i=${encodeURIComponent(trimmed)}`);
    const ingData = await ingRes.json();
    const ingResults = ingData.meals || [];

    // Merge: name results first, then ingredient results
    const seen = new Set(nameResults.map((m) => m.idMeal));
    const merged = [
      ...nameResults,
      ...ingResults.filter((m) => !seen.has(m.idMeal)),
    ];

    return { meals: merged.length > 0 ? merged : null };
  } catch (err) {
    console.error("Search error:", err);
    return { meals: null };
  }
};