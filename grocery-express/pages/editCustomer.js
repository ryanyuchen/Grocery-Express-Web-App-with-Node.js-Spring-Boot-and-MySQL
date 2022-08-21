import Navbar from "../components/Navbar";
export default function editCustomer() {
  const cred = localStorage.getItem("customer-token");
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      credit: event.target.credit.value,
      rating: event.target.rating.value,
      phoneNumber: event.target.phoneNumber.value,
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
    const endpoint = "http://localhost:9090/customer/add";
    const response = await (await fetch(endpoint, options)).json();
    if (response.code == 200) {
      alert(response.code + " - " + response.msg);
    } else {
      alert(response.code + " - " + response.msg);
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
          <label htmlFor="name">First Name</label>
          <input
            className="optional:border-gray-300"
            type="text"
            id="firstName"
            name="firstName"
            required
          />
        </div>
        <div class="row">
          <label htmlFor="name">Last Name</label>
          <input
            className="optional:border-gray-300"
            type="text"
            id="lastName"
            name="lastName"
            required
          />
        </div>
        <div class="row">
          <label htmlFor="name">Phone Number</label>
          <input
            className="optional:border-gray-300"
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            required
          />
        </div>
        <div class="row">
          <label htmlFor="name">Credit</label>
          <input
            className="optional:border-gray-300"
            type="text"
            id="credit"
            name="credit"
            required
          />
        </div>
        <div class="row">
          <label htmlFor="name">rating</label>
          <input
            className="optional:border-gray-300"
            type="text"
            id="rating"
            name="rating"
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
