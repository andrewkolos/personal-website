/* eslint-disable react/no-unused-prop-types */
import { useRouter } from 'next/router'
import React, { PropsWithChildren, ReactElement } from 'react'
import { TabProps } from './tab'
import Styles from './tabs.module.scss'

export interface TabsProps {
  activeSlug: string
  parentSlug: string
}

export const Tabs: React.FC<PropsWithChildren<TabsProps>> = ({ children, activeSlug, parentSlug }) => {
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

  const selectedTab = getSelectedTab()

  return (
    <>
      <div className={Styles.tabsContainer}>
        {tabs.map((t) => (
          <button
            type="button"
            className={calcClassNameForTab(t.props.urlSlug)}
            onClick={() => selectTab(t.props.urlSlug)}
            key={t.key}
          >
            {t.props.title}
          </button>
        ))}
      </div>

      <div className={Styles.tabContent} key={selectedTab.key}>
        {selectedTab.props.children}
      </div>
    </>
  )

  function calcClassNameForTab(slug: string): string {
    const styles = [Styles.tab]
    if (slug === activeSlug) {
      styles.push(Styles.active)
    }
    return styles.join(' ')
  }

  function getSelectedTab() {
    const result = tabs.filter((t) => t.props.urlSlug === activeSlug)
    if (result.length > 1) {
      throw Error('Multiple tabs selected.')
    }
    if (result.length < 1) {
      throw Error(`No tab matches slug ${activeSlug}`)
    }
    return result[0]
  }

  function selectTab(slug: string): void {
    router.push(`${parentSlug}/${slug}`).catch((e) => {
      throw e
    })
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
