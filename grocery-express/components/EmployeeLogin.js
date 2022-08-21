import React, { useState } from "react";
import { useSession, getCsrfToken,getSession } from "next-auth/react";
import Navbar from "./Navbar";
import PropTypes from "prop-types";

async function loginUser(credentials) {
  return fetch("http://localhost:9090/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json())
  ;
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const { data: session, status } = useSession();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser({
      username,
      password,
    });
    //setToken(res && res.data.token);
    //localStorage.removeItem('role');
    if (res.code != '200'){
    alert(res.msg)
    } else if (res.data.role==0) {
    alert('You do not have the privilege to view the next page')
    }
    else {setToken(res && res.data.token);
      localStorage.setItem('token', res.data.token)
      //localStorage.setItem('role',res.data.role)
    }
    
  };


  return (
    <div>
      <Navbar />
      <div className="container mx-auto my-8">
        <h2 className="text-3xl my-5 p-2 font-extrabold">Employee</h2>
        <form className="px-2">
          <label className="py-3">
            <p className="text-xl font-extralight">Username</p>
            <input
              type="text"
              class="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="UserName"
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>
          <label className="py-3">
            <p className="text-xl font-extralight">Password</p>
            <input
              type="password"
              class="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </form>
      </div>
      <div className="container mx-auto my-8">
        <div className="h-12">
          <button
            onClick={handleSubmit}
            className="rounded bg-blue-600 text-white px-6 py-2 font-semibold"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
    // <div>
    //   <Navbar />
    //   <div className="container mx-auto my-8">
    //     <h1 className="capitalize">Admin</h1>
    //     <form>
    //       <label>
    //         <p>Username</p>
    //         <input
    //           type="text"
    //           class="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
    //           placeholder="UserName"
    //           onChange={(e) => setUserName(e.target.value)}
    //         />
    //       </label>
    //       <label>
    //         <p>Password</p>
    //         <input
    //           type="password"
    //           class="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
    //           placeholder="Password"
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //       </label>
    //     </form>
    //   </div>
    //   <div className="container mx-auto my-8">
    //     <div className="h-12">
    //       <button
    //         onClick={handleSubmit}
    //         className="rounded bg-blue-600 text-white px-6 py-2 font-semibold"
    //       >
    //         Sign In
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
