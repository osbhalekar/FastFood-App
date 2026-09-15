import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import classes from "../assets/css/Singlecategory.module.css";

const URL = "https://6a71d7b7f687776c13f0b4ea.mockapi.io/dashboard";

const Viewcategory = () => {
  const { id } = useParams();

  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${URL}/foodCategory/${id}`)
      .then((response) => {
        setCategory(response.data);
      })
      .catch((err) => {
        console.log(err);
        setError("Could not load category.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className={classes.page}>
      <p className={classes.eyebrow}>CATEGORY DETAILS</p>

      <h1>
        Food <span>Category</span>
      </h1>

      {category && (
        <div className={classes.card}>
          <img
            src={category.cimage}
            alt={category.cname}
            className={classes.image}
          />

          <div className={classes.details}>
            <h2>{category.cname}</h2>

            <p>
              <strong>ID:</strong> {category.id}
            </p>

            <p>
              <strong>Description:</strong>
            </p>

            <p>{category.cdescription}</p>

            <Link to="/listcategory" className={classes.backBtn}>
              Back to Categories
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}

export default Viewcategory;