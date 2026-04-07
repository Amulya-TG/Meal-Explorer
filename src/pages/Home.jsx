import { useEffect, useRef, useState } from "react";
import { fetchCategories } from "../services/api";
import { useNavigate } from "react-router-dom";

const Home = ({ setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const scrollRef = useRef();

  useEffect(() => {
    const loadData = async () => {
      const catData = await fetchCategories();
      setCategories(catData.categories.slice(0, 6));
    };
    loadData();
  }, []);

  const scroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = 250;

    if (direction === "left") {
      current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="home">
      <div className="hero">
        <h1>Discover Delicious Recipes 🍽</h1>
        <button onClick={() => navigate("/meal")}>Explore Meals</button>
      </div>

      <div className="section-header">
        <h2>Categories</h2>
        <span className="see-more" onClick={() => navigate("/meal")}>
          See all →
        </span>
      </div>

      <div className="scroll-container">
        <button className="scroll-btn left" onClick={() => scroll("left")}>‹</button>
        <div className="scroll-row" ref={scrollRef}>
          {categories.map((cat) => (
            <div
              key={cat.idCategory}
              className="small-card"
              onClick={() => {
                setSelectedCategory(cat.strCategory);
                navigate(`/meal/${cat.strCategory}`);
              }}
            >
              <img src={cat.strCategoryThumb} alt="" />
              <p>{cat.strCategory}</p>
            </div>
          ))}
        </div>
        <button className="scroll-btn right" onClick={() => scroll("right")}>›</button>
      </div>
    </div>
  );
};

export default Home;
