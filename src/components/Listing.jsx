import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Listing = () => {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);

  const Exercise = ({ exercise }) => {
  const formattedDate = new Date(exercise.date).toLocaleDateString();

    return (
      <tr>
        <td>{exercise.username}</td>
        <td>{exercise.description}</td>
        <td>{exercise.duration}</td>
        <td>{formattedDate}</td>
        <td>
          <button onClick={() => editExercise(exercise._id)}>edit</button>
          <button onClick={() => deleteExercise(exercise._id)}>delete</button>
        </td>
      </tr>
    );
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/exercises/')
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteExercise = (exerciseId) => {
    axios
      .delete('http://localhost:5000/api/exercises/' + exerciseId)
      .then((response) => {
        console.log(response.data);
        setExercises(exercises.filter((el) => el._id !== exerciseId));
      });
  };

  const editExercise = (exerciseId) => {
    navigate('/sample/' + exerciseId, { state: { id: exerciseId } });
  };

  const exerciseList = () => {
    return exercises.map((currentExercise) => (
      <Exercise exercise={currentExercise} key={currentExercise._id} />
    ));
  };

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exerciseList()}</tbody>
      </table>
    </div>
  );
};
