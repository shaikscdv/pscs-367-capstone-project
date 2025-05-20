import { useEffect, useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdPerson } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { LuBook } from "react-icons/lu";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";

export default function Signup() {
  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl");
  const navigate = useNavigate();
  const { user, signup } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
    userType: "student",
    name: "",
    confirmPassword: "",
    CurrentSemester: "1",
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
      const SignupResponse = await signup(form);
      console.log("login =>> ", SignupResponse);
    } catch (error) {
      toast.error("Some Error Occured !");
      console.log("Login Page Frontend Error", error);
    }
  };
  document.body.style.overflow = "hidden";
  return (
    <>
      <div className=" relative flex h-screen items-center justify-center bg-gray-50">
        <div className="absolute top-20 flex items-center justify-center rounded-xl shadow-xl">
          <div className="flex h-[42rem] w-[70rem] flex-row ">
            <div className="flex h-[100%] w-1/4 flex-col items-center justify-center rounded-l-xl bg-primary">
              <div className="mx-1 text-3xl font-bold text-white">
                Already Here ?
              </div>
              <div className="mt-10 flex flex-row text-white">
                <Link to="/login">
                  <button className="h-12 w-36 rounded-xl bg-white text-xl font-semibold text-black delay-100 hover:rounded-3xl hover:bg-gray-100">
                    login
                  </button>
                </Link>
              </div>
            </div>

            {/* form for signup */}
            <div className="flex h-[100%] w-3/4 items-center justify-center rounded-r-xl bg-white">
              <form>
                <div className="flex h-[100%] w-full flex-col ">
                  <div className="flex items-center justify-center">
                    <h1 className="text-4xl font-semibold text-black">
                      Create Student account
                    </h1>
                  </div>

                  <div className="mt-10">
                    {/* <div className="flex justify-between">
                      <div className="flex flex-col">
                        <label className="flex flex-row items-center text-lg font-semibold">
                          <span className="mr-3 text-2xl">
                            <MdPerson />
                          </span>
                          You are ?
                        </label>
                        <div className="ml-9 mt-2 flex w-96 flex-row gap-3 text-lg text-black">
                          <input
                            type="radio"
                            onChange={handleInputData}
                            name="userType"
                            value="student"
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
                    </div> */}
                    <div className="mt-8 flex flex-row items-center text-white">
                      <label className="mr-3 text-2xl text-black">
                        <MdOutlinePersonAddAlt />
                      </label>
                      <input
                        required
                        onChange={handleInputData}
                        type="name"
                        className="w-[25rem] rounded-md border-2 border-gray-400 px-3 py-2 text-black shadow-md hover:shadow-inner"
                        name="name"
                        placeholder="Enter Your Full Name"
                      />
                    </div>
                    <div className="mt-8">
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
                          placeholder="Create Your Password"
                        />
                      </div>
                    </div>
                    <div className="mt-8">
                      <div className="flex flex-row items-center text-white">
                        <label className="mr-3 text-2xl text-black">
                          <RiLockPasswordFill />
                        </label>
                        <input
                          required
                          onChange={handleInputData}
                          type="password"
                          className="w-[25rem] rounded-md border-2 border-gray-400 px-3 py-2 text-black shadow-md  hover:shadow-inner
                          focus:shadow-none"
                          name="confirmPassword"
                          placeholder="Confirm Your Password"
                        />
                      </div>
                    </div>
                    {form.userType === "student" && (
                      <div className="mt-8 flex items-center">
                        <label className="mr-3 text-2xl text-black">
                          <LuBook />
                        </label>
                        <select
                          onChange={handleInputData}
                          className="w-full rounded-md border-2 border-gray-400 px-1 py-2"
                          name="CurrentSemester"
                        >
                          <option value="" disabled>
                            Choose Semester
                          </option>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
                            <option key={semester} value={semester}>
                              Semester {semester}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="mt-10 flex items-center justify-center">
                      <div className="flex flex-row text-white">
                        <button
                          type="submit"
                          onClick={handleSubmit}
                          className="mt-1 h-12 w-36 rounded-xl bg-primary text-xl font-semibold text-white delay-100 hover:rounded-3xl hover:bg-darkPrimary"
                        >
                          Sign up
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
