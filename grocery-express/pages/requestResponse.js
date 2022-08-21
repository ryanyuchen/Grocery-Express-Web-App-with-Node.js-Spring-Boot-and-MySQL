import { withRouter } from "next/router";
import Navbar from "../components/Navbar";
import Link from "next/link";

function RequestResponse() {
  return (
    <>
      <Navbar />
      <div class="text-center align-middle bg-center shadow rounded">
        <h1 class="text-3xl my-5 p-2 font-extrabold text-center">
          Item requested successfully
        </h1>
        <Link href="customer_main_page">
          <button className="text-xl my-5 p-2 font-bold text-blue-900/100">
            Click Here to go back to Customer Page
          </button>
        </Link>
      </div>
    </>
  );
}

export default withRouter(RequestResponse);
