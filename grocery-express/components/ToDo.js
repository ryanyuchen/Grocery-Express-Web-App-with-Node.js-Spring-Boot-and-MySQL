import { React } from "react";
import Link from "next/link";

const ToDo = () => {
  const role = localStorage.getItem('role')
  return (
    <>
      <div className="container mx-auto my-8">
        <div className="flex shadow border-b">
          <ul>
            <li>
              <Link href="startOrder">
                <button className="text-2xl my-5 px-3 text-sky-900">
                  start order
                </button>
              </Link>
            </li>
            <li>
              <Link href="requestItem">
                <button className="text-2xl my-5 px-3 text-sky-900">
                  request item
                </button>
              </Link>
            </li>
            <li>
              <Link href="purchaseOrder">
                <button className="text-2xl my-5 px-3 text-sky-900">
                  purchase order
                </button>
              </Link>
            </li>
            <li>
              <Link href="cancelOrder">
                <button className="text-2xl my-5 px-3 text-sky-900">
                  cancel order
                </button>
              </Link>
            </li>
            <li>
              <Link href="orderInquiry">
                <button className="text-2xl my-5 px-3 text-sky-900">
                  my orders
                </button>
              </Link>
            </li>
            <li>
              <Link href="editCustomer">
                <button className="text-2xl my-5 px-3 text-sky-900">
                  edit my profile
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ToDo;
