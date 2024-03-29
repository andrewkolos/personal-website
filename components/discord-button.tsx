import React, { useState } from 'react'
import { FaDiscord } from 'react-icons/fa'
import { Key } from 'ts-key-enum'
import { Toast, ToastData } from './toast/toast'

export interface DiscordButtonProps {
  className?: string
}

const DISCORD_USERNAME = 'AndrewBagel'
export const DiscordButton: React.FC<DiscordButtonProps> = ({ className }) => {
  const [toastsList, setToastsList] = useState<ToastData[]>([])

  function showDiscordToast() {
    navigator.clipboard
      .writeText(DISCORD_USERNAME)
      .then(() => {
        setToastsList([
          ...toastsList,
          {
            id: String(Math.floor(Math.random() * 1000)),
            title: `Discord username copied to clipboard:`,
            subtitle: DISCORD_USERNAME,
          },
        ])
      })
      .catch(() => {
        setToastsList([
          ...toastsList,
          {
            id: String(Math.floor(Math.random() * 1000)),
            title: `Unable to copy username to clipboard:`,
            subtitle: DISCORD_USERNAME,
          },
        ])
      })
  }

  return (
    <>
      <a
        className={className}
        onClick={() => showDiscordToast()}
        role="button"
        tabIndex={0}
        onKeyDown={(key) => {
          if (key.key === Key.Enter) {
            showDiscordToast()
          }
        }}
      >
        <FaDiscord />
      </a>
      <Toast toastList={toastsList} />
    </>
  )
}

DiscordButton.defaultProps = {
  className: '',
}
