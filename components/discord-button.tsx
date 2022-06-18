import React, { useState } from 'react'
import { SiDiscord } from 'react-icons/si'
import { Key } from 'ts-key-enum'
import { Toast, ToastData } from './toast/toast'

export interface DiscordButtonProps {
  className?: string
}

const DISCORD_USERNAME = 'AndrewBagel#2199'
export const DiscordButton: React.FC<DiscordButtonProps> = ({ className }) => {
  const [toastsList, setToastsList] = useState<ToastData[]>([])

  function showDiscordToast() {
    navigator.clipboard.writeText(DISCORD_USERNAME)

    setToastsList([
      ...toastsList,
      {
        id: String(Math.floor(Math.random() * 1000)),
        title: `Discord username copied to clipboard:`,
        subtitle: DISCORD_USERNAME,
      },
    ])
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
        <SiDiscord />
      </a>
      <Toast toastList={toastsList} />
    </>
  )
}

DiscordButton.defaultProps = {
  className: '',
}
