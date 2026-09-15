
// Shree Ganesh
import classes from "../assets/css/Home.module.css";

const Home = () => {
  return (
    <div className={`${classes.home} col-12 col-md-9 col-lg-10`}>
      <p className={classes.eyebrow}>ADMIN DASHBOARD</p>

      <h1>
        Welcome to <span>Dashboard</span>
      </h1>

      <p className={classes.sub}>Welcome to the admin panel.</p>
    </div>
  );
}

export default Home;