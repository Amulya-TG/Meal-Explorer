import { Link } from "react-router-dom";
import { useState } from "react";
import {
  searchMeals,
  fetchMealsByCategory,
  fetchCategories,
} from "../services/api";

const Navbar = ({
  darkMode,
  setDarkMode,
  setMeals,
  setSelectedCategory,
}) => {
  const [search, setSearch] = useState("");

  const handleSearch = async () => {
    if (!search.trim()) return;

    try {
      const query = search.toLowerCase();

      setSelectedCategory(null);
      const catData = await fetchCategories();      
      const categoryNames = catData.categories.map((c) =>
        c.strCategory.toLowerCase()
      );

      let results = [];

      if (categoryNames.includes(query)) {
        const data = await fetchMealsByCategory(
          query.charAt(0).toUpperCase() + query.slice(1)
        );
        results = data.meals || [];
      }

      const searchData = await searchMeals(query);
      // console.log(searchData);
      
      const combined = [...results, ...(searchData.meals || [])];
      console.log(combined);
      
      const uniqueMeals = Array.from(
        new Map(combined.map((item) => [item.idMeal, item])).values()
      );

      setMeals(uniqueMeals);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <span className="meal">🍽 Meal</span>
        <span className="explorer">Explorer</span>
      </div>
      <div className="nav-search">
        <input
          type="text"
          placeholder="Search meals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>
      </div>

      <div className="nav-end">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ?<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
            <path d="M8 1a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 1ZM10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM12.95 4.11a.75.75 0 1 0-1.06-1.06l-1.062 1.06a.75.75 0 0 0 1.061 1.062l1.06-1.061ZM15 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 15 8ZM11.89 12.95a.75.75 0 0 0 1.06-1.06l-1.06-1.062a.75.75 0 0 0-1.062 1.061l1.061 1.06ZM8 12a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 12ZM5.172 11.89a.75.75 0 0 0-1.061-1.062L3.05 11.89a.75.75 0 1 0 1.06 1.06l1.06-1.06ZM4 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 4 8ZM4.11 5.172A.75.75 0 0 0 5.173 4.11L4.11 3.05a.75.75 0 1 0-1.06 1.06l1.06 1.06Z" />
            </svg>
          }
        </button>
      </div>
    </nav>
  );
};

export default Navbar;