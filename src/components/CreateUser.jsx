import axios from 'axios';
import React, {useState } from "react";


export const CreateUser = () => {
  

  const [state, setState] = useState({
    username: ''
  });


  const onChangeUsername = (e) => {
    setState({
      username: e.target.value
    })
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: state.username
    }

    console.log(user);

    axios.post('http://localhost:5000/api/users/add', user)
      .then(res => console.log(res.data));

    setState({
      username: ''
    })
  };

  return (
    <div>
        <h3>Create New User</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={state.username}
                onChange={onChangeUsername}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
  );
};
