
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import axios from "axios";
import classes from "../assets/css/Addfood.module.css";

const BASE_URL = "https://6a71d7b7f687776c13f0b4ea.mockapi.io/dashboard";

const Addfood = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/foodCategory`)
      .then((response) => setCategories(response.data))
      .catch((err) => console.log(err))
      .finally(() => setCategoriesLoading(false));
  }, []);

  return (
    <main className={classes.page}>
      <section className={classes.hero}>
        <p className={classes.eyebrow}>ADD A DISH</p>
        <h1 className={classes.heroTitle}>
          Put it on the <span className={classes.accent}>menu</span>.
        </h1>
        <p className={classes.heroSub}>
          Fill in the details below — it'll show up on the menu right after you
          save it.
        </p>
      </section>

      <Formik
        initialValues={{
          foodCategoryId: "",
          foodName: "",
          foodDescription: "",
          price: "",
          calories: "",
          discount: "",
          spicy: false,
          imageurl: "",
        }}
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
            errors.foodDescription = "A short description helps people decide";
          }
          if (!values.price || Number(values.price) <= 0) {
            errors.price = "Enter a price greater than 0";
          }
          if (!values.imageurl.trim()) {
            errors.imageurl = "Add an image URL";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitError("");
          const payload = {
            ...values,
            price: Number(values.price),
            calories: values.calories ? Number(values.calories) : undefined,
            discount: values.discount ? Number(values.discount) : 0,
          };
          axios
            .post(`${BASE_URL}/foodMenu`, payload)
            .then(() => {
              resetForm();
              navigate("/fastfoods");
            })
            .catch((err) => {
              console.log(err);
              setSubmitError(
                err.response?.data?.message ||
                  "Could not save this dish. Try again.",
              );
            })
            .finally(() => setSubmitting(false));
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
                disabled={categoriesLoading}
              >
                <option value="">
                  {categoriesLoading
                    ? "Loading categories…"
                    : "Select a category"}
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.cname}
                  </option>
                ))}
              </select>
              <p className={classes.error}>
                {errors.foodCategoryId &&
                  touched.foodCategoryId &&
                  errors.foodCategoryId}
              </p>
            </div>

            <div className={classes.field}>
              <label htmlFor="foodName" className={classes.label}>
                Food name
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
              <p className={classes.error}>
                {errors.foodName && touched.foodName && errors.foodName}
              </p>
            </div>

            <div className={classes.field}>
              <label htmlFor="foodDescription" className={classes.label}>
                Description
              </label>
              <textarea
                id="foodDescription"
                name="foodDescription"
                rows={3}
                placeholder="Short, tasty description of the dish"
                className={classes.textarea}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.foodDescription}
              />
              <p className={classes.error}>
                {errors.foodDescription &&
                  touched.foodDescription &&
                  errors.foodDescription}
              </p>
            </div>

            <div className={classes.row}>
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
                <p className={classes.error}>
                  {errors.price && touched.price && errors.price}
                </p>
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
            </div>

            <div className={classes.row}>
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
              <div className={classes.checkboxField}>
                <label className={classes.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="spicy"
                    checked={values.spicy}
                    onChange={handleChange}
                  />
                  Spicy
                </label>
              </div>
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
              <p className={classes.error}>
                {errors.imageurl && touched.imageurl && errors.imageurl}
              </p>
            </div>

            {submitError && (
              <p className={classes.submitError}>{submitError}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={classes.submitBtn}
            >
              {isSubmitting ? "Saving…" : "Add to menu"}
            </button>
          </form>
        )}
      </Formik>
    </main>
  );
}

export default Addfood;