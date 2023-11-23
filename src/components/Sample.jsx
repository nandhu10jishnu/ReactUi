import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker"; // Import DatePicker if not already imported

export const Sample = (props) => {
  const params = useParams();
  
 

  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    
    axios
      .get(`http://localhost:5000/api/exercises/`+params.id)
      .then((response) => {
        setExercise({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/api/users/")
      .then((response) => {
        if (response.data.length > 0) {
          setUsers(response.data.map((user) => user.username));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },[params.id]);

  const onChangeUsername = (e) => {
   
    setExercise({...exercise, username: e.target.value });
  };

  const onChangeDescription = (e) => {
  
    setExercise({ ...exercise, description: e.target.value });
  };

  const onChangeDuration = (e) => {
    
    setExercise({ ...exercise, duration: e.target.value });
  };

  const onChangeDate = (date) => {
   
    setExercise({ ...exercise, date: date });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //console.log("dd",exercise.username);
    const updatedExercise  = {
      username: exercise.username,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date
    }

    console.log(exercise);

    axios.post('http://localhost:5000/api/exercises/update/' + params.id, updatedExercise )
      .then(res => console.log(res.data));

    window.location = '/';
  };

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={exercise.username}
            onChange={onChangeUsername}
          >
            {users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={exercise.description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={exercise.duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={exercise.date}
              onChange={onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};
