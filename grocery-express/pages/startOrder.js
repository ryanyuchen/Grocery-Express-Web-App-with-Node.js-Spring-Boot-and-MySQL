import "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
export default function StartOrder() {
  const router = useRouter();
  const cred = localStorage.getItem("customer-token");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        orderIdentifier: event.target.orderIdentifier.value,
        storeName: event.target.storeName.value,
        droneIdentifier: event.target.droneIdentifier.value,
      };

      const JSONdata = JSON.stringify(data);
      const options = {
        method: "POST",

        headers: {
          token: cred,
          "Content-Type": "application/json",
        },
        body: JSONdata,
      };
      const response = await (
        await fetch(`http://localhost:9090/order/start`, options)
      ).json();
      if (response.code == 200) {
        router.push({ pathname: "/orderResponse" });
      } else {
        alert(response.code + " - " + response.msg);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="p-10 text-center align-middle bg-center shadow rounded"
      >
        <div class="row">
          <label htmlFor="storeName">storeName</label>
          <input
            className="optional:border-gray-300"
            type="text"
            id="storeName"
            name="storeName"
            required
          />
        </div>
        <div class="row">
          <label htmlFor="droneIdentifier">droneIdentifier</label>
          <input
            className="optional:border-gray-300"
            type="text"
            id="droneIdentifier"
            name="droneIdentifier"
            required
          />
        </div>
        <div class="row">
          <label htmlFor="orderIdentifier">orderIdentifier</label>
          <input
            className="optional:border-gray-300"
            type="text"
            id="orderIdentifier"
            name="orderIdentifier"
            required
          />
        </div>
        <div class="row">
          <button
            className="text-2xl my-10 px-10 text-white bg-blue-500 focus:bg-blue-900"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
