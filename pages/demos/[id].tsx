import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { embeddedDemos, getDemoById } from '../../lib/demos'
import Styles from './embedded-app.module.scss'

export async function getStaticPaths() {
  return {
    paths: embeddedDemos.map((demo) => ({
      params: {
        ...demo,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps(params: any) {
  const demoData = getDemoById(params.params.id)
  return {
    props: {
      demoUrl: demoData.demoUrl,
    },
  }
}

export interface DemoPageProps {
  demoUrl: string
}

const DemoPage: React.FC<DemoPageProps> = (props) => {
  const { demoUrl } = props
  const [appLoaded, setAppLoaded] = useState(false)
  const loadingEl = useRef<HTMLDivElement>(null)
  const iframeEl = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // Hides scrollbar.
    const html = document.documentElement
    html.style.overflow = 'hidden'
    html.style.margin = '0'

    return function cleanup() {
      html.style.overflow = ''
      html.style.margin = ''
    }
  })

  useEffect(() => {
    const el = loadingEl.current
    if (!el) return
    if (appLoaded) el.classList.add(Styles.hide)
  })

  useEffect(() => {
    const el = iframeEl.current
    if (!el) return
    el.onload = () => {
      el.focus()
      setAppLoaded(true)
    }
  })

  return (
    <div className={Styles.container}>
      <div ref={loadingEl} className={Styles.loadingContainer}>
        <div className={Styles.loading}>
          <div className={Styles.ldsEllipsisContainer}>
            <div className={Styles.ldsEllipsis}>
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
          Hello! The server is being rehydrated.
          <br />
          This could take up to 15 seconds.
        </div>
      </div>

      <div className={Styles.returnToSiteContainer}>
        <Link href="/demos">
          <a>
            <FiArrowLeft size="14" style={{ paddingLeft: '-2px', marginRight: '2px' }} />
            Return to site
          </a>
        </Link>
      </div>

      <iframe
        title="game"
        src={demoUrl}
        tabIndex={0}
        allowFullScreen
        ref={iframeEl}
        scrolling="no"
        onMouseEnter={() => {
          iframeEl.current?.focus()
        }}
        className={Styles.embeddedIframe}
      />
    </div>
  )
}

export default DemoPage
