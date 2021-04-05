import { PageProps } from 'gatsby';
import React from 'react';
import ReadingListData from '../data/readinglist.json';
import Layout from '../layout/layout';
import SharedStyles from '../shared-styles.module.scss';
import ReadingListComponent from '../components/reading-list-page/reading-list/reading-list';

const data = ReadingListData.map(d => ({
  date: new Date(d.date),
  url: d.url,
}));

const ReadingList: React.FC<PageProps> = (props) => {
  return (
    <Layout pathName={props.location.pathname}>
      <ReadingListComponent entries={data}/>
    </Layout>
  );
};

export default ReadingList;

