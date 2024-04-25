import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../backend/firebase-fetchingDB';
import "../Design/Studentlist.css"

const StudentsList = () => {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    fullName: '',
    email: '',
    cnic: '',
    phoneNumber: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      setUsers(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditingId(user.id);
    setEditFormData({
      fullName: user.profileData.fullName,
      email: user.profileData.email,
      cnic: user.profileData.cnic,
      phoneNumber: user.profileData.phoneNumber
    });
  };

  const handleSaveEdit = async () => {
    const userRef = doc(db, "users", editingId);
    await updateDoc(userRef, {
      "profileData.fullName": editFormData.fullName,
      "profileData.email": editFormData.email,
      "profileData.cnic": editFormData.cnic,
      "profileData.phoneNumber": editFormData.phoneNumber
    });
    const updatedUsers = users.map(user => user.id === editingId ? {
      ...user,
      profileData: {
        ...user.profileData,
        ...editFormData
      }
    } : user);
    setUsers(updatedUsers);
    setEditingId(null);
  };

  const handleDeleteStudent = async (id) => {
    await deleteDoc(doc(db, "users", id));
    setUsers(users.filter(user => user.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const filteredUsers = users.filter(user =>
    user.profileData.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">User List</h2>
        <input
          type="search"
          placeholder="Search user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input w-1/4"
        />
      </div>
      <div className="overflow-x-auto ">
        <table className="min-w-full text-sm text-left text-dark-500 dark:text-dark-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="py-3 px-6">S.No</th>
              <th className="py-3 px-6">Profile Picture</th>
              <th className="py-3 px-6">Full Name</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">CNIC</th>
              <th className="py-3 px-6">Phone Number</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.id} className="bg-white border-b white:bg-gray-800 white:border-gray-700">
                <td className="py-4 px-6">{index + 1}</td>
                <td className="py-4 px-6">
                  <img src={user.uploadedFiles.passportSizePhoto} alt="Profile" className="w-10 h-10 rounded-full mx-auto"/>
                </td>
                <td className="py-4 px-6">
                  {editingId === user.id ? (
                    <input
                      type="text"
                      name="fullName"
                      value={editFormData.fullName}
                      onChange={handleInputChange}
                      className="form-input w-full"
                    />
                  ) : (
                    user.profileData.fullName
                  )}
                </td>
                <td className="py-4 px-6">
                  {editingId === user.id ? (
                    <input
                      type="text"
                      name="email"
                      value={editFormData.email}
                      onChange={handleInputChange}
                      className="form-input w-full"
                    />
                  ) : (
                    user.profileData.email
                  )}
                </td>
                <td className="py-4 px-6">
                  {editingId === user.id ? (
                    <input
                      type="text"
                      name="cnic"
                      value={editFormData.cnic}
                      onChange={handleInputChange}
                      className="form-input w-full"
                    />
                  ) : (
                    user.profileData.cnic
                  )}
                </td>
                <td className="py-4 px-6">
                  {editingId === user.id ? (
                    <input
                      type="text"
                      name="phoneNumber"
                      value={editFormData.phoneNumber}
                      onChange={handleInputChange}
                      className="form-input w-full"
                    />
                  ) : (
                    user.profileData.phoneNumber
                  )}
                </td>
                <td className="py-4 px-6 flex justify-around">
                  {editingId === user.id ? (
                    <button onClick={handleSaveEdit} className="btn btn-success">Save</button>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(user)} className="btn btn-warning">Edit</button>
                      <button onClick={() => handleDeleteStudent(user.id)} className="btn btn-error">Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsList;
