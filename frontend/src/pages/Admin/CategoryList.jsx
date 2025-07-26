import { useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";

import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu";

const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating category failed, try again.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        setSelectedCategory(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        setSelectedCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Category delection failed. Tray again.");
    }
  };

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <AdminMenu />
      <div className="md:w-3/4 p-3">
        <div className="h-12">Manage Categories</div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />

        <div className="flex flex-wrap">
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none foucs:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                onClick={() => {
                  {
                    setModalVisible(true);
                    setSelectedCategory(category);
                    setUpdatingName(category.name);
                  }
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;



/*
so a fxn(hook) is called in the frintend fie and it goes to the ApiSlice nd sees that there is and enpoint for me and then it matches same endpoint in the routes defined in the backend code adn then uses the logic in controller to process the request?


 useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
 These are Redux Toolkit Query (RTK Query) hooks to make API calls for categories: Create, Update, Delete, Fetch All.

you're running a Pizza Shop 🍕 and you're managing your Categories like "Veg", "Non-Veg", "Cheese Lovers", etc.
You have a backend (kitchen) and a frontend (counter).
When a customer wants to add or update a category of pizza, your frontend needs to talk to the backend.
RTK Query is like your waiter who knows how to talk to the kitchen. You just call them, and they handle the rest.
You don't need to go to the kitchen yourself.

Action	RTK Query Hook / Mutation	Real World Example
Get all categories	useFetchCategoriesQuery()	Show me all pizzas on the menu
Add new category	useCreateCategoryMutation()	Add a new pizza category (like "Spicy")
Update a category	useUpdateCategoryMutation()	Change name of "Veg" to "Veg Deluxe"
Delete a category	useDeleteCategoryMutation()	Remove the "Expired Specials" category

LN 15
data: categories means "get data from the response and rename it as categories"

LN 21
RTK Query hooks like useCreateCategoryMutation return an array, and you’re pulling out the first item from that array (which is the actual function you use to trigger the API call). this is called array destructuring

LN 34
Normally, createCategory() returns a special "wrapped" result object with info about whether the call was successful, loading, error, etc.
.unwrap() gets you the actual response body or throws an error if it fails.

If the API succeeds, you get the actual data.
If it fails, it throws, so your catch block will handle it.

LN 26
Without e.preventDefault(), the page reloads and all your progress or API call vanishes and we lose the current state

LN 108
This loops over all the categories fetched from the API and renders a button for each one.

useCreateCategoryMutation and others, is a custom hook that is automatically created by RTK Query when you define API endpoints.

Exactly! The main job of these hooks (like useCreateCategoryMutation, useGetProductsQuery, etc.) is to send requests to API endpoints and manage the data fetching process.

*/

