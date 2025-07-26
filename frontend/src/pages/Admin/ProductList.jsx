import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  // useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    brand: "",
    countInStock: "",
  });
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  // const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = new FormData();

    // Append all fields
    Object.entries(form).forEach(([key, val]) => {
      productData.append(key, val);
    });

    // Append the image file
    productData.append("image", image);

    try {
      const data = await createProduct(productData).unwrap();
      toast.success(`${data.name} is created`);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.error || "Product creation failed.");
    }
  };


  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageUrl(URL.createObjectURL(file));
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu/>
        <div className="md:w-3/4 p-3">
          <h2 className="text-2xl font-bold mb-4 text-white">Create Product</h2>

          {imageUrl && (
            <div className="text-center mb-4">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px] rounded-md"
              />
            </div>
          )}

          <div className="mb-5">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-10 bg-[#101011]">
              {image ? image.name : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
              />
            </label>
          </div>

          <div className="space-y-5">
            {[
              ["name", "text"],
              ["price", "number"],
              ["quantity", "number"],
              ["brand", "text"],
              ["countInStock", "number"],
            ].map(([field, type]) => (
              <div key={field}>
                <label htmlFor={field} className="block text-white capitalize">
                  {field}
                </label>
                <input
                  type={type}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="p-4 w-[30rem] border rounded-lg bg-[#101011] text-white"
                />
              </div>
            ))}

            <div>
              <label htmlFor="description" className="block text-white mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                className="p-4 w-full border rounded-lg bg-[#101011] text-white"
              ></textarea>
            </div>

            <div>
              <label htmlFor="category" className="block text-white">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="p-4 w-[30rem] border rounded-lg bg-[#101011] text-white"
              >
                <option value="">Select a category</option>
                {categories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSubmit}
              className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600 text-white"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;