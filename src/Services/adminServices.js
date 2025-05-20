import axios from "axios";

export const login = async (loginData) => {
  try {
    const { data } = await axios.post("api/admin/login", loginData);
    console.log("Login Frontend API Hit ==> ", data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const signup = async (signupData) => {
  try {
    const { data } = await axios.post("api/admin/signup", signupData);
    console.log("Signup Frontend API Hit ==> ", data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const createTimeTable = async (formData) => {
  try {
    console.log(formData);
    const { data } = await axios.post("api/admin/createTimetable", formData);
    console.log("Create TimeTable  ==> ", data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUser = () =>
  localStorage.getItem("UserInfo")
    ? JSON.parse(localStorage.getItem("UserInfo"))
    : null;

export const logout = () => {
  localStorage.removeItem("UserInfo");
};
