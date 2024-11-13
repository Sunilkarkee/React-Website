import React, { useState } from "react";
import ROLE from "../common/role";
import { IoClose } from "react-icons/io5";
import summaryApi from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({ name, email, number, role, userId, onClose, callFunc }) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    try {
      const fetchResponse = await fetch(summaryApi.updateUser.url, {
        method: summaryApi.updateUser.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          role: userRole,
        }),
      });

      const responseData = await fetchResponse.json();

      if (responseData.success) {
        toast.success(responseData.message);
        onClose();
        callFunc();
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("An error occurred while updating the user role.");
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-50">
      <div className="bg-white shadow-md p-4 w-full max-w-sm rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-medium">Change User Role</h1>
          <button
            className="bg-Orange1 rounded-full hover:bg-Orange2 hover:text-white p-2"
            onClick={onClose}
          >
            <IoClose />
          </button>
        </div>

        <div className="space-y-2">
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Number:</strong> {number}</p>
        </div>

        <div className="flex justify-between items-center my-4">
          <p className="font-medium">Role:</p>
          <select
            className="border border-slate-300 rounded text-sm outline-none px-4 py-1 hover:bg-slate-700 hover:text-white"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((rl) => (
              <option value={rl} key={rl}>
                {rl}
              </option>
            ))}
          </select>
        </div>

        <div className="text-center mt-6">
          <button
            className="bg-Orange1 text-white font-semibold py-2 px-4 rounded hover:bg-Orange2"
            onClick={updateUserRole}
          >
            Change Role
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeUserRole;
