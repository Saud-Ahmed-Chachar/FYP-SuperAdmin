import React, { useState } from 'react';
import universityData from '../universities_data.json'; // Adjust this import according to your project structure

const UniversitiesList = () => {
  const [universities] = useState(universityData);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const universitiesPerPage = 10;

  // Calculate the currently displayed universities based on pagination
  const indexOfLastUniversity = currentPage * universitiesPerPage;
  const indexOfFirstUniversity = indexOfLastUniversity - universitiesPerPage;
  const currentUniversities = universities.slice(indexOfFirstUniversity, indexOfLastUniversity);

  const filteredUniversities = searchTerm
    ? universities.filter(university =>
        university["University Name"].toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, indexOfLastUniversity)
    : currentUniversities;

  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <main className="flex-1 overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">University List</h1>
          <input
            type="text"
            placeholder="Search University..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on new search
            }}
            className="form-input px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="bg-dark p-6 rounded-lg shadow">
        <table className="min-w-full text-sm text-left text-gray-500 white:text-gray-400">
          <thead className="text-xs text-gray-100 uppercase bg-gray-50 dark:bg-indigo-500 white:text-white-400"  style={{ background: 'linear-gradient(to right, rgb(36, 18, 101) 0%, rgb(0, 130, 203) 100%)', color: 'white', boxSizing: 'border-box' }}> 
              <tr>
                <th className="py-3 px-6 ">S.No</th>
                <th className="py-3 px-6 ">Logo</th>
                <th className="py-3 px-6 ">University Name</th>
                <th className="py-3 px-6">Specialization</th>
              </tr>
            </thead>
            <tbody>
              {filteredUniversities.map((university, index) => (
                <tr key={university.id} className="border-b last:border-b-0">
                  <td className="py-4 px-6 text-gray-800">{indexOfFirstUniversity + index + 1}</td>
                  <td className="py-4 px-6">
                    <img src={university.Image} alt="Logo" className="w-12 h-12 rounded-full mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-gray-800">
                    {university["University Name"]}
                  </td>
                  <td className="py-4 px-6 text-gray-800">{university.Specialization}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {indexOfLastUniversity < universities.length && (
            <div className="flex justify-center mt-4">
              <button
                onClick={loadMore}
                className="bg-indigo-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200 ease-in-out"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UniversitiesList;
