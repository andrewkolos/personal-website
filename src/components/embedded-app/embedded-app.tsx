import React, { useState, useRef, useEffect } from 'react'
import { PageProps } from 'gatsby';
import Styles from './embedded-app.module.scss';

export interface EmbeddedAppContext {
  demoUrl: string;
  repoUrl: string;
}

const EmbeddedApp: React.FC<PageProps<object, EmbeddedAppContext>> = (props) => {
  const [appLoaded, setAppLoaded] = useState(false);
  const loadingEl = useRef<HTMLDivElement>(null);
  const iframeEl = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Hides scrollbar.
    const html = document.documentElement;
    html.style.overflow = 'hidden';
    html.style.margin = '0';

    return function cleanup() {
      html.style.overflow = '';
      html.style.margin = '';
    }
  });

  useEffect(() => {
    const el = loadingEl.current;
    if (!el) return;
    if (appLoaded) el.classList.add(Styles.hide);
  });

  useEffect(() => {
    const el = iframeEl.current;
    if (!el) return;
    el.onload = () => {
      el.focus();
      setAppLoaded(true);
    }
  });

  return (

    <React.Fragment>
      <div ref={loadingEl} className={Styles.loadingContainer}>
        <div className={Styles.loading}>
          <div className={Styles.ldsEllipsisContainer}>
            <div className={Styles.ldsEllipsis}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          Hello! The server is being rehydrated.
          <br />
          This could take up to 15 seconds.
        </div>
      </div>

      <iframe src={props.pageContext.demoUrl}
        tabIndex={0}
        allowFullScreen={true}
        ref={iframeEl}
        scrolling='no'
        className={Styles.embeddedIframe} />
    </React.Fragment>
  )
}

export default EmbeddedApp;
