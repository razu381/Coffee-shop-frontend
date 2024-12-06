import React, { useEffect, useState } from "react";
import { Link, useActionData } from "react-router-dom";

function Home() {
  let [coffes, setCoffes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/coffes")
      .then((res) => res.json())
      .then((data) => setCoffes(data));
  }, []);
  console.log(coffes);

  function handleDelete(id) {
    console.log(id);

    fetch(`http://localhost:3000/coffes/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let remainingCoffes = coffes.filter((coffe) => coffe._id != id);
        setCoffes(remainingCoffes);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <h2 className="font-bold text-2xl text-center mt-10">Coffe list</h2>
      <div className="my-9 grid grid-cols-3 gap-5 px-10">
        {coffes.map((coffe) => (
          <a
            href="#"
            className="group relative block overflow-hidden"
            key={coffe._id}
          >
            <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
              <span className="sr-only">Wishlist</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>

            <img
              src={
                coffe.photo
                  ? coffe.photo
                  : "https://cdn.pixabay.com/photo/2020/01/31/12/30/coffe-4807889_1280.jpg"
              }
              alt=""
              className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
            />

            <div className="relative border border-gray-100 bg-white p-6">
              <p className="text-gray-700">Supplier: {coffe.supplier}</p>

              <h3 className="mt-1.5 text-lg font-medium text-gray-900">
                {coffe.name}
              </h3>

              <p className="mt-1.5 line-clamp-3 text-gray-700">
                {coffe.details}
              </p>

              <div className="flex gap-2 mt-5">
                <Link to={`/coffes/${coffe._id}`} className="flex-1">
                  <button className="block w-full rounded bg-green-400 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105">
                    Read more
                  </button>
                </Link>

                <Link to={`/updatecoffe/${coffe._id}`} className="flex-1">
                  <button
                    type="button"
                    className="block w-full rounded bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
                  >
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() => handleDelete(coffe._id)}
                  type="button"
                  className="block w-full rounded bg-red-500 px-4 py-3 text-sm font-medium text-white transition hover:scale-105 flex-1"
                >
                  X
                </button>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Home;
