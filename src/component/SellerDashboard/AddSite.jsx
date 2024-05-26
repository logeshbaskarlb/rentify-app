import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { config } from '../../config/Config';

const AddSite = () => {
  const formik = useFormik({
    initialValues: {
    //   photo: null,
      amount: '',
      landmark: '',
      bedrooms: '',
    },
    onSubmit: async values => {
        try {
          const formData = new FormData();
          formData.append('amount', values.amount);
          formData.append('landmark', values.landmark);
          formData.append('bedrooms', values.bedrooms);
      
         const response = await 
                        axios.post(`${config.userApi}/seller-property`, 
            formData);
          console.log(response)
    
          // Clear form after successful submission
          formik.resetForm();
        } catch (error) {
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

        {/* Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Quotation Amount:
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
            Landmark Near:
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

        {/* Bedrooms */}
        <div className="mb-4">
          <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddSite;
