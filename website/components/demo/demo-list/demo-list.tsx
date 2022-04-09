import React from 'react'
import DemoListing, { DemoListingProps } from '../demo-listing/demo-listing'
import Styles from './demo-list.module.scss'

export type DemoListProps = {
  demoInfo: DemoListingProps[]
}

const DemoList: React.FunctionComponent<DemoListProps> = ({ demoInfo }) => (
  <div className={Styles.gridContainer}>{demoInfo.map((d) => DemoListing(d))}</div>
)

export default DemoList
