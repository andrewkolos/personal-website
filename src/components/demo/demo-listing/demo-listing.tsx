import { Link } from 'gatsby';
import { FixedObject } from 'gatsby-image';
import React from 'react';
import Styles from "./demo-listing.module.scss";
import Img from 'gatsby-image';
import { FiGithub } from 'react-icons/fi';

export interface DemoListingProps {
  name: string,
  description: string,
  thumbnail: FixedObject;
  demoUrl: string;
  repoUrl: string;
  urlName: string;
}

const DemoListing: React.FunctionComponent<DemoListingProps> = (props) => {

  return (
    <div className={Styles.container} key={props.name}>
      <Link to={props.urlName}>
        <Img fixed={props.thumbnail} alt={`${props.name} Demo`} className={Styles.demoThumbnail} />
      </Link>
      <div className={Styles.textContent}>
        <Link className={Styles.titleContainer} to={props.urlName}>
          <h2 className={Styles.title}>{props.name}</h2>
        </Link>
        <p className={Styles.excerpt}>
          {props.description}&nbsp;
          </p>
        <a href={props.repoUrl}><FiGithub className={Styles.gitHubIcon} size="14"/>GitHub</a>
      </div>
    </div>
  )
}

export default DemoListing;
