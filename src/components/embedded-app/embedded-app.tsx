import React, { useState, useRef, useEffect } from 'react';
import { Link, PageProps } from 'gatsby';
import Styles from './embedded-app.module.scss';
import { FiArrowLeft } from 'react-icons/fi';

export interface EmbeddedAppContext {
  demoUrl: string;
  repoUrl: string;
}

const EmbeddedApp: React.FC<PageProps<object, EmbeddedAppContext>> = props => {
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
    };
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
    };
  });

  return (
    <div className={Styles.container}>
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

      <div className={Styles.returnToSiteContainer}>
        <Link className={Styles.returnToSiteLink} to={'/demos'}>
          <FiArrowLeft
            size="14"
            style={{ paddingLeft: '-2px', marginRight: '2px' }}
          />
          Return to site
        </Link>
      </div>

      <iframe
        src={props.pageContext.demoUrl}
        tabIndex={0}
        allowFullScreen={true}
        ref={iframeEl}
        scrolling="no"
        onMouseEnter={() => {
          iframeEl.current?.focus();
        }}
        className={Styles.embeddedIframe}
      />
    </div>
  );
};

export default EmbeddedApp;
