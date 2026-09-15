
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import axios from "axios";
import classes from "../assets/css/Addcategory.module.css";

const URL = "https://6a71d7b7f687776c13f0b4ea.mockapi.io/dashboard";

const API_URL = `${URL}/foodCategory`;

const Addcategory = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");

  return (
    <main className={classes.page}>
      <section className={classes.hero}>
        <p className={classes.eyebrow}>ADD A CATEGORY</p>

        <h1 className={classes.heroTitle}>
          Add new <span>category</span>
        </h1>

        <p className={classes.heroSub}>
          Create a new food category for your menu.
        </p>
      </section>

      <Formik
        initialValues={{
          cname: "",
          cimage: "",
          cdescription: "",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.cname.trim()) {
            errors.cname = "Give the category a name";
          }

          if (!values.cimage.trim()) {
            errors.cimage = "Add an image URL";
          }

          if (!values.cdescription.trim()) {
            errors.cdescription = "Add a short description";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitError("");

          axios
            .post(API_URL, values)
            .then(() => {
              resetForm();
              navigate("/listcategory");
            })
            .catch((err) => {
              console.log(err);

              setSubmitError(
                err.response?.data?.message ||
                  "Could not save this category. Try again.",
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
              <label htmlFor="cname" className={classes.label}>
                Category Name
              </label>

              <input
                id="cname"
                name="cname"
                type="text"
                placeholder="e.g. Burgers"
                className={classes.input}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cname}
              />

              {errors.cname && touched.cname && (
                <p className={classes.error}>{errors.cname}</p>
              )}
            </div>

            <div className={classes.field}>
              <label htmlFor="cimage" className={classes.label}>
                Image URL
              </label>

              <input
                id="cimage"
                name="cimage"
                type="text"
                placeholder="https://..."
                className={classes.input}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cimage}
              />

              {errors.cimage && touched.cimage && (
                <p className={classes.error}>{errors.cimage}</p>
              )}
            </div>

            <div className={classes.field}>
              <label htmlFor="cdescription" className={classes.label}>
                Description
              </label>

              <textarea
                id="cdescription"
                name="cdescription"
                rows={4}
                placeholder="Short description of this category"
                className={classes.textarea}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cdescription}
              />

              {errors.cdescription && touched.cdescription && (
                <p className={classes.error}>{errors.cdescription}</p>
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
              {isSubmitting ? "Saving..." : "Add Category"}
            </button>
          </form>
        )}
      </Formik>
    </main>
  );
};

export default Addcategory;
