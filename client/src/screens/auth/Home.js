import React, { useEffect } from "react";
import { useGetAllUsersListQuery } from "../../slices/auth/authApiSlice";

const Home = () => {
  // Destructure the properties from the hook's response
  const { data: users, error, isLoading } = useGetAllUsersListQuery();

  useEffect(() => {
    console.log(users, " usersss");
  }, [users]);

  return (
    <div>
      <h1>Home</h1>
      {isLoading && <p>Loading users...</p>}
      {error && <p>An error occurred while fetching users.</p>}
      <ul>
        {/* {users?.map(user => (
          <li key={user._id}>{user.name} - {user.email}</li>
        ))} */}
      </ul>
    </div>
  );
};

export default Home;
