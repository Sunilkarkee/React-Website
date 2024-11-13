import React, { useContext, useState, useEffect } from "react";
import Logo from "./Logo";
import { FaUserAlt } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import summaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";
import { IoSearch } from "react-icons/io5";


const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);

  const context = useContext(Context);

  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  // Extract the 'q' query parameter from the URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);

  const getInitials = (name) => {
    if (!name) return null;
    return name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(summaryApi.logoutUser.url, {
        method: summaryApi.logoutUser.method,
        credentials: "include",
      });
      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred during logout.");
    }
  };

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <header className="h-16 shadow-md bg-slate-200 fixed z-40 w-full">
      <div className="container mx-auto h-full flex items-center  justify-between">
        <Link to="/">
          <Logo lw={90} lh={50} />
        </Link>

        {/* for searching products */}

        <div className="hidden md:flex items-center relative w-full justify-between max-w-sm border-2 border-slate-300 rounded-md h-10 ml-16 px-2">
          <input
            type="text"
            name="productSearch"
            placeholder="Search for products..."
            value={searchQuery} // Show the search query in the input box
            className="bg-slate-200 w-full outline-none rounded"
            onChange={(e) => setSearchQuery(e.target.value)} // Update the searchQuery state
          />
          <div
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-2xl hover:text-green-600"
            role="button"
            tabIndex="0"
            onClick={handleSearchClick} // Perform search on click
          >
            <IoSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-2xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user && user.name ? (
                  <div className="bg-Orange1 text-white rounded-full w-10 h-10 flex items-center justify-center font-[500] ">
                    {getInitials(user.name)}
                  </div>
                ) : (
                  <FaUserAlt />
                )}
              </div>
            )}

            {menuDisplay && user?.role === ROLE.ADMIN && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 rounded shadow-lg">
                <nav>
                  <Link
                    to="admin-panel"
                    className="whitespace-nowrap hover:bg-slate-200 p-2"
                    onClick={() => setMenuDisplay((prev) => !prev)}
                  >
                    Admin Panel
                  </Link>
                </nav>
              </div>
            )}
          </div>

          {user?._id && ( 
            <Link to={"/cart"} className="text-3xl hover:text-green-700 relative ">
              <FiShoppingBag />
              <div className="bg-Orange1 text-white w-5  h-5 rounded-full flex items-center justify-center absolute left-3 -top-2">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-lg  rounded text-white bg-Orange1 hover:bg-Orange2 outline-none font-[600]"
              >
                Leave
              </button>
            ) : (
              <Link to="/login">
                <button className="px-3 text-lg py-1 rounded text-white bg-Orange1 hover:bg-Orange2 outline-none font-[600]">
                  Log In
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
