import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Login from "../components/Login";
import { getSession } from "next-auth/react";
import AddUser from "../components/AddUser";
import UserList from "../components/UserList";
import ToDo from "../components/ToDo";

export default function Home({ session }) {
  const [token, setToken] = useState();
  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <div>
      <Head>
        <title>Grocery Express</title>
      </Head>
      <Navbar />

      <main>
        <ToDo />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
