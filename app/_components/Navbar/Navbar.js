"use client"

const Navbar = ({ toggleSidebar }) => {
    return (
       <div className="bg-slate-100 shadow-md fixed top-0 left-0 w-full z-50 flex font-bold justify-between items-center h-14 p-4">
            <div className="flex gap-2 items-center">
                <div className="p-2 ">
                    <button onClick={toggleSidebar} className="font-extrabold ">
                        ☰
                    </button>
                </div>
                <div>
                    <h1 className="font-bold ">My Application</h1>
                </div>
            </div>

            <div>
                <button className="p-2">User Profile</button>
            </div>

        </div>
    );
};

export default Navbar;
