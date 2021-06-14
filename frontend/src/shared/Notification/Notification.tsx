import React, { useState } from 'react';
import styled from 'styled-components';
import { IoCloseSharp } from "react-icons/io5";

type NotificationVariants = | 'success' | 'error';

type NotificationProps = {
  text: string;
  variant: NotificationVariants;
  isOpened: boolean;
  setNotificationIsOpened: (opened: boolean) => void;
}

type StyledNotificationProps = {
  variant: NotificationVariants;
  isOpened: boolean;
}

const StyledNotification = styled.div<StyledNotificationProps> `
  background:${ props => props.variant === 'error' ? '#E36447' : '#5cb85c' };
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  font-weight: 30px;
  font-weight: 500;
  color: white;

  & .close-icon {
    position: absolute;
    right: 20px;
    cursor: pointer;
    opacity: 0.7;
    font-size: 25px;
    transition: all 0.5s;
  }

  & .close-icon:hover {
    opacity: 1;
    transform: scale(1.1);
  }

  &.notification-closed {
    animation: close-notification 0.1s ease-out;
    animation-fill-mode: forwards;
  }

  @keyframes close-notification {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(-100%);
    }
  }
`;

export const Notification = ( { text, variant, isOpened, setNotificationIsOpened }: NotificationProps) => {

  const [ closeAnimation, setCloseAnimation ] = useState(false);

  const handleClose = () => {
    setCloseAnimation(true);
    setTimeout(() => {
      setNotificationIsOpened(false);
      setCloseAnimation(false);
    }, 1000);
  }
  
  return (
    <>
      {isOpened && 
        <StyledNotification 
          variant={variant} 
          className={`${closeAnimation &&'notification-closed'}`} 
          isOpened={isOpened}
        >
          <IoCloseSharp className="close-icon" onClick={handleClose} />
            { text }
        </StyledNotification>  
      }
    </>
  )
}
