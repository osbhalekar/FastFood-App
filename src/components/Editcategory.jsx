
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import axios from "axios";
import classes from "../assets/css/Addcategory.module.css";

const URL = "https://6a71d7b7f687776c13f0b4ea.mockapi.io/dashboard";

const API_URL = `${URL}/foodCategory`;

const Editcategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [submitError, setSubmitError] = useState("");
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/${id}`)
      .then((response) => {
        setInitialValues({
          cname: response.data.cname || "",
          cimage: response.data.cimage || "",
          cdescription: response.data.cdescription || "",
        });
      })
      .catch((err) => {
        console.log(err);
        setLoadError("Could not load this category.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (loadError) {
    return <p>{loadError}</p>;
  }

  return (
    <main className={classes.page}>
      <section className={classes.hero}>
        <p className={classes.eyebrow}>EDIT CATEGORY</p>

        <h1 className={classes.heroTitle}>
          Edit <span>category</span>
        </h1>

        <p className={classes.heroSub}>
          Update the details of this food category.
        </p>
      </section>

      <Formik
        initialValues={initialValues}
        enableReinitialize
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
        onSubmit={(values, { setSubmitting }) => {
          setSubmitError("");

          axios
            .put(`${API_URL}/${id}`, values)
            .then(() => {
              alert("Changes saved");
              navigate("/listcategory");
            })
            .catch((err) => {
              console.log(err);

              setSubmitError(
                err.response?.data?.message ||
                  "Could not update this category. Try again.",
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
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </form>
        )}
      </Formik>
    </main>
  );
};

export default Editcategory;
