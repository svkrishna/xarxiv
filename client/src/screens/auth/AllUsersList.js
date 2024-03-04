import React from "react";
import {
  useGetAllUsersListQuery,
  useToggleUserRoleMutation,
} from "../../slices/auth/authApiSlice";

const AllUsersList = () => {
  //queries n mutation
  const { data: users, error, isLoading, refetch } = useGetAllUsersListQuery();
  const [toggleUserRole] = useToggleUserRoleMutation();

  const handleToggleRole = async (userId) => {
    try {
      await toggleUserRole({ userId }).unwrap();
      refetch();
    } catch (error) {
      console.error("Error toggling user role:", error);
    }
  };

  return (
    <div>
      <h1>All Users List</h1>
      {isLoading ? (
        <div>Loading users...</div>
      ) : error ? (
        <div>Error fetching users : {error?.data?.message}</div>
      ) : (
        <ul>
          {users?.message &&
            users?.users.map((user) => (
              <li key={user._id}>
                <span>{user.username}</span>
                <span> - {user.email}</span>
                <label>
                  <input
                    type="checkbox"
                    checked={user.role === "admin"}
                    onChange={() => handleToggleRole(user._id)}
                  />
                  {user.role === "admin" ? "Admin" : "Reader"}
                </label>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default AllUsersList;
