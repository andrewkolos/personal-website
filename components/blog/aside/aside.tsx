import React, { PropsWithChildren } from 'react'
import Styles from './aside.module.scss'

export const Aside: React.FC<PropsWithChildren<void>> = ({ children }) => <div className={Styles.aside}>{children}</div>
