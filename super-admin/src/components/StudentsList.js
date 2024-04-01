import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc,addDoc,setDoc,updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../backend/firebase-fetchingDB'; // Ensure this path is correctly set to your Firebase configuration

const StudentsList = () => {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
 

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersArray);
    };

    fetchUsers();
  }, []);

  

  const addStudent = async () => {
    const newEmail = `newuser${users.length + 1}@example.com`; // Replace this with the actual email input from the user
  
    const newStudent = {
      profileData: {
        fullName: "New User",
        email: newEmail,
        cnic: "12345-6789012-3",
        phoneNumber: "+92 300 1234567",
      },
      uploadedFiles: {
        passportSizePhoto: "https://via.placeholder.com/150"
      },
      // Include other user data as needed
    };
  
    try {
      // Use the email as the document ID
      await setDoc(doc(db, "users", newEmail), newStudent);
      setUsers([...users, { ...newStudent, id: newEmail }]); // Here we use email as the ID in the local state as well
    } catch (error) {
      console.error("Error adding new user: ", error);
    }
  };
  


  const saveEdit = async (id) => {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, { "profileData.fullName": newName });
    setUsers(users.map(user => user.id === id ? { ...user, profileData: { ...user.profileData, fullName: newName } } : user));
    setEditingId(null);
    setNewName('');
  };

  const deleteStudent = async (id) => {
    await deleteDoc(doc(db, "users", id));
    setUsers(users.filter(user => user.id !== id));
  };

  const filteredUsers = users.filter(user =>
    user.profileData.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">User List</h2>
        <input
          type="search"
          placeholder="Search user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      <table className="w-full table-auto mb-4">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">S.No</th>
            <th className="px-4 py-2">Profile Picture</th>
            <th className="px-4 py-2">Full Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">CNIC</th>
            <th className="px-4 py-2">Phone Number</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user.id} className="text-center">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">
                <img src={user.uploadedFiles.passportSizePhoto} alt="Profile" className="w-10 h-10 rounded-full mx-auto"/>
              </td>
              <td className="border px-4 py-2">
                {editingId === user.id ? (
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="p-2 border rounded"
                  />
                ) : (
                  user.profileData.fullName
                )}
              </td>
              <td className="border px-4 py-2">{user.profileData.email}</td>
              <td className="border px-4 py-2">{user.profileData.cnic}</td>
              <td className="border px-4 py-2">{user.profileData.phoneNumber}</td>
              <td className="border px-4 py-2">
                {editingId === user.id ? (
                  <button onClick={() => saveEdit(user.id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">Save</button>
                ) : (
                  <>
                    <button onClick={() => { setEditingId(user.id); setNewName(user.profileData.fullName); }} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">Edit</button>
                    <button onClick={() => deleteStudent(user.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2">Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <button
          onClick={addStudent}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New User
        </button>
      </div>
    </div>
  );
};

export default StudentsList;
