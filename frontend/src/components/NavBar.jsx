
import { useState } from "react";

const NavBar = () => {
    const [searchValue, setSearchValue] = useState("");

    return (
        <div className="flex items-center w-full bg-white h-14 px-6 shadow-sm">
            <div className="relative flex w-full max-w-sm items-center">
                <input
                    type="text"
                    placeholder="Search ..."
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    className="pl-8 pr-10 py-2 w-full bg-white border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition"
                />
            </div>
        </div>
    );
};

export default NavBar;
