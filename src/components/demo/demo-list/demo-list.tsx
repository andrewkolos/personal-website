import Styles from "./demo-list.module.scss";
import React from 'react';
import DemoListing, { DemoListingProps } from '../demo-listing/demo-listing';


export type DemoListProps = {
  demoInfo: DemoListingProps[];
}

const DemoList: React.FunctionComponent<DemoListProps> = (props) => {

  return (
      <div className={Styles.gridContainer}>
        {props.demoInfo.map(d => DemoListing(d))}
      </div>
  )
}

export default DemoList;