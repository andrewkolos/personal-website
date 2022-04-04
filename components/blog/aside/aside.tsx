import React from 'react'
import Styles from './aside.module.scss'

export const Aside: React.FC<void> = ({ children }) => <div className={Styles.aside}>{children}</div>
