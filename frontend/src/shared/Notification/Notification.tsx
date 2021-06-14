import React, { useState } from 'react';
import styled from 'styled-components';
import { IoCloseSharp } from "react-icons/io5";

type NotificationVariants = | 'success' | 'error';

type NotificationProps = {
  text: string;
  variant: NotificationVariants;
}

type StyledNotificationProps = {
  variant: NotificationVariants;
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

export const Notification = ( { text, variant }: NotificationProps) => {
  const [ isVisible, setIsVisible ] = useState(true);

  return (
    <StyledNotification variant={variant} className={`${!isVisible && 'notification-closed'}`} >
      <IoCloseSharp className="close-icon" onClick={() => setIsVisible(false)} />
      { text }
    </StyledNotification>
  )
}
