import Link from "next/link";
import Navbar from "./../components/Navbar";
import { useSession, getSession } from "next-auth/react";
import ToDo from "../components/ToDo";

function Employee() {
  // const [session, loading] =useSession();
  // console.log(session)
  // console.log(loading)
  //const [session, loading] = useSession();
  //console.log(session)
  //console.log(loading)

  return (
    <>
      <Navbar />

      <h2 className="text-3xl my-5 p-2 font-extrabold text-center">
        Customer Page
      </h2>

      <ToDo />
    </>
  );
}

export default Employee;
