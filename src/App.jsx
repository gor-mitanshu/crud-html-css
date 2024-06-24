import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from './components/form/Form';
import Table from './components/table/Table';
import Modal from './ui/modal/Modal';
import Toaster from './ui/toaster/Toaster';
import ConfirmDialog from './ui/dialog/ConfirmDialog';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowConfirmDialog(true);
  };

  const confirmDelete = () => {
    axios.delete(`http://localhost:5000/users/${deleteId}`).then(() => {
      fetchData();
      setShowConfirmDialog(false);
      setToastMessage('User deleted successfully');
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    });
  };

  const cancelDelete = () => {
    setShowConfirmDialog(false);
    setDeleteId(null);
  };

  return (
    <div className="App">
      <h1>CRUD Application</h1>
      <button onClick={ () => setModalIsOpen(true) }>Add User</button>
      <Table data={ data } fetchData={ fetchData } openModal={ openModal } handleDelete={ handleDelete } />
      <Modal show={ modalIsOpen } closeModal={ closeModal }>
        <Form fetchData={ fetchData } currentUser={ currentUser } closeModal={ closeModal } />
      </Modal>
      <Toaster message={ toastMessage } show={ showToast } handleClose={ () => setShowToast(false) } />
      { showConfirmDialog && (
        <ConfirmDialog
          message="Are you sure you want to delete this user?"
          onConfirm={ confirmDelete }
          onCancel={ cancelDelete }
        />
      ) }
    </div>
  );
};

export default App;
