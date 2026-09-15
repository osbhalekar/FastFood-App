import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import classes from "../assets/css/Viewfoodmenu.module.css";

const URL = "https://6a71d7b7f687776c13f0b4ea.mockapi.io/dashboard";

const Viewfoodmenu = () => {
  const { id } = useParams();

  const [food, setFood] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${URL}/foodMenu/${id}`)
      .then((response) => {
        setFood(response.data);
        if (response.data.foodCategoryId) {
          axios
            .get(`${URL}/foodCategory/${response.data.foodCategoryId}`)
            .then((catRes) => setCategory(catRes.data))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Could not load this dish.");
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
      <p className={classes.eyebrow}>DISH DETAILS</p>

      <h1>
        Food <span>Menu</span>
      </h1>

      {food && (
        <div className={classes.card}>
          <img
            src={food.imageurl}
            alt={food.foodName}
            className={classes.image}
          />

          <div className={classes.details}>
            <h2>{food.foodName}</h2>

            <p>
              <strong>ID:</strong> {food.id}
            </p>

            <p>
              <strong>Category:</strong> {category ? category.cname : "—"}
            </p>

            <p>
              <strong>Price:</strong> ₹{food.price}
            </p>

            {food.discount ? (
              <p>
                <strong>Discount:</strong> {food.discount}%
              </p>
            ) : null}

            {food.calories ? (
              <p>
                <strong>Calories:</strong> {food.calories}
              </p>
            ) : null}

            <p>
              <strong>Spicy:</strong> {food.spicy ? "Yes" : "No"}
            </p>

            <p>
              <strong>Description:</strong>
            </p>

            <p>{food.foodDescription}</p>

            <Link to="/listfoodmenu" className={classes.backBtn}>
              Back to Menu
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}

export default Viewfoodmenu;