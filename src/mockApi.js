// src/mockApi.js

export const getMeals = () => {
    return {
      meals: [
        {
          strMeal: "Bubble & Squeak",
          strMealThumb: "https://www.themealdb.com/images/media/meals/xusqvw1511638311.jpg",
          idMeal: "52885"
        },
        {
          strMeal: "Apam balik",
          strMealThumb: "https://www.themealdb.com/images/media/meals/adxcbq1619787919.jpg",
          idMeal: "53049"
        },
        {
          strMeal: "Apple & Blackberry Crumble",
          strMealThumb: "https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg",
          idMeal: "52893"
        },
        {
          strMeal: "Apple Frangipan Tart",
          strMealThumb: "https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg",
          idMeal: "52768"
        },
        // Add more meals as needed...
      ]
    };
  };