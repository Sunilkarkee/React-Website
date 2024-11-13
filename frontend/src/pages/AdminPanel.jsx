import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaUserAlt } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);

  const getInitials = (name) => {
    if (!name) return null;
    return name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  };

  const navigate = useNavigate()
  useEffect(()=>{
    if(user?.role !== ROLE.ADMIN)
      navigate("/")
  },[user])

  return (
    <div className="min-h-[calc(100vh - 120px)] flex">
      <aside className="bg-slate-100 min-h-screen w-full max-w-60 custom-shadow">
        <div className="h-32 shadow-sm flex justify-center items-center flex-col">
          <div className="text-3xl cursor-pointer relative flex justify-center">
            {user && user.name ? (
              <div className="bg-Orange1 text-black rounded-full w-[60px] h-[60px] flex items-center justify-center font-semibold">
                {getInitials(user.name)}
              </div>
            ) : (
              <FaUserAlt />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>
        <div>
          <nav className="grid p-4">
            <Link to={'all-users'} className='px-2 py-1 hover:bg-slate-200'>All users</Link>
            <Link to={'all-products'} className='px-2 py-1 hover:bg-slate-200'>All product</Link>
          </nav>
        </div>
      </aside>
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
