import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

ReactModal.setAppElement('#root')

// Inspired by https://github.com/reactjs/react-modal/issues/603

const ReactModalAdapter = ({ className, ...props }) => (
  <ReactModal
    className={className}
    overlayClassName={`${className}__overlay`}
    bodyOpenClassName={`${className}__body-open`}
    {...props}
  />
)

ReactModalAdapter.propTypes = {
  className: PropTypes.string,
}

const Modal = styled(ReactModalAdapter)(
  ({ theme: { colors } }) => css`
    margin: 200px 0 0;
    width: 100%;
    max-width: 400px;
    background-color: ${colors.white};
    outline: none;
    border-radius: 4px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

    &__overlay {
      position: fixed;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      background-color: rgba(196, 196, 196, 0.5);
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 1;
    }

    /* No scroll on mobile Safari as per https://github.com/reactjs/react-modal/issues/191#issuecomment-302172285 */
    &__body-open {
      overflow: hidden;
      position: fixed;
      width: 100%;
      height: 100%;
    }
  `
)

Modal.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default Modal
