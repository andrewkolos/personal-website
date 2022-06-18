import React, { useEffect, useState } from 'react'
import { FiCheck } from 'react-icons/fi'
import Styles from './toast.module.scss'

export interface ToastData {
  id: string
  title: string
  subtitle?: string
}
interface ToastProps {
  toastList: ToastData[]
}

export const Toast: React.FC<ToastProps> = ({ toastList }) => {
  const [list, setList] = useState<ToastData[]>(toastList)

  useEffect(() => {
    setList(toastList)
  }, [toastList, list])

  useEffect(() => {
    const interval = setInterval(() => {
      if (toastList.length > 0 && list.length > 0) {
        deleteToast(toastList[0].id)
      }
    }, 5 * 1000)

    return () => {
      clearInterval(interval)
    }
  }, [toastList, list])

  function deleteToast(id: string) {
    const listItemIndex = list.findIndex((e) => e.id === id)
    const toastListItem = toastList.findIndex((e) => e.id === id)
    list.splice(listItemIndex, 1)
    toastList.splice(toastListItem, 1)
    setList([...list])
  }

  return (
    <div className={`${Styles.notificationContainer}`}>
      {list.map((toast) => (
        <div className={`${Styles.notificationToast} ${Styles.toast}`} key={toast.title + toast.id}>
          <div className={Styles.notificationImage}>
            <FiCheck />
          </div>
          <div>
            <p className={Styles.notificationTitle}>{toast.title}</p>
            {toast.subtitle ?? <p className={Styles.notificationMessage}>{toast.subtitle}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
