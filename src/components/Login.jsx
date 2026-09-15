
import classes from "../assets/css/Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link to="/" className={classes.logo}>
          SNEAKER BRANDS<span className={classes.logoDot}>.</span>
        </Link>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={{ username: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (values.username.trim().length <= 3) {
              errors.username = "Username is required";
            }
            if (values.password.length < 6) {
              errors.password = "Password must be at least 6 characters";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, setStatus }) => {
            axios
              .post("https://dummyjson.com/auth/login", values)
              .then((response) => {
                sessionStorage.setItem(
                  "accessToken",
                  response.data.accessToken,
                );
                navigate("/home");
              })
              .catch((error) => {
                setStatus(
                  error.response?.data.message || "Wrong username or password",
                );
              })
              .finally(() => {
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
            status,
          }) => (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Eg. Emilys"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-500 sm:text-sm"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                  />
                  <p className="text-red-700 text-sm">
                    {errors.username && touched.username && errors.username}
                  </p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Eg. Emilyspass"
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-500 sm:text-sm"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                  />
                  <p className="text-red-700 text-sm">
                    {errors.password && touched.password && errors.password}
                  </p>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={classes.submitBtn}
                >
                  {isSubmitting ? "Signing in…" : "Sign in"}
                </button>
              </div>

              {status && (
                <p className="text-red-800 text-sm text-center mt-2">
                  {status}
                </p>
              )}
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
