/* eslint-disable react/no-unused-prop-types */
import { useRouter } from 'next/router'
import React, { PropsWithChildren, ReactElement, useState } from 'react'
import { TabProps } from './tab'
import Styles from './tabs.module.scss'

export const Tabs: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const tabs = asTabs(children)

  ;(() => {
    const selectedTabs = tabs.filter((td) => td.props.selected)
    if (selectedTabs.length > 1) {
      throw Error(
        `Multiple tabs may not be selected. Selected tabs: ${selectedTabs.map((td) => td.props.title).join(',')}`,
      )
    }
  })()

  const [selectedIndex, setSelectedIndex] = useState<number>(indexOfSelectedTab(tabs))

  return (
    <>
      <div className={Styles.tabsContainer}>
        {tabs.map((t, i) => (
          <button type="button" className={calcClassNameForTab(i)} onClick={() => selectTab(i)} key={t.key}>
            {t.props.title}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div className={classNameForTabContent(i)} key={t.key}>
          {t.props.children}
        </div>
      ))}
    </>
  )

  function selectTab(index: number) {
    setSelectedIndex(index)
    router
      .push(`/art/${tabs[index].props.urlSlug}`, undefined, { shallow: true })
      .catch((e) => console.error(`Unable to switch tab. ${e}`))
  }

  function calcClassNameForTab(index: number): string {
    const styles = [Styles.tab]
    if (selectedIndex === index) {
      styles.push(Styles.active)
    }
    return styles.join(' ')
  }

  function classNameForTabContent(index: number): string {
    return index === selectedIndex ? Styles.tabContent : Styles.hidden
  }
}

function asTabs(children: React.ReactNode): ReactElement<PropsWithChildren<TabProps>>[] {
  if (typeof children !== 'object' || children == null) {
    throw Error()
  }
  if (!(Symbol.iterator in children)) {
    throw Error()
  }

  const asArray = Array.from(children)

  const validChildren: ReactElement<TabProps>[] = asArray.filter((e) =>
    React.isValidElement<TabProps>(e),
  ) as ReactElement<TabProps>[]

  if (validChildren.length < asArray.length) {
    throw Error('All children of Tabs component must be instances of Tab.')
  }

  return validChildren
}

function indexOfSelectedTab(tabs: ReactElement<TabProps>[]): number {
  const idx = tabs.findIndex((t) => t.props.selected)
  return idx > -1 ? idx : 0
}
