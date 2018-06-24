import React from 'react';
import './style.css';
import Modal from '../modal';
import CloseIcon from 'react-icons/lib/md/close';

function WelcomeModal({ isOpen, onCancel, onConnectFeeds }) {

  const renderContent = () => (
    <div className='welcome-modal'>
      <div className='welcome-modal__header'><CloseIcon className='welcome-modal__cancel' size={30} onClick={onCancel}/></div>
      <div className='welcome-modal__title'>Quoll</div>
      <div className='welcome-modal__message'><span>Map yo' life.</span></div>
      <div className='welcome-modal__actions'>
        <button className='welcome-modal__actions-connect' onClick={onConnectFeeds}>Connect Feeds</button>
      </div>
    </div>
  )

  const render = () => <Modal>{renderContent()}</Modal>;

  return isOpen && render();
}

export default WelcomeModal;