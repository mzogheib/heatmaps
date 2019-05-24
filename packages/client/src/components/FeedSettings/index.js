import React from 'react'
import './style.scss'
import Loader from '../HorizontalLoader'
import Button from '../Button'

const FeedSettings = ({ feed, onConnect, onDisconnect }) => {
  const {
    isAuthenticating,
    isConnected,
    imageConnected,
    imageDisconnected,
    name,
    title,
    link,
  } = feed
  const imgSrc = isConnected ? imageConnected : imageDisconnected

  const handleButtonClick = () => {
    if (isAuthenticating) {
      return
    }
    return isConnected ? onDisconnect(name) : onConnect(name)
  }

  return (
    <div className="feed-settings">
      <div className="feed-settings__logo">
        <img src={imgSrc} alt={`${name} logo`} />
      </div>
      <div className="feed-settings__info">
        <div className="feed-settings__title">{title}</div>
        <a
          className="feed-settings__url"
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.label}
        </a>
      </div>
      <Button.Plain
        label={isConnected ? 'Disconnect' : 'Connect'}
        onClick={handleButtonClick}
        disabled={isAuthenticating}
      />
      {isAuthenticating && (
        <div className="feed-settings__loader">
          <Loader />
        </div>
      )}
    </div>
  )
}

export default FeedSettings
