import { PageProps } from 'gatsby';
import React from 'react';
import Layout from '../../layout/layout';
import { ReadingListEntry } from './reading-list-entry';
import ReadingListComponent from './reading-list/reading-list';

export interface ReadingListPageContext {
  entries: ReadingListEntry[];
}

const ReadingListPage: React.FC<PageProps<
  unknown,
  ReadingListPageContext
>> = props => {
  console.log('props.pageContext.entries', props.pageContext.entries);
  return (
    <Layout pathName={props.location.pathname}>
      <ReadingListComponent entries={props.pageContext.entries} />
    </Layout>
  );
};

export default ReadingListPage;
