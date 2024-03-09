import React, { PropsWithChildren, ReactElement, useEffect, useState } from 'react'
import { TabProps } from './tab'
import Styles from './tabs.module.scss'

export const Tabs: React.FC<PropsWithChildren> = ({ children }) => {
  const tabs = asTabs(children)

  ;(() => {
    const selectedTabs = tabs.filter((td) => td.props.selected)
    if (selectedTabs.length > 1) {
      throw Error(
        `Multiple tabs may not be selected. Selected tabs: ${selectedTabs.map((td) => td.props.title).join(',')}`,
      )
    }
  })()

  // We don't want to include any images in the SSR.
  const [selectedTabIndex, setSelectedTabIdex] = useState<number>(-1)

  useEffect(() => {
    // hack to be able to "link" directly to sketchbook tab because
    // during SSR the slug will always be empty
    // window is not available during SSR, so we have to useEffect here.
    // We can't use router.pathname because it will only include the rewrite destination.
    setSelectedTabIdex(0)
  }, [])

  return (
    <>
      <div className={Styles.tabsContainer}>
        {tabs.map((t, i) => (
          <button type="button" className={calcClassNameForTab(i)} onClick={() => selectTab(i)} key={t.key}>
            {t.props.title}
          </button>
        ))}
      </div>
      {tabs.map((t, i) =>
        selectedTabIndex !== i ? undefined : (
          <div className={classNameForTabContent(i)} key={t.key}>
            {t.props.children}
          </div>
        ),
      )}
    </>
  )

  function selectTab(index: number) {
    setSelectedTabIdex(index)
  }

  function calcClassNameForTab(index: number): string {
    const styles = [Styles.tab]
    if (selectedTabIndex === index) {
      styles.push(Styles.active)
    }
    return styles.join(' ')
  }

  function classNameForTabContent(index: number): string {
    return index === selectedTabIndex ? Styles.tabContent : Styles.hidden
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
