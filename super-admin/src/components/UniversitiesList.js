import React, { useState } from 'react';

// Initial Data
const initialUniversities = [
  { id: 1, logo: "https://via.placeholder.com/150", name: "University A", disciplineType: "Science" },
  { id: 2, logo: "https://via.placeholder.com/150", name: "University B", disciplineType: "Arts" },
];

const UniversitiesList = () => {
  const [universities, setUniversities] = useState(initialUniversities);
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Add a new university (for simplicity, adding with a fixed new ID and disciplineType)
  const addUniversity = () => {
    const newUniversity = {
      id: universities.length + 1,
      logo: "https://via.placeholder.com/150",
      name: `New University ${universities.length + 1}`,
      disciplineType: "Engineering",
    };
    setUniversities([...universities, newUniversity]);
  };

  // Update an existing university's name
  const saveEdit = (id) => {
    setUniversities(universities.map(university =>
      university.id === id ? { ...university, name: newName } : university
    ));
    setEditingId(null); // Exit editing mode
    setNewName(''); // Reset input field
  };

  // Delete a university by ID
  const deleteUniversity = (id) => {
    setUniversities(universities.filter(university => university.id !== id));
  };

  // Filter universities based on search term
  const filteredUniversities = universities.filter(university =>
    university.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
  
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">University List</h1>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search University..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded"
            />
            {/* Optional: Add search functionality */}
            <button onClick={() => {}} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">Search</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow">
          {/* Table */}
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="pb-4">S.No</th>
                <th className="pb-4">Logo</th>
                <th className="pb-4">University Name</th>
                <th className="pb-4">Discipline Type</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUniversities.map((university, index) => (
                <tr key={university.id}>
                  <td className="pt-4 pb-2">{index + 1}</td>
                  <td className="pt-4 pb-2">
                    <img src={university.logo} alt="Logo" className="w-12 h-12" />
                  </td>
                  <td className="pt-4 pb-2">
                    {editingId === university.id ? (
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="p-2 border rounded"
                      />
                    ) : (
                      university.name
                    )}
                  </td>
                  <td className="pt-4 pb-2">{university.disciplineType}</td>
                  <td className="pt-4 pb-2">
                    {editingId === university.id ? (
                      <button onClick={() => saveEdit(university.id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">Save</button>
                    ) : (
                      <>
                        <button onClick={() => {setEditingId(university.id); setNewName(university.name);}} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">Edit</button>
                        <button onClick={() => deleteUniversity(university.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2">Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Action Buttons */}
          <div className="flex space-x-2 mt-4">
            <button onClick={addUniversity} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">Add</button>
            {/* Add buttons for other actions (if needed) */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UniversitiesList;
