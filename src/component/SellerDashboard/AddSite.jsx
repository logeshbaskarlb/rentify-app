import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { config } from '../../config/Config';
import { toast } from 'react-toastify';

const AddSite = () => {

  const formik = useFormik({
    initialValues: {
    //   photo: null,
      amount: '',
      landmark: '',
      bedrooms: '',
      description: "",
      sold: false,
    },
    onSubmit: async (values) => {
        try {   
         const response = await 
                        axios.post(`${config.userApi}/seller-property`, 
            values);
          
          toast.success("Successfully added")
          // Clear form after successful submission
          formik.resetForm();
        } catch (error) {
          toast.error("Something went wrong")

            if (error.response) {
                // The request was made and the server responded with a status code
                console.error('Server Error:', error.response.status, error.response.data);
              } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
              } else {
                // Something happened in setting up the request that triggered an error
                console.error('Request error:', error.message);
              }
        }
      },
      
  });

  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Add Property</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* Photo Upload */}
        {/* <div className="mb-4">
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
            Photo:
          </label>
          <input
            id="photo"
            name="photo"
            type="file"
            onChange={event => formik.setFieldValue('photo', event.target.files[0])}
          />
        </div> */}

        {/* Bedrooms */}
        <div className="mb-4">
          <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
            {/* Property type */}
            Bedrooms:
          </label>
          <input
            id="bedrooms"
            name="bedrooms"
            type="number"
            min="0"
            className="mt-1 p-2 w-full border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.bedrooms}
          />
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
           Price :
          </label>
          <input
            id="amount"
            name="amount"
            type="text"
            className="mt-1 p-2 w-full border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.amount}
          />
        </div>

        {/* Landmark Near */}
        <div className="mb-4">
          <label htmlFor="landmark" className="block text-sm font-medium text-gray-700">
            Location :
          </label>
          <textarea
            id="landmark"
            name="landmark"
            type="text"
            className="mt-1 p-2 w-full border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.landmark}
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description :
          </label>
          <textarea
            id="description"
            name="description"
            type="text"
            className="mt-1 p-2 w-full border rounded h-40"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
        </div>

        {/* Property Sold */}
        <div className="mb-4 flex items-center">
            <input
              id="sold"
              name="sold"
              type="checkbox"
              className="mr-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.sold}
            />
            <label htmlFor="sold" className="block text-sm font-medium text-gray-700">
              Sold
            </label>
          </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-[#111827] text-white rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddSite;

