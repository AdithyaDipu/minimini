import React, { useState } from 'react';
import { deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
// Import necessary functions from firebase/firestore
import { initializeApp } from "firebase/app";// Import the app instance from your firebase configuration file


function DeleteField() {
  const [deleteCname, setDeleteCname] = useState('');
  const db = getFirestore(app); // Ensure getFirestore is imported

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const q = query(collection(db, 'crops'), where("cname", "==", deleteCname));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (docSnapshot) => {
        await deleteDoc(doc(db, 'crops', docSnapshot.id));
      });

      console.log("Documents successfully deleted!");
      setDeleteCname('');
    } catch (error) {
      console.error("Error deleting documents: ", error);
    }
  };

  return (
    <div className='bug'>
      <h2>Delete Crop Data</h2>
      <form onSubmit={handleDelete}>
        <div>
          <label>
            Crop Name to Delete:
            <input
              type="text"
              value={deleteCname}
              onChange={(e) => setDeleteCname(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Delete</button>
      </form>
    </div>
  );
}

export default DeleteField;
