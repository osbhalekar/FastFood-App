import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import axios from "axios";
import classes from "../assets/css/Addfood.module.css";

const BASE_URL = "https://6a71d7b7f687776c13f0b4ea.mockapi.io/dashboard";

const Editfoodmenu = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [submitError, setSubmitError] = useState("");
  const [initialValues, setInitialValues] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get(`${BASE_URL}/foodMenu/${id}`),
      axios.get(`${BASE_URL}/foodCategory`),
    ])
      .then(([foodRes, categoryRes]) => {
        setInitialValues({
          foodCategoryId: foodRes.data.foodCategoryId || "",
          foodName: foodRes.data.foodName || "",
          foodDescription: foodRes.data.foodDescription || "",
          price: foodRes.data.price ?? "",
          calories: foodRes.data.calories ?? "",
          discount: foodRes.data.discount ?? "",
          spicy: foodRes.data.spicy || false,
          imageurl: foodRes.data.imageurl || "",
        });
        setCategories(categoryRes.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className={classes.page}>
      <section className={classes.hero}>
        <p className={classes.eyebrow}>EDIT DISH</p>

        <h1 className={classes.heroTitle}>
          Edit <span>dish</span>
        </h1>

        <p className={classes.heroSub}>
          Update the details of this menu item.
        </p>
      </section>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validate={(values) => {
          const errors = {};

          if (!values.foodCategoryId) {
            errors.foodCategoryId = "Choose a category";
          }

          if (!values.foodName.trim()) {
            errors.foodName = "Give the dish a name";
          }

          if (!values.foodDescription.trim()) {
            errors.foodDescription = "Add a short description";
          }

          if (!values.price || Number(values.price) <= 0) {
            errors.price = "Enter a price greater than 0";
          }

          if (!values.imageurl.trim()) {
            errors.imageurl = "Add an image URL";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitError("");

          const payload = {
            ...values,
            price: Number(values.price),
            calories: values.calories ? Number(values.calories) : undefined,
            discount: values.discount ? Number(values.discount) : 0,
          };

          axios
            .put(`${BASE_URL}/foodMenu/${id}`, payload)
            .then(() => {
              alert("Changes saved");
              navigate(`/viewfoodmenu/${id}`);
              setSubmitting(false);
            })
            .catch((err) => {
              console.log(err);

              setSubmitError(
                err.response?.data?.message ||
                  "Could not update this dish. Try again.",
              );
              setSubmitting(false);
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className={classes.form}>
            <div className={classes.field}>
              <label htmlFor="foodCategoryId" className={classes.label}>
                Category
              </label>

              <select
                id="foodCategoryId"
                name="foodCategoryId"
                className={classes.select}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.foodCategoryId}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.cname}
                  </option>
                ))}
              </select>

              {errors.foodCategoryId && touched.foodCategoryId && (
                <p className={classes.error}>{errors.foodCategoryId}</p>
              )}
            </div>

            <div className={classes.field}>
              <label htmlFor="foodName" className={classes.label}>
                Food Name
              </label>

              <input
                id="foodName"
                name="foodName"
                type="text"
                placeholder="e.g. Smoky BBQ Cheeseburger"
                className={classes.input}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.foodName}
              />

              {errors.foodName && touched.foodName && (
                <p className={classes.error}>{errors.foodName}</p>
              )}
            </div>

            <div className={classes.field}>
              <label htmlFor="foodDescription" className={classes.label}>
                Description
              </label>

              <textarea
                id="foodDescription"
                name="foodDescription"
                rows={4}
                placeholder="Short description of this dish"
                className={classes.textarea}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.foodDescription}
              />

              {errors.foodDescription && touched.foodDescription && (
                <p className={classes.error}>{errors.foodDescription}</p>
              )}
            </div>

            <div className={classes.field}>
              <label htmlFor="price" className={classes.label}>
                Price (₹)
              </label>

              <input
                id="price"
                name="price"
                type="number"
                min="0"
                placeholder="249"
                className={classes.input}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
              />

              {errors.price && touched.price && (
                <p className={classes.error}>{errors.price}</p>
              )}
            </div>

            <div className={classes.field}>
              <label htmlFor="calories" className={classes.label}>
                Calories (optional)
              </label>

              <input
                id="calories"
                name="calories"
                type="number"
                min="0"
                placeholder="650"
                className={classes.input}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.calories}
              />
            </div>

            <div className={classes.field}>
              <label htmlFor="discount" className={classes.label}>
                Discount % (optional)
              </label>

              <input
                id="discount"
                name="discount"
                type="number"
                min="0"
                max="100"
                placeholder="10"
                className={classes.input}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.discount}
              />
            </div>

            <div className={classes.field}>
              <label className={classes.label}>
                <input
                  type="checkbox"
                  name="spicy"
                  checked={values.spicy}
                  onChange={handleChange}
                />{" "}
                Spicy
              </label>
            </div>

            <div className={classes.field}>
              <label htmlFor="imageurl" className={classes.label}>
                Image URL
              </label>

              <input
                id="imageurl"
                name="imageurl"
                type="text"
                placeholder="https://..."
                className={classes.input}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.imageurl}
              />

              {errors.imageurl && touched.imageurl && (
                <p className={classes.error}>{errors.imageurl}</p>
              )}
            </div>

            {submitError && (
              <p className={classes.submitError}>{submitError}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={classes.submitBtn}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </form>
        )}
      </Formik>
    </main>
  );
};

export default Editfoodmenu;