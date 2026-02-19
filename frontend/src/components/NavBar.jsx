

const NavBar = () => {
    return (
        <div className="flex items-center w-full bg-white h-14 px-6 shadow-sm">

            <div className="relative flex max-w-sm items-center">
                
                        <input
                            type="text"
                            placeholder="Search ..."
                            className="pl-8 pr-10 py-2 w-full bg-white  border border-gray-200  rounded-md text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>
                    
        </div>
    );
};

export default NavBar;