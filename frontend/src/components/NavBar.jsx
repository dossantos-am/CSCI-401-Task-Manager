import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";

const NavBar = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");


    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchValue.trim()) {
            navigate("/projects");
            return;
        }
        navigate(`/projects?search=${encodeURIComponent(searchValue.trim())}`);
    };

    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearchValue(val);
        if (val === "") navigate("/projects");
    };


    return (
        <div className="flex items-center w-full bg-white h-14 px-6 shadow-sm">
            <div className="relative flex w-full max-w-sm items-center">
                <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search ..."
                    value={searchValue}
                    onChange={handleSearchChange}
                    className="pl-8 pr-10 py-2 w-full bg-white border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition"
                />
                </form>
            </div>
            <button
                type="button"
                onClick={handleLogout}
                className="ml-auto rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
            >
                Logout
            </button>
        </div>
    );
};

export default NavBar;
