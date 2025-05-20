import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";

export default function Header() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    try {
      logout();
    } catch (error) {
      toast.error("Please try again !");
      console.log("Some error occured , please try again");
    }
  };
  return (
    <header>
      <nav className="border-b-2 border-black bg-gray-800 px-4 py-2.5 shadow-md lg:px-6 dark:bg-gray-800 ">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
          <Link to="/">
            <div className="flex flex-row items-center">
              <h1 className="text-[1.6rem] font-semibold text-white duration-200 hover:text-primary">
                Edu
                <span>
                  <img
                    src="/infinity-logo.png"
                    className="inline h-10 focus:outline-none"
                    alt="Flowbite Logo"
                  />
                </span>
                <span className="text-white duration-200 hover:text-primary">
                  nnect
                </span>
              </h1>
            </div>
          </Link>
          <div className="flex items-center lg:order-2">
            {user ? (
              <>
                <Link
                  onClick={handleLogout}
                  className="mr-2 rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-white  delay-100 duration-300 hover:rounded-full focus:outline-none focus:ring-2 focus:ring-slate-400 lg:px-5 lg:py-2.5 dark:text-black dark:hover:bg-zinc-300"
                >
                  Log out
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="mr-2 rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-white  delay-100 duration-300 hover:rounded-full focus:outline-none focus:ring-2 focus:ring-slate-400 lg:px-5 lg:py-2.5 dark:text-black dark:hover:bg-zinc-300"
                >
                  Log in
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
