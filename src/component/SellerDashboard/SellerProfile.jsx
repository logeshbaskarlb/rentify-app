import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../../config/Config";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

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
        console.error("Error fetching sites:", error);
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
      await axios.delete(`${config.userApi}/seller-profile/${id}`);
      setSites(sites.filter((site) => site._id !== id)); // Ensure `_id` or `id` matches backend response
      toast.success("Property deleted successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error("Failed to delete property");
    }
  };

  const navigate = useNavigate();

  return (
    <div className=" mx-auto px-4 ">
      <h2 className="text-2xl font-semibold mb-4 text-left">My Properties</h2>
      <button
        onClick={() => navigate("/seller/dashboard")}
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
      >
        Back
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sites.map((site, i) => (
          <div key={i} className="bg-white rounded shadow-lg p-4">
            {/* <img src={site.photo} alt="Property" className="w-full mb-4 rounded" /> */}
            <div className="text-xl text-gray-700 mb-2">
              <span className=" text-lg text-red-500">Quotation Amount :</span>
              {site.amount}
            </div>
            <div className="text-xl text-gray-700 mb-2">
              <span className="  text-lg text-red-500">Location : </span>

              <span>{site.landmark}</span>
            </div>
            <div className="text-xl text-gray-700 mb-4">
              <span className="  text-lg text-red-500">Bedrooms : </span>
              <span>{site.bedrooms}</span>
            </div>
            <div className="text-xl text-gray-700 mb-2">
              <span className="  text-lg text-red-500">Status :</span>

              <span>{site.status === "sold" ? "Sold" : "Not Sold"}</span>
            </div>
            <div className="text-xl text-gray-700 mb-4">
              <span className="  text-lg text-red-500"> Description : </span>

              <span>{site.description}</span>
            </div>
            <div className="flex justify-between">
              <Link
                to={`/edit/${site._id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Edit
              </Link>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={() => handleDelete(site._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={"flex justify-center mt-4"}
        previousLinkClassName={
          "px-3 py-1 bg-blue-500 text-white rounded-md mr-2"
        }
        nextLinkClassName={"px-3 py-1 bg-blue-500 text-white rounded-md ml-2"}
        disabledClassName={"opacity-50 cursor-not-allowed"}
        activeClassName={"bg-blue-700"}
      />
    </div>
  );
};

export default Profile;
