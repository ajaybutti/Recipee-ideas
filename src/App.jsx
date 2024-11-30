import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [ingredient, setIngredient] = useState('');
  const [mood, setMood] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle ingredient input change
  const handleIngredientChange = (e) => {
    setIngredient(e.target.value);
  };

  // Handle mood input change
  const handleMoodChange = (e) => {
    setMood(e.target.value);
  };

  // Fetch recipes based on ingredient
  const fetchRecipes = async () => {
    if (!ingredient.trim()) {
      alert('Please enter an ingredient.');
      return;
    }

    setLoading(true);
    setError('');
    setRecipes([]);

    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient.trim()}`
      );

      if (response.data.meals) {
        setRecipes(response.data.meals);
      } else {
        setError('No recipes found for this ingredient.');
      }
    } catch (err) {
      setError('Failed to fetch recipes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Filter recipes based on mood
  const fetchMoodRecipes = () => {
    if (!mood) {
      alert('Please select a mood.');
      return;
    }

    const moodMapping = {
      comfort: ['comfort', 'pasta', 'cheese'],
      quick: ['quick', 'salad'],
      healthy: ['healthy', 'chicken'],
    };

    const filteredRecipes = recipes.filter((recipe) =>
      moodMapping[mood].some((keyword) =>
        recipe.strMeal.toLowerCase().includes(keyword)
      )
    );

    if (filteredRecipes.length > 0) {
      setRecipes(filteredRecipes);
    } else {
      alert('No recipes found for the selected mood.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Cooking Assistant</h1>

      {/* Ingredient Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter an ingredient"
          value={ingredient}
          onChange={handleIngredientChange}
          className="w-full p-2 border rounded-lg"
        />
        <button
          onClick={fetchRecipes}
          className="mt-2 w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Search Recipes
        </button>
      </div>

      {/* Mood Selector */}
      <div className="mb-4">
        <select
          value={mood}
          onChange={handleMoodChange}
          className="w-full p-2 border rounded-lg"
        >
          <option value="">Select Mood</option>
          <option value="comfort">Comfort Food</option>
          <option value="quick">Quick Meals</option>
          <option value="healthy">Healthy Options</option>
        </select>
        <button
          onClick={fetchMoodRecipes}
          className="mt-2 w-full p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Get Mood-Based Recipes
        </button>
      </div>

      {/* Loading State */}
      {loading && <p className="text-center">Loading...</p>}

      {/* Error Message */}
      {error && (
        <div className="text-center p-2 bg-red-500 text-white rounded-lg">
          {error}
        </div>
      )}

      {/* Recipe List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.idMeal}
            className="border p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="mt-2 font-medium text-center">{recipe.strMeal}</h3>
          </div>
        ))}
      </div>

      {/* No Recipes Fallback */}
      {!loading && !error && recipes.length === 0 && (
        <p className="text-center mt-4">No recipes to display.</p>
      )}
    </div>
  );
};

export default App;
