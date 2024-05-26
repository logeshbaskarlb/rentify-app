import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { config } from '../../config/Config';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const Profile = () => {
  const [sites, setSites] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // Fetch sites data from the database
    const fetchSites = async () => {
      try {
        const response = await axios.get(`${config.userApi}/seller-profile`);
        setSites(response.data);
      } catch (error) {
        console.error('Error fetching sites:', error);
      }
    };

    fetchSites();
  }, []);
  const itemsPerPage = 7;
  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(sites.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleDelete = async (id) => {
    try {
       const results = await axios.delete(`${config.userApi}/seller-profile/${id}`);
        setSites(sites.filter((site) => site._id !== id));
        toast.error("Deleted", {
          position: toast.POSITION.TOP_RIGHT,
      })
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };
  


  return (
    <div className=" mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4">My Properties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sites.map((site, i) => (
          <div key={i} className="bg-white rounded shadow-lg p-4">
            <img src={site.photo} alt="Property" className="w-full mb-4 rounded" />
            <div className="text-gray-700 mb-2">Quotation Amount: {site.amount}</div>
            <div className="text-gray-700 mb-2">Landmark Near: {site.landmark}</div>
            <div className="text-gray-700 mb-4">Bedrooms: {site.bedrooms}</div>
            <div className="flex justify-between">
            <Link to={`/edit/${site.id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Edit
              </Link>
              <button 
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={() => handleDelete(site.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <ReactPaginate
       previousLabel={'Previous'}
       nextLabel={'Next'}
       pageCount={pageCount}
       onPageChange={handlePageChange}
       containerClassName={'flex justify-center mt-4'}
       previousLinkClassName={'px-3 py-1 bg-blue-500 text-white rounded-md mr-2'}
       nextLinkClassName={'px-3 py-1 bg-blue-500 text-white rounded-md ml-2'}
       disabledClassName={'opacity-50 cursor-not-allowed'}
       activeClassName={'bg-blue-700'}
      />
    </div>
  );
};

export default Profile;
