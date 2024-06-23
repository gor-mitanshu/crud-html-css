import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from './components/Form';
import Table from './components/Table';
import Modal from './components/Modal';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchData = () => {
    axios.get('http://localhost:5000/users').then((response) => {
      setData(response.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (user) => {
    setCurrentUser(user);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentUser(null);
  };

  return (
    <div className="App">
      <h1>CRUD Application</h1>
      <button onClick={ () => setModalIsOpen(true) }>Add User</button>
      <Table data={ data } fetchData={ fetchData } openModal={ openModal } />
      <Modal show={ modalIsOpen } closeModal={ closeModal }>
        <Form fetchData={ fetchData } currentUser={ currentUser } closeModal={ closeModal } />
      </Modal>
    </div>
  );
};

export default App;