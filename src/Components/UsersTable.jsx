import { useEffect, useState } from "react";
import axios from "axios";
import { FaPen, FaPlus, FaRegTrashCan } from "react-icons/fa6";
const UsersTable = () => {
  // fetchApiData
  const [users, setUsers] = useState([]);
  const [copyUsers,setCopyUsers] = useState([]);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
        setCopyUsers(response.data)
      })
      .catch((error) => {
        console.log("error fetching data", error);
      });
  }, []);

  // delete User
  const deleteUser = (userId) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => {
        if (response.status == 200) {
          
          let restOfUsers= users.filter((user) => user.id !== userId);
          setUsers(restOfUsers)

          // let deltd = users.filter((user) => user.id === userId);
          // console.log(deltd);
          // deltd = document.getElementById(userId).remove();
          
        }
      })
      .catch((error) => {
        console.log("error deleting data", error);
      });
  };
  // Add User
  const AddUser = (index) => {
    let name = document.getElementById("name").value;
    let username = document.getElementById("userName").value;
    let email = document.getElementById("email").value;
    // let ID = users.length + 1;
    // console.log(ID);
    let newUser = {
      id: users.length + 1,
      name: name,
      username: username,
      email: email,
    };
    axios
      .post(`https://jsonplaceholder.typicode.com/users`, newUser)
      .then((res) => {
        if (res.status == 201) {
          console.log(users)
          let u=users.push(newUser);
          // setUsers(u)
        }
      })
      .catch((err) => console.log("error posting data"));
  };
    //search User
    //
    //
    const searchUser=()=>{

      // let txt=document.getElementById("txtSearch").value
      // txt="hello "+txt
      // console.log(txt)
      // document.getElementById("btnSearch").value = document.getElementById("txtSearch").value;
      users.map((nUser)=>{if (nUser.name===document.getElementById("txtSearch").value
        ||nUser.username===document.getElementById("txtSearch").value
        ||nUser.email===document.getElementById("txtSearch").value){
        console.log(nUser)
        document.getElementById("txtSearch").value=""
      }})
   
    }
    // edit user
    // 

  return (
    <div className="container">
      <form
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap:"4px"
        }}
      >
        <input
          style={{ width: "13em" }}
          id="txtSearch"
          className="form-control rounded-pill"
          type="search"
          placeholder="search"
        />
        <input id="btnSearch" onClick={()=>searchUser()} style={{border:"none",padding:".5em 1em .5em 1em"}} className="rounded-pill mt-4 mb-3 bg-success" type="button" value="search"></input>
      </form>
      <p>adding data</p>
      <form
        className="mb-4"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
          width: "100%",
        }}
      >
        <input
          style={{ width: "13em" }}
          id="name"
          className="form-control rounded-pill"
          type="text"
          placeholder="Name"
        />
        <input
          style={{ width: "13em" }}
          id="userName"
          className="form-control rounded-pill"
          type="text"
          placeholder="user Name"
        />
        <input
          style={{ width: "15em" }}
          id="email"
          className="form-control rounded-pill"
          type="email"
          placeholder="email"
        />
        <span>
          <FaPlus className="btn btn-success bt" onClick={() => AddUser()} />
        </span>
      </form>
      {copyUsers.length ? (
        <>
        <label style={{width:"100%",display:"flex",justifyContent:"flex-end",gap:".4em"}}>
          show
          <select name="selectCount" id="selectCount">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          entries
          </label>
        <table
          dir="rtl"
          className="table d-flex-col items-center "
          style={{ textAlign: "right" }}
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">user Name</th>
              <th scope="col">Email</th>
              <th scope="col">delete</th>
              <th scope="col">edit</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {users.map((user, index) => {
              const { id, name, username, email } = user;
              return (
                <tr className="trr" id={id} key={index}>
                  <th scope="row">{id}</th>
                  <td>{name}</td>
                  <td>{username}</td>
                  <td dir="ltr">{email}</td>

                  <td>
                    <FaRegTrashCan
                      className="btn btn-danger bt"
                      onClick={() => deleteUser(id)} />
                  </td>
                  <td>
                    <FaPen
                      className="btn btn-primary bt"
                      onClick={() => deleteUser(id)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <nav style={{display:"flex",justifyContent:"flex-start",width:"100%"}}   aria-label="Page navigation example">
          <ul dir="rtl" className="pagination justify-content-center">
            <li className="page-item disabled">
              <a className="page-link" href="#" tabIndex="-1">Previous</a>
            </li>
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item">
              <a className="page-link" href="#">Next</a>
            </li>
          </ul>
      </nav>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "80vh",
          }}
        >
          <div
            className="spinner-border"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="visually-hidden"></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
