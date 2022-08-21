import { React } from "react";
import Link from "next/link";

const CustomerPage = () => {
  return (
    <>
      <div className="container mx-auto my-8">
        <div className="flex shadow border-b">
          <ul>
            <li>
              <Link href="customer_main_page">
                <button className="text-2xl my-5 p-2 font-bold text-blue-900/100">
                  Click Here to go to Customer Page
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CustomerPage;
