import { useEffect, useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdPersonOutline } from "react-icons/md";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../Hooks/useAuth";

export default function Login() {
  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl");
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
    userType: "student",
  });

  useEffect(() => {
    if (!user) return;

    returnUrl ? navigate(returnUrl) : navigate("/admin");
  });

  const handleInputData = (e) => {
    setForm((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(form);
      const LoginResponse = await login(form);
      console.log("login =>> ", LoginResponse);
    } catch (error) {
      toast.error("Some Error Occured !");
      console.log("Login Page Frontend Error", error);
    }
  };

  
  ///testing error boundary
  // if (1) {
  //   throw new Error("test error boundary");
  // }


  document.body.style.overflow = "hidden";
  return (
    <>
      <div className=" relative flex h-screen items-center justify-center bg-gray-50">
        <div className="absolute top-36 flex items-center justify-center rounded-xl shadow-xl">
          <div className="flex h-[30rem] w-[70rem] flex-row ">
            {/* form for login */}
            <div className="flex h-[100%] w-3/4 items-center justify-center rounded-l-xl bg-white">
              <form>
                <div className="flex h-[100%] w-full flex-col ">
                  <div className="flex items-center justify-center">
                    <h1 className="text-4xl font-semibold text-black">
                      Login your account
                    </h1>
                  </div>

                  <div className="mt-14">
                    <div className="flex flex-row items-center text-white">
                      <label className="mr-3 text-2xl text-black">
                        <MdOutlineMail />
                      </label>
                      <input
                        required
                        onChange={handleInputData}
                        type="email"
                        className="w-[25rem] rounded-md border-2 border-gray-400 px-3 py-2 text-black shadow-md hover:shadow-inner"
                        name="email"
                        placeholder="Enter Your Email"
                      />
                    </div>
                    <div className="mt-8">
                      <div className="flex flex-row items-center text-white">
                        <label className="mr-3 text-2xl text-black">
                          <RiLockPasswordLine />
                        </label>
                        <input
                          required
                          onChange={handleInputData}
                          type="password"
                          className="w-[25rem] rounded-md border-2 border-gray-400 px-3 py-2 text-black shadow-md  hover:shadow-inner
                          focus:shadow-none"
                          name="password"
                          placeholder="Enter Your Password"
                        />
                      </div>
                    </div>
                    <div className="mt-8 flex justify-between">
                      <div className="flex flex-col">
                        <label className="flex flex-row items-center text-lg font-semibold">
                          <span className="mr-3 text-2xl">
                            <MdPersonOutline />
                          </span>
                          You are ?
                        </label>
                        <div className="ml-9 mt-2 flex w-96 flex-row gap-3 text-lg text-black">
                          <input
                            type="radio"
                            onChange={handleInputData}
                            name="userType"
                            value="student"
                            defaultChecked
                            required
                          />
                          <label>Student</label>

                          <input
                            type="radio"
                            onChange={handleInputData}
                            name="userType"
                            value="teacher"
                            required
                          />
                          <label>Teacher</label>

                          <input
                            type="radio"
                            onChange={handleInputData}
                            name="userType"
                            value="admin"
                            required
                          />
                          <label>Admin</label>
                        </div>
                      </div>
                    </div>
                    <div className="mt-10 flex items-center justify-center">
                      <div className="flex flex-row text-white">
                        <button
                          type="submit"
                          onClick={handleSubmit}
                          className="mt-1 h-12 w-36 rounded-xl bg-primary text-xl font-semibold text-white delay-100 hover:rounded-3xl hover:bg-darkPrimary"
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="flex h-[100%] w-1/4 flex-col items-center justify-center rounded-r-xl bg-primary">
              <div className="text-3xl font-bold text-white">New Here ?</div>
              <div className="mt-10 flex flex-row text-white">
                <Link to="/signup">
                  <button className="h-12 w-36 rounded-xl bg-white text-xl font-semibold text-black delay-100 hover:rounded-3xl hover:bg-gray-100">
                    Sign up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
