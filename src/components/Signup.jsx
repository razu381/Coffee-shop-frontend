import React, { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import swal from "sweetalert";

function Signup() {
  let { createUser } = useContext(AuthContext);

  function handleSignUp(e) {
    e.preventDefault();
    let name = e.target.name.value;
    let email = e.target.email.value;
    let pass = e.target.pass.value;
    let newUser = { email, name };

    createUser(email, pass)
      .then((signupInfo) => {
        console.log("New uer signed up ", signupInfo.user);
        newUser.lastSignInTime = signupInfo.user.metadata
          ? signupInfo.user.metadata.lastSignInTime
          : "";
        swal({
          title: "Good job!",
          text: `New user ${signupInfo.user?.email} is created!`,
          icon: "success",
        });
        console.log(newUser);
        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => alert(err.message));
  }
  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 bg-black">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Sign up today!
          </h1>

          <p className="mt-4 text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
            nulla eaque error neque ipsa culpa autem, at itaque nostrum!
          </p>
        </div>

        <form
          onSubmit={handleSignUp}
          action="#"
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>

            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="name"
                name="name"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
                name="email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
                name="pass"
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
