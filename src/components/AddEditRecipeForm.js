import { useState, useEffect } from "react";
import ImageUploadPreview from "./ImageUploadPreview";

const AddEditRecipeForm = ({
  existingRecipe,
  handleUpdateRecipe,
  handleEditRecipeCancel,
  handleAddRecipe,
}) => {
  useEffect(() => {
    if (existingRecipe) {
      setName(existingRecipe.name);
      setCategory(existingRecipe.category);
      setDirections(existingRecipe.directions);
      setPublishDate(existingRecipe.publishDate.toISOString().split("T")[0]);
      setIngredients([...existingRecipe.ingredients]);
      setImageUrl("");
    } else {
      resetForm();
    }
  }, [existingRecipe]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [publishDate, setPublishDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [directions, setDirections] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleAddIngredient = (e) => {
    if (e.key && e.key !== "Enter") {
      return;
    }

    e.preventDefault();

    if (!ingredientName) {
      alert("Missing ingredient field, please double check");
      return;
    }

    setIngredients([...ingredients, ingredientName]);
    setIngredientName("");
  };

  const handleRecipeFormSubmit = (e) => {
    e.preventDefault();

    if (ingredients.length === 0) {
      alert("Ingredients cannot be empty. Please add at least 1 ingredient");
    }

    if (!imageUrl) {
      alert("Missing recipe image. Please add a recipe image.");
      return;
    }

    const isPublished = new Date(publishDate) <= new Date() ? true : false;

    const newRecipe = {
      name,
      category,
      directions,
      publishDate: new Date(publishDate),
      isPublished,
      ingredients,
      imageUrl,
    };

    if (existingRecipe) {
      handleUpdateRecipe(newRecipe, existingRecipe.id);
    } else {
      handleAddRecipe(newRecipe);
    }

    resetForm();
  };

  const resetForm = () => {
    setName("");
    setCategory("");
    setDirections("");
    setPublishDate("");
    setIngredients([]);
    setImageUrl("");
  };

  return (
    <form
      onSubmit={handleRecipeFormSubmit}
      className="add-edit-recipe-form-container"
    >
      {existingRecipe ? <h2>Update Recipe</h2> : <h2>Add a New Recipe</h2>}
      <div className="top-form-section">
        <div className="image-input-box">
          Recipe Image
          <ImageUploadPreview
            basePath="recipes"
            existingImageUrl={imageUrl}
            handleUploadFinish={(downloadUrl) => setImageUrl(downloadUrl)}
            handleUploadCancel={() => setImageUrl("")}
          ></ImageUploadPreview>
        </div>
        <div className="fields">
          <label className="recipe-label input-label">
            Recipe name:
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-text"
            />
          </label>
          <label className="recipe-label input-label">
            Category:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select"
              required
            >
              <option value={""}></option>
              <option value={"breadsSandwitchesAndPizza"}>
                Breads, Sandwiches and Pizza
              </option>
              <option value={"eggsAndBreakfast"}>Eggs and Breakfast</option>
              <option value={"dessertsAndBakedGoods"}>
                Desserts and Baked Goods
              </option>
              <option value={"fishAndSeafood"}>Fish and Seafood</option>
              <option value={"vegetables"}>Vegetables</option>
            </select>
          </label>
          <label className="recipe-label input-label">
            Directions:
            <textarea
              required
              value={directions}
              onChange={(e) => setDirections(e.target.value)}
              className="input-text directions"
            ></textarea>
          </label>
          <label className="recipe-label input-label">
            Publish Date:
            <input
              type="date"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              className="input-text"
            ></input>
          </label>
          <div className="ingredients-list">
            <h3 className="text-center">Ingredients</h3>
            <table className="ingredients-table">
              <thead>
                <tr>
                  <th className="table-header">Ingredient</th>
                  <th className="table-header">Delete</th>
                </tr>
              </thead>
              <tbody>
                {ingredients && ingredients.length > 0
                  ? ingredients.map((ingredient) => {
                      return (
                        <tr key={ingredient}>
                          <td className="table-data text-center">
                            {ingredient}
                          </td>
                          <td className="ingredient-delete-box">
                            <button
                              type="button"
                              className="secondary-button ingredient-delete-button"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
            {ingredients && ingredients.length === 0 ? (
              <h3 className="text-center no-ingredients">
                No Ingredients Added Yet
              </h3>
            ) : null}
            <div className="ingredient-form">
              <label className="ingredient-label">
                Ingredient:
                <input
                  type="text"
                  value={ingredientName}
                  onKeyUp={handleAddIngredient}
                  onChange={(e) => setIngredientName(e.target.value)}
                  className="input-text"
                  placeholder="ex. 1 cup of sugar"
                />
              </label>
              <button
                className="primary-button add-ingredient-button"
                type="button"
                onClick={handleAddIngredient}
              >
                Add Ingredient
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="action-buttons">
        <button className="primary-button action-button">
          {existingRecipe ? "Edit Recipe" : "Add Recipe"}
        </button>
        {existingRecipe ? (
          <>
            <button
              type="button"
              className="primary-button action-button"
              onClick={handleEditRecipeCancel}
            >
              Cancel
            </button>
          </>
        ) : null}
      </div>
    </form>
  );
};

export default AddEditRecipeForm;
