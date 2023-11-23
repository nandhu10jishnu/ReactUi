import React, { useState,useEffect, useRef  } from "react";
import axios from "axios";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export const CreateExcercise = () => {
  


  const [state, setState] = useState({
    username: '',
    description: '',
    duration: '',
    date: new Date(),
    users: []
  });

  const userInputRef = useRef(null);

  useEffect(() => {
    
    axios.get('http://localhost:5000/api/users/')
    .then(response => {
      if (response.data.length > 0) {
        setState({
          users: response.data.map(user => user.username),
          username: response.data[0].username
        })
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },[]);


  const onChangeUsername = (e) => {
    setState({
      ...state,
      username: e.target.value
    })
  };

  const onChangeDescription = (e) => {
    setState({
      ...state,
      description: e.target.value
    })
  };

  const onChangeDuration = (e) => {
    setState({
      ...state,
      duration: e.target.value
    })
  };

  const onChangeDate = (date) => {
    setState({
      ...state,
      date: date
    })
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username: state.username,
      description:state.description,
      duration: state.duration,
      date: state.date
    }

    console.log(exercise);

    axios.post('http://localhost:5000/api/exercises/add', exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  };

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            ref={userInputRef}
            required
            className="form-control"
            value={state.username}
            onChange={onChangeUsername}>
            {state.users.map(function (user) {
              return <option
                key={user}
                value={user}>{user}
              </option>;
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input type="text"
            required
            className="form-control"
            value={state.description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={state.duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={state.date}
              onChange={onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};
