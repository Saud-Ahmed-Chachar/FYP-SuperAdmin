import React, { useState } from 'react';
import scholarshipsData from '../scholarshipsData.json'; // Ensure this path matches your project structure

const ScholarshipList = () => {
  const [scholarships] = useState(scholarshipsData);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-bold my-4">Scholarship List</h1>
      <div className="relative overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {/* <table className="min-w-full leading-normal"> */}
        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="py-3 px-6 ">S.No</th>
                <th className="py-3 px-6 ">Logo</th>
                <th className="py-3 px-6 ">Scholarship Name</th>
              </tr>
            </thead>
          <tbody>
            {scholarships.map((scholarship, index) => (
              <tr key={index}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {index + 1}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <img src={scholarship.Image} alt={scholarship.Title} className="w-20 h-20 object-contain mx-auto" />
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {scholarship.Title}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScholarshipList;
