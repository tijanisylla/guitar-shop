import React, {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import {Button, FormControl, Modal} from "react-bootstrap";
import moment from 'moment';
import DeleteUser from './DeleteUser'
import { ThreeDRotation } from '@mui/icons-material';

import '../Style/Users.css'
const Users = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const online = <i className="fa-solid fa-circle" style={{color: '#31a24c', borderColor: '#31a24c'}}></i>
  const offline = <i className="fa-solid fa-circle"  style={{color: '#dc3545', borderColor: '#dc3545'}}></i>
   

  useEffect(() => {
    async function getUsers() {
      const response = await axios.get('http://localhost:8000/users');
      if (response.status === 200) {
        setData(response.data)

      } else {
        console.log('Operation failed!')
      };
    };
    getUsers();
  }, []);

  const userLog = localStorage.getItem('User');
  const dateLog = localStorage.getItem('date');

  return (
    <div className="users-admin">

      <FormControl
        style={{
        width: '100%'
      }}
        type="search"
        placeholder="Search User..."
        className="me-2"
        aria-label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}/>
      <Table striped bordered hover className="table" variant="dark">

        <thead>

          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Registered</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.filter((user) => {
            const result = user
              .username
              .toLowerCase()
              .includes(search.toLowerCase())
            if (search === "") {
              return user
            } else if (result) {
              return user
            }
          }).map((user, idx) => {
            const {id, username, active, date, role} = user
            return <> <tr key={idx}>
              <td>{id}</td>
              <td>{username}</td>
              <td>{role}</td>
              <td>{moment(date).fromNow()}</td>
              <td>{active ? online : offline}</td>
              <td>
                <DeleteUser 
                user={user} data={data} setData={setData}/>
              </td>
            </tr> 
            </>
      })}
        </tbody>
      </Table>
    </div>
  )
};
export default Users;