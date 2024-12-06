import React from "react";
import { useLoaderData, useParams } from "react-router-dom";

function UpdateCoffe() {
  let coffe = useLoaderData();
  let { _id, name, chef, details, supplier, photo } = coffe;
  //console.log(coffe);
  function handleUpdate(e) {
    e.preventDefault();
    let form = e.target;
    let name = form.name.value;
    let chef = form.chef.value;
    let supplier = form.supplier.value;
    let details = form.details.value;
    let photo = form.photo.value;

    let updatedCoffe = { name, chef, details, supplier, photo };

    console.log("This is our form submission", updatedCoffe);
    fetch(`http://localhost:3000/coffes/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedCoffe),
    })
      .then((res) => res.json())
      .then((data) => console.log("data after updating coffe to server ", data))
      .catch((err) => console.log("error from sendning new coffe ", err));
  }
  return (
    <section className="bg-gray-100 ">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
        <div className="grid gap-x-16 gap-y-8  justify-center items-center">
          <div className="rounded-lg bg-black p-8 shadow-lg lg:col-span-3 lg:p-12">
            <form
              onSubmit={(e) => handleUpdate(e)}
              action="#"
              className="space-y-4"
            >
              <div>
                <label className="sr-only" htmlFor="name">
                  Name
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Name"
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={name}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only text-white" htmlFor="email">
                    Chef
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Chef"
                    type="text"
                    name="chef"
                    defaultValue={chef}
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="phone">
                    Supplier
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="supplier"
                    type="text"
                    name="supplier"
                    defaultValue={supplier}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only text-white" htmlFor="email">
                    Details
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Details"
                    type="text"
                    name="details"
                    defaultValue={details}
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="phone">
                    Photo
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="photo"
                    type="text"
                    name="photo"
                    defaultValue={photo}
                  />
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-block w-full rounded-lg bg-blue-600 px-5 py-3 font-medium text-white sm:w-auto"
                >
                  Update Coffe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UpdateCoffe;
