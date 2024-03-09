import React, { PropsWithChildren } from 'react'

export interface TabProps {
  title: string
  selected?: boolean
}

export const Tab: React.FC<PropsWithChildren<TabProps>> = ({ children }) => children
