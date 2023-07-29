import React, { PropsWithChildren } from 'react'

export interface TabProps {
  title: string
  urlSlug: string
  selected: boolean
}

export const Tab: React.FC<PropsWithChildren<TabProps>> = ({ children }) => children
