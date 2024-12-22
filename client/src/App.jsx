// import "./App.css";
// import axios from "axios";
// import { useEffect, useState } from "react";

// function App() {
//   const [user, setUser] = useState([]);
//   const [filteredUser, setFilteredUser] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [userData, setUserData] = useState({
//     name: "",
//     age: "",
//     city: "",
//   });

//   const getAllUsers = async () => {
//     await axios
//       .get("http://localhost:8000/users")
//       .then((response) => {
//         setUser(response.data);
//         setFilteredUser(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   useEffect(() => {
//     getAllUsers();
//   }, []);

//   const handleSearchChange = (e) => {
//     const search = e.target.value.toLowerCase();
//     const filteredUsers = user.filter(
//       (user) =>
//         user.name.toLowerCase().includes(search) ||
//         user.city.toLowerCase().includes(search)
//     );
//     setFilteredUser(filteredUsers);
//   };

//   const handleDelete = async (id) => {
//     const isConfirmed = window.confirm("Are you sure you want to delete?");
//     if (isConfirmed) {
//       await axios
//         .delete(`http://localhost:8000/users/${id}`)
//         .then((response) => {
//           setUser(response.data);
//           setFilteredUser(response.data);
//         });
//     }
//   };

//   const handleAddRecord = () => {
//     setIsModalOpen(true);
//     setUserData({
//       name: "",
//       age: "",
//       city: "",
//     });
//   };

//   const handleData = async (e) => {
//     setUserData({
//       ...userData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (userData.id) {
//       await axios
//         .patch(`http://localhost:8000/users/${userData.id}`, userData)
//         .then((response) => {
//           console.log(response);
//         });
//     } else {
//       await axios
//         .post("http://localhost:8000/users", userData)
//         .then((response) => {
//           console.log(response);
//         });
//     }
//     closeModal();
//     setUserData({
//       name: "",
//       age: "",
//       city: "",
//     });
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     getAllUsers();
//   };
//   const updateRecord = (user) => {
//     setIsModalOpen(true);
//     setUserData(user);
//     handleSubmit();
//   };
//   return (
//     <>
//       <div className="container">
//         <h1>CRUD Application with React.js Frontend and Node.js Backend</h1>
//         <div className="input-search">
//           <input
//             type="search"
//             placeholder="Search..."
//             onChange={handleSearchChange}
//           />
//           <button className="btn" onClick={handleAddRecord}>
//             Add New Record
//           </button>
//         </div>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Id</th>
//               <th>Name</th>
//               <th>Age</th>
//               <th>City</th>
//               <th>Edit</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUser &&
//               filteredUser.map((user) => {
//                 return (
//                   <tr key={user.id}>
//                     <td>{user.id}</td>
//                     <td>{user.name}</td>
//                     <td>{user.age}</td>
//                     <td>{user.city}</td>
//                     <td>
//                       <button
//                         className="btn green"
//                         onClick={() => updateRecord(user)}
//                       >
//                         Edit
//                       </button>
//                     </td>
//                     <td>
//                       <button
//                         className="btn red"
//                         onClick={() => handleDelete(user.id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//           </tbody>
//         </table>
//         {isModalOpen && (
//           <div className="modal">
//             <div className="modal-content">
//               <span className="close" onClick={closeModal}>
//                 &times;
//               </span>
//               <h2>{userData.id ? "Update Record" : "Add New Record"}</h2>
//               <form>
//                 <div className="form-group">
//                   <label htmlFor="name">Name:</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={userData.name}
//                     onChange={handleData}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="age">Age:</label>
//                   <input
//                     type="text"
//                     name="age"
//                     value={userData.age}
//                     onChange={handleData}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="city">City:</label>
//                   <input
//                     type="text"
//                     name="city"
//                     value={userData.city}
//                     onChange={handleData}
//                   />
//                 </div>
//                 <button type="submit" className="btn" onClick={handleSubmit}>
//                   {userData.id ? "Update" : "Add"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default App;

import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    city: "",
  });

  const getAllUsers = async () => {
    await axios
      .get("http://localhost:8000/users")
      .then((response) => {
        setUser(response.data);
        setFilteredUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSearchChange = (e) => {
    const search = e.target.value.toLowerCase();
    const filteredUsers = user.filter(
      (user) =>
        user.name.toLowerCase().includes(search) ||
        user.city.toLowerCase().includes(search)
    );
    setFilteredUser(filteredUsers);
  };

  const handleDelete = async (_id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");
    if (isConfirmed) {
      await axios
        .delete(`http://localhost:8000/users/${_id}`)
        .then(() => {
          getAllUsers(); // Refresh the user list
        })
        .catch((error) => {
          console.log("Error deleting user:", error);
        });
    }
  };

  const handleAddRecord = () => {
    setIsModalOpen(true);
    setUserData({
      name: "",
      age: "",
      city: "",
    });
  };

  const handleData = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData._id) {
      // Update user
      await axios
        .patch(`http://localhost:8000/users/${userData._id}`, userData)
        .then(() => {
          getAllUsers();
        })
        .catch((error) => {
          console.log("Error updating user:", error);
        });
    } else {
      // Add new user
      await axios
        .post("http://localhost:8000/users", userData)
        .then(() => {
          getAllUsers();
        })
        .catch((error) => {
          console.log("Error adding user:", error);
        });
    }
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateRecord = (user) => {
    setIsModalOpen(true);
    setUserData(user);
  };

  return (
    <>
      <div className="container">
        <h1>CRUD Application with MERN stack</h1>
        <div className="input-search">
          <input
            type="search"
            placeholder="Search..."
            onChange={handleSearchChange}
          />
          <button className="btn" onClick={handleAddRecord}>
            Add New Record
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredUser &&
              filteredUser.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.city}</td>
                  <td>
                    <button
                      className="btn green"
                      onClick={() => updateRecord(user)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn red"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h2>{userData._id ? "Update Record" : "Add New Record"}</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleData}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="age">Age:</label>
                  <input
                    type="text"
                    name="age"
                    value={userData.age}
                    onChange={handleData}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="city">City:</label>
                  <input
                    type="text"
                    name="city"
                    value={userData.city}
                    onChange={handleData}
                  />
                </div>
                <button type="submit" className="btn" onClick={handleSubmit}>
                  {userData._id ? "Update" : "Add"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
