import React, { useEffect, useState } from "react";
import summaryApi from "../common";
import moment from 'moment';
import { MdEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

const Allusers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateUserRole, setOpenUpdateUserRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    name: "",
    email: "",
    number: "",
    role: "",
    _id: ""
  });

  const fetchAllUsers = async () => {
    try {
      const fetchData = await fetch(summaryApi.allUsers.url, {
        method: summaryApi.allUsers.method,
        credentials: "include",
      });

      const dataResponse = await fetchData.json();

      if (Array.isArray(dataResponse.data)) {
        setAllUsers(dataResponse.data);
      } else {
        console.error("Unexpected data format:", dataResponse);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="w-full">
      <table className="user-table w-full">
        <thead>
          <tr className="bg-slate-900 text-white">
            <th>SN</th>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(allUsers) && allUsers.length > 0 ? (
            allUsers.map((user, index) => (
              <tr key={user.id || user._id}>
                <td>{index + 1}</td>
                <td>{user?.name || "N/A"}</td>
                <td>{user?.email || "N/A"}</td>
                <td>{user?.number || "N/A"}</td>
                <td>{user?.role || "N/A"}</td>
                <td>{moment(user?.createdAt || "N/A").format('LLLL')}</td>
                <td>
                  <button className="cursor-pointer text-xl bg-Orange1 rounded-full hover:text-white p-2"
                    onClick={() => {
                      setUpdateUserDetails(user);
                      setOpenUpdateUserRole(true);
                    }}
                  >
                    <MdEdit />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {openUpdateUserRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateUserRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          number={updateUserDetails.number}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc ={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default Allusers;
