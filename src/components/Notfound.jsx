
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <main className="container grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 ">
      <span className="d-block fw-bold mb-3 text-5xl font-bold text-indigo-600 dark:text-indigo-400">
        404
      </span>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
        Page not found
      </h1>
      <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Link
        to="/"
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold shadow-xs"
      >
        Go back home
      </Link>
    </main>
  );
}

export default Notfound;
