import { useEffect, useState, startTransition } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import "./App.css";

// eslint-disable-next-line no-unused-vars

import LoginForm from "./components/LoginForm";
import AddEditRecipeForm from "./components/AddEditRecipeForm";
import FirebaseFirestoreService from "./FirebaseFirestoreService";

function App() {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    handleFetchRecipes();
  }, [user, categoryFilter]);

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    setUser(user);
    if (user) {
      // eslint-disable-next-line no-unused-vars
      const uid = user.uid;
    } else {
    }
  });

  const handleFetchRecipes = async () => {
    const queryObj = {
      field: "isPublished",
      condition: "==",
      value: true,
    };
    setIsLoading(true);
    try {
      const fetchedRecipesResponse = FirebaseFirestoreService.readDocuments({
        user,
        queryObj,
      });
      fetchedRecipesResponse
        .then((recipesData) => {
          setRecipes(recipesData);
        })
        .finally(() => setIsLoading(false));
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAddRecipe = async (newRecipe) => {
    const queryObj = {
      field: "category",
      condition: "==",
      value: "eggsAndBreakfast",
    };
    try {
      await FirebaseFirestoreService.createDocument(newRecipe);

      handleFetchRecipes({ user, queryObj });
      alert("successfully added document");
    } catch (error) {
      alert(error.message, "here");
    }
  };

  const lookupCategoryLabel = (categoryKey) => {
    const categories = {
      breadsSandwitchesAndPizza: "Breads, Sandwiches and Pizza",
      eggsAndBreakfast: "Eggs and Breakfast",
      dessertsAndBakedGoods: "Desserts and Baked Goods",
      fishAndSeafood: "Fish and Seafood",
      vegetables: "Vegetables",
    };

    const label = categories[categoryKey];

    return label;
  };

  const formatDate = (date) => {
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getFullYear();

    const dateString = `${day}-${month}-${year}`;

    return dateString;
  };

  const handleUpdateRecipe = async (newRecipeValues, recipeId) => {
    try {
      await FirebaseFirestoreService.updateDocument(recipeId, newRecipeValues);

      handleFetchRecipes();

      alert("successfully updated recipe =", recipeId);
    } catch (error) {
      alert(error.message);
      throw error;
    }
  };

  const handleEditRecipeClick = (recipeId) => {
    const selectedRecipe = recipes.find((recipe) => recipe.id === recipeId);

    if (selectedRecipe) {
      startTransition(() => {
        setCurrentRecipe(selectedRecipe);
        window.scrollTo(0, document.body.scrollHeight);
      });
    }
  };

  const handleEditRecipeCancel = () => {
    setCurrentRecipe(null);
  };

  const handleDeleteRecipe = (id) => {
    FirebaseFirestoreService.deleteDocument(id);
    handleFetchRecipes();
    setCurrentRecipe(null);
  };

  return (
    <div className="App">
      <div className="title-row">
        <h1 className="title">Firebase recipes</h1>

        <LoginForm existingUser={user} />
      </div>
      <div className="main">
        <div className="center">
          <div className="recipe-list-box">
            {isLoading ? (
              <div className="fire">
                <div className="flames">
                  <div className="flame"></div>
                  <div className="flame"></div>
                  <div className="flame"></div>
                  <div className="flame"></div>
                </div>
                <div className="logs"></div>
              </div>
            ) : null}
            {!isLoading && recipes && recipes.length === 0 ? (
              <h5 className="no-recipes">No Recipes Found</h5>
            ) : null}
            {recipes && recipes.length > 0 ? (
              <div className="recipe-list">
                {recipes.map((recipe) => {
                  return (
                    <div className="recipe-card" key={recipe?.id}>
                      {recipe.isPublished === false ? (
                        <div>
                          <h3 className="unpublished">Unpublished</h3>
                        </div>
                      ) : null}
                      <div className="recipe-name">{recipe?.name}</div>
                      <div className="recipe-image-box">
                        {recipe.imageUrl ? (
                          <img
                            src={recipe.imageUrl}
                            alt={recipe.name}
                            className="recipe-image"
                          />
                        ) : null}
                      </div>
                      <div className="recipe-field">
                        Category: {lookupCategoryLabel(recipe?.category)}
                      </div>
                      <div className="recipe-field">
                        Publish Date: {formatDate(recipe?.publishDate)}
                      </div>
                      {user ? (
                        <>
                          <button
                            className="primary-button edit-button"
                            type="button"
                            onClick={() => handleEditRecipeClick(recipe.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="primary-button action-button"
                            type="button"
                            onClick={() => handleDeleteRecipe(recipe.id)}
                          >
                            Delete
                          </button>
                        </>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
        {user ? (
          <AddEditRecipeForm
            handleAddRecipe={handleAddRecipe}
            existingRecipe={currentRecipe}
            handleUpdateRecipe={handleUpdateRecipe}
            handleEditRecipeCancel={handleEditRecipeCancel}
            handleDeleteRecipe={handleDeleteRecipe}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
