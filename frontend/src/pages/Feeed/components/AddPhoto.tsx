import React from 'react'
import { Button, ButtonVariants } from '../../../shared/Button/Button';

type AddPhotoProps = {
  handleModal: () => void;
}

export const AddPhoto = ({ handleModal }: AddPhotoProps) => {
  return (
    <div>
      <Button
        variant={ButtonVariants.Warning}
        buttonTitle="Cancel"
        onClick={handleModal}
      />
    </div>
  )
}
