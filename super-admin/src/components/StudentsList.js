import React, { useState } from 'react';

// Initial data for students
const initialStudents = [
  { id: 1, profilePic: "URL1", name: "Student A", email: "emailA@example.com", password: "passwordA" },
  { id: 2, profilePic: "URL2", name: "Student B", email: "emailB@example.com", password: "passwordB" },
  // ... more students
];

const StudentsList = () => {
  const [students, setStudents] = useState(initialStudents);
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Add a new student
  const addStudent = () => {
    const newStudent = {
      id: students.length + 1,
      profilePic: "https://via.placeholder.com/150",
      name: `New Student ${students.length + 1}`,
      email: `newemail${students.length + 1}@example.com`,
      password: 'password',
    };
    setStudents([...students, newStudent]);
  };

  // Update an existing student's name
  const saveEdit = (id) => {
    setStudents(students.map(student =>
      student.id === id ? { ...student, name: newName } : student
    ));
    setEditingId(null);
    setNewName('');
  };

  // Delete a student by ID
  const deleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  // Filter students based on search term
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Student List</h2>
        <div className="flex space-x-2">
          <input
            type="search"
            placeholder="Search student..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded"
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Search</button>
        </div>
      </div>
      <table className="table-auto w-full mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">S.No</th>
            <th className="px-4 py-2">Profile Picture</th>
            <th className="px-4 py-2">Student Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Password</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={student.id} className="text-center">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2"><img src={student.profilePic} alt="Profile" className="w-10 h-10 rounded-full mx-auto"/></td>
              <td className="border px-4 py-2">
                {editingId === student.id ? (
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="p-2 border rounded"
                  />
                ) : (
                  student.name
                )}
              </td>
              <td className="border px-4 py-2">{student.email}</td>
              <td className="border px-4 py-2">{student.password}</td>
              <td className="border px-4 py-2">
                {editingId === student.id ? (
                  <button onClick={() => saveEdit(student.id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">Save</button>
                ) : (
                  <>
                    <button onClick={() => {setEditingId(student.id); setNewName(student.name);}} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">Edit</button>
                    <button onClick={() => deleteStudent(student.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2">Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={addStudent} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add</button>
        {/* Edit and Delete buttons can be integrated with selected student logic */}
      </div>
    </div>
  );
};

export default StudentsList;
