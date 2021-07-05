import { useEffect, useState, useRef } from "react";

export const useModal = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [modalIsOpened, setModalIsOpened] = useState(false);

  const handleModal = () => {
    const { current } = dialogRef;
    if(modalIsOpened){
      current?.close();
      setModalIsOpened(false);
    }else{
      current?.showModal();
      setModalIsOpened(true);
    }
  }
  
  return {
    handleModal,
    dialogRef
  }
}