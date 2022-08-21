import { React, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import EditUser from "./EditUser";
import User from "./User";

const UserList = ({ user, token, props }) => {
  const USER_API_BASE_URL = "http://localhost:9090/user/display";
  const USER_API_DELETE_URL = "http://localhost:9090/user/delete";
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [responseUser, setResponseUser] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res1 = await fetch("http://localhost:9090/user/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "admin",
            password: "admin",
            role: "1",
          }),
        });
        const json1 = await res1.json();

        const cred = json1.data.token;
        const response = await fetch(USER_API_BASE_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: cred,
          },
        });
        const res = await response.json();
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [user, responseUser]);

  const deleteUser = (e, id) => {
    e.preventDefault();
    fetch(USER_API_DELETE_URL + "/" + id, {
      method: "DELETE",
    }).then((res) => {
      if (users) {
        setUsers((prevElement) => {
          return prevElement.filter((user) => user.id !== id);
        });
      }
    });
  };

  const editUser = (e, id) => {
    e.preventDefault();
    setUserId(id);
  };

  return (
    <>
      <div className="container mx-auto my-8">
        <div className="flex shadow border-b">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  userId
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  userName
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  password
                </th>
                <th className="text-right font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            {!loading && (
              <tbody className="bg-white">
                {users?.map((user) => (
                  <User
                    user={user}
                    key={user.userId}
                    deleteUser={deleteUser}
                    editUser={editUser}
                  />
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
      <EditUser userId={userId} setResponseUser={setResponseUser} />
    </>
  );
};

export default UserList;
