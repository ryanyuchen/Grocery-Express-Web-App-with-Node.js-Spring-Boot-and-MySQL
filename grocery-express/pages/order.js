function OrderPage({ orders }) {
  //   const { customers } = props;
  //   const { customers1 } = props1;

  return (
    <ul>
      <div>
        <h1>All Orders</h1>
      </div>
      <div>
        {orders.map((order, i) => (
          <div key={i}>
            <>order quantity: {order.quantity}&nbsp;</>
            <>total_cost: {order.total_cost}&nbsp;</>
            <>item_id: {order.item_id} &nbsp;</>
            <>item_name: {order.item_name} &nbsp;</>
            <>line_id: {order.line_id} &nbsp;</>
            <>order_id: {order.order_id} &nbsp;</>
            <>total_weight: {order.total_weight}</>
          </div>
        ))}
      </div>
    </ul>
  );
}

export async function getStaticProps(context) {
  const storeName = "Kroger";
  const res1 = await fetch("http://localhost:9090/user/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: "admin", password: "admin", role: "1" }),
  });
  const json1 = await res1.json();

  const res = await fetch("http://localhost:9090/" + storeName + "/order", {
    method: "GET",
    headers: {
      token: json1.data.token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();

  if (!json) {
    return {
      notFound: true,
    };
  }
  console.log(json);
  let orders = json.data;
  orders = orders.filter((order) => "item_id" in order);
  console.log(orders);

  return { props: { orders } };
}

export default OrderPage;
