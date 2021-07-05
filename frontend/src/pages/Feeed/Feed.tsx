import React from 'react'
import logo from '../../assets/images/my_unsplash_logo.svg';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { Button } from '../../shared/Button/Button';
import { Modal } from '../../shared/Dialog/Dialog';
import { useModal } from '../../hooks/useModal';
import { AddPhoto } from './components/AddPhoto';

export const Feed = () => {
  
  const { dialogRef, handleModal } = useModal();

  return (
    <>
      <Header>
        <img src={logo} alt="Logo de la aplicación" />
        <SearchBar className="searchbar"/>
        <Button
          buttonTitle="Add a photo"
          width="137px"
          className="add-button"
          onClick={handleModal}
        />
      </Header>
      <Modal
        title="Add a new photo"
        reference={dialogRef}
      >
        <AddPhoto handleModal={handleModal} />
      </Modal>
    </>
  )
}
