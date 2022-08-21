import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Navbar from "./Navbar";
import PropTypes from "prop-types";
import AddUser from "./AddUser";
import { useRouter } from "next/router";

async function loginUser(credentials) {
  return fetch("http://localhost:9090/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser({
      username,
      password,
    });
    //setToken(res && res.data.token);
    if (res.code != "200") {
      alert(res.msg);
    } else {
      setToken(res && res.data.token);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto my-8 p-10">
        <div className="h-12">
          <button
            className="rounded bg-blue-600 text-white px-6 py-2 font-semibold mr-4"
            onClick={() => {
              router.push("/customer_index");
            }}
          >
            Customer Please Click Here to Log In
          </button>

          <a href="employee_index">
            <button className="rounded bg-blue-600 text-white px-6 py-2 font-semibold">
              Employee Please Click Here to Log In
            </button>
          </a>
        </div>
        <AddUser />
      </div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
