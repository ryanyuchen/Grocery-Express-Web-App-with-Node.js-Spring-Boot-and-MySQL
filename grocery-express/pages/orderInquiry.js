import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

function OrderPage() {
  const cred = localStorage.getItem("customer-token");
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9090/order/inquiry", {
      method: "GET",
      headers: {
        token: cred,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((da) => setOrders(da.data))
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <>
      <Navbar />
      {orders && (
        <div className="p-10 text-center align-middle bg-center shadow rounded">
          <ul>
            <div>
              <h2 className="text-3xl my-5 p-2 font-extrabold text-center">
                My Orders
              </h2>
            </div>
            <div>
              <table className="mx-auto table-auto border-separate border-slate-500">
                <thead className="bg-blue-900 text-white px-1">
                  <tr>
                    <th className="border border-spacing-2 border-slate-600">
                      orderId
                    </th>
                    <th className="border border-spacing-2 border-slate-600">
                      orderIdentifier
                    </th>
                    <th className="border border-spacing-2 border-slate-600">
                      storeId
                    </th>
                    <th className="border border-spacing-2 border-slate-600">
                      customerId
                    </th>
                    <th className="border border-spacing-2 border-slate-600">
                      droneId
                    </th>
                    <th className="border border-spacing-2 border-slate-600">
                      totalCost
                    </th>
                    <th className="border border-spacing-2 border-slate-600">
                      totalWeight
                    </th>
                    <th className="border border-spacing-2 border-slate-600">
                      status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((item) => (
                    <tr key={item.orderId}>
                      <td className="border border-spacing-2 border-slate-700">
                        {item.orderId}
                      </td>
                      <td className="border border-spacing-2 border-slate-700">
                        {item.orderIdentifier}
                      </td>
                      <td className="border border-spacing-2 border-slate-700">
                        {item.storeId}
                      </td>
                      <td className="border border-spacing-2 border-slate-700">
                        {item.customerId}
                      </td>
                      <td className="border border-spacing-2 border-slate-700">
                        {item.droneId}
                      </td>
                      <td className="border border-spacing-2 border-slate-700">
                        {item.totalCost}
                      </td>
                      <td className="border border-spacing-2 border-slate-700">
                        {item.totalWeight}
                      </td>
                      <td className="border border-spacing-2 border-slate-700">
                        {item.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ul>
        </div>
      )}
    </>
  );
}

export default OrderPage;
