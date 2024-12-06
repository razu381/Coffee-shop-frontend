import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

function Users() {
  let [users, setUsers] = useState(useLoaderData());
  console.log(users);

  function handleDelete(id) {
    //console.log(id);

    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((deletedData) => {
        let remaining = users.filter((user) => user._id != id);
        setUsers(remaining);
        console.log(deletedData);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="flex flex-col items-center">
      <h2 className="font-bold text-2xl text-center my-6">List of users</h2>

      <table className="border border-gray-400 border-collapse">
        <thead>
          <tr>
            <td className="border border-gray-300 p-2">Name</td>
            <td className="border border-gray-300 p-2">Email</td>
            <td className="border border-gray-300 p-2">Last logged in at: </td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">
                {user.lastSignInTime}
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white px-5 py-1"
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
