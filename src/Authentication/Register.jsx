import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setLoading, setShowPassword } from '../redux/rootSlice';
import axios from 'axios';
import { config } from '../config/Config';
import { toast } from 'react-toastify';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';

const Register = () => {
  const { showPassword, loading } = useSelector((state) => state.root);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.firstName) {
        errors.firstName = "First name is required.";
      }
      if (!values.lastName) {
        errors.lastName = "Last name is required.";
      }
      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.phone) {
        errors.phone = "Phone number is required.";
      } else if (
        !/^\d{10}$/i.test(values.phone)
      ) {
        errors.phone = "Invalid phone number.";
      }
      if (!values.password) {
        errors.password = "Password is required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        dispatch(setLoading(true));
        console.log("Sending registration data:", values); // Log the registration data
        console.log("API URL:", `${config.userApi}/register`); // Log the API URL
        const response = await axios.post(`${config.userApi}/register`, values);
        if (response.status === 201) {
          toast.success(response.data.message, {
            position: "top-center",
          });
          navigate("/");
        }
      } catch (error) {
        console.error("Error during registration:", error.message);
        toast.error(
          error.response
            ? error.response.data.message || "Server error"
            : "Network error. Please check your connection.",
          { position: "top-center" }
        );
      } finally {
        dispatch(setLoading(false));
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary kvnkjabvav">
      <div className="max-w-sm w-full space-y-8 p-4 bg-white rounded shadow-sm">
        <h2 className="text-center text-2xl font-bold">Sign up</h2>
        <div className="flex flex-col">
          <p className="text-center text-black my-2">Create a new account</p>
        </div>
        <form className="user" onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-600"
            >
              First Name:
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              autoComplete="given-name"
              className={`mt-1 p-2 w-full border ${
                formik.touched.firstName && formik.errors.firstName
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.firstName}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-600"
            >
              Last Name:
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              autoComplete="family-name"
              className={`mt-1 p-2 w-full border ${
                formik.touched.lastName && formik.errors.lastName
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.lastName}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email address:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              className={`mt-1 p-2 w-full border ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="Email "
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.email}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-600"
            >
              Phone Number:
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              autoComplete="tel"
              className={`mt-1 p-2 w-full border ${
                formik.touched.phone && formik.errors.phone
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="Phone Number"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.phone}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password:
            </label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              className={`mt-1 p-2 w-full border ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="Password "
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            <div className="showPass mt-2">
              {showPassword ? (
                <EyeSlashFill
                  className="showPassIcon cursor-pointer"
                  onClick={() => {
                    dispatch(setShowPassword(!showPassword));
                  }}
                />
              ) : (
                <EyeFill
                  className="showPassIcon cursor-pointer"
                  onClick={() => {
                    dispatch(setShowPassword(!showPassword));
                  }}
                />
              )}
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.password}
              </p>
            )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-black rounded-sm"
            >
              {loading ? (
                <h1 className="text-5xl flex items-center justify-center text-red-600">
                  Loading...
                </h1>
              ) : (
                "Register Account"
              )}
            </button>
          </div>
        </form>
        <p className="flex justify-center mt-2 text-white">
          <Link to={"/"} className="text-gray-600">
            Already have an account? Login!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
