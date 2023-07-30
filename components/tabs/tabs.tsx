/* eslint-disable react/no-unused-prop-types */
import { useRouter } from 'next/router'
import React, { PropsWithChildren, ReactElement, useEffect, useState } from 'react'
import { TabProps } from './tab'
import Styles from './tabs.module.scss'

export interface TabsProps {
  basePath: string
}

export const Tabs: React.FC<PropsWithChildren<TabsProps>> = ({ children, basePath }) => {
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

  // We don't want to include any images in the SSR.
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)

  useEffect(() => {
    // hack to be able to "link" directly to sketchbook tab because
    // during SSR the slug will always be empty
    // window is not available during SSR, so we have to useEffect here.
    // We can't use router.pathname because it will only include the rewrite destination.
    setSelectedIndex(indexOfSelectedTab(window.location.pathname))
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
        selectedIndex !== i ? undefined : (
          <div className={classNameForTabContent(i)} key={t.key}>
            {t.props.children}
          </div>
        ),
      )}
    </>
  )

  function selectTab(index: number) {
    setSelectedIndex(index)
    router
      .push(`/art/${tabs[index].props.urlSlug}`, undefined, { shallow: true })
      .catch((e) => console.error(`Unable to switch tab. ${e}`))
  }

  function calcClassNameForTab(index: number): string {
    console.log('idx', selectedIndex)
    const styles = [Styles.tab]
    if (selectedIndex === index) {
      styles.push(Styles.active)
    }
    return styles.join(' ')
  }

  function classNameForTabContent(index: number): string {
    return index === selectedIndex ? Styles.tabContent : Styles.hidden
  }

  function indexOfSelectedTab(currentPath: string): number {
    console.log('regex', `${basePath}/`)
    const slug = currentPath.replace(RegExp(`${basePath}/?`), '')
    console.log(`"${slug}"`)
    if (slug === '') {
      const idx = tabs.findIndex((t) => t.props.selected)
      return idx > -1 ? idx : 0
    }

    const idx = tabs.findIndex((t) => t.props.urlSlug === slug)
    console.log(idx)
    return idx
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
