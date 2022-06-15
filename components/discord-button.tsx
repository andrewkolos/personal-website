import React, { useState } from 'react'
import { SiDiscord } from 'react-icons/si'
import { Key } from 'ts-key-enum'
import { Toast, ToastData } from './toast/toast'

export interface DiscordButtonProps {
  className: string
}

export const DiscordButton: React.FC<DiscordButtonProps> = ({ className }) => {
  const [toastsList, setToastsList] = useState<ToastData[]>([])

  function showDiscordToast() {
    navigator.clipboard.writeText('AndrewBagel#2199')

    setToastsList([
      ...toastsList,
      {
        id: String(Math.floor(Math.random() * 1000)),
        title: 'Discord username copied to clipboard',
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
