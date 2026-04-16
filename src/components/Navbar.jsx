import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { searchMeals } from "../services/api";

const Navbar = ({ darkMode, setDarkMode, setMeals, setSelectedCategory}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    setSearching(true);
    try {
      const data = await searchMeals(query);
      const results = (data.meals || []).map((meal) => ({
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strMealThumb: meal.strMealThumb,
      }));
      setMeals(results);
      setSelectedCategory(`Search: "${query}"`);
      navigate("/meal/search");
    } catch (err) {
      console.error(err);
    } finally {
      setSearching(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setMenuOpen(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo" onClick={() => navigate("/")}>
          <span className="meal">🍽 Meal</span>
          <span className="explorer">Explorer</span>
        </div>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Search meals or ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn" disabled={searching}>
            {searching ? "⏳" : "🔍"}
          </button>
        </form>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/meal">Meals</Link>
          <Link to="/favorites">❤ Favorites</Link>
          {user ? (
            <button className="nav-action-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="nav-action-btn login-link">
              Login
            </Link>
          )}
          <button onClick={() => setDarkMode(!darkMode)} className="mode-btn">
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>

        <div className="nav-right-mobile">
          <button onClick={() => setDarkMode(!darkMode)} className="mode-btn">
            {darkMode ? "🌙" : "☀️"}
          </button>
          <div className="hamburger" onClick={() => setMenuOpen(true)}>
            ☰
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)}></div>
      )}

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="menu-header">
          <h2>Menu</h2>
          <span onClick={() => setMenuOpen(false)}>✕</span>
        </div>

        <form className="mobile-search-form" onSubmit={(e) => { handleSearch(e); setMenuOpen(false); }}>
          <input
            type="text"
            className="mobile-search-input"
            placeholder="Search meals or ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">🔍</button>
        </form>

        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/meal" onClick={() => setMenuOpen(false)}>Meals</Link>
        <Link to="/favorites" onClick={() => setMenuOpen(false)}>❤ Favorites</Link>

        {user ? (
          <button style={{ fontFamily: "serif" }} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
        )}
      </div>
    </>
  );
};

export default Navbar;
