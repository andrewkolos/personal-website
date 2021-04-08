import { objectPromiseAll } from '@akolos/object-promise-all';
import { CreatePagesArgs } from 'gatsby';
import { getLinkPreview } from 'link-preview-js';
import { ReadingListEntry } from '../src/components/reading-list-page/reading-list-entry';
import { ReadingListPageContext } from '../src/components/reading-list-page/reading-list-page';
import ReadingListData from '../src/data/readinglist.json';

type UnionToIntersection<T> =
  (T extends any ? (x: T) => any : never) extends
  (x: infer R) => any ? R : never;

export async function createReadingListPage({ actions }: CreatePagesArgs): Promise<void> {
  const readingList = require.resolve('../src/components/reading-list-page/reading-list-page.tsx');

  const data: ReadingListEntry[] = (await objectPromiseAll(
    ReadingListData.map(d => ({
      date: new Date(d.date),
      url: d.url
    })).map(d => ({
      linkPreviewData: getLinkPreview(d.url),
      date: d.date.toString(),
    }))
  )).map(d => {
    const pd = d.linkPreviewData as UnionToIntersection<typeof d.linkPreviewData>; 
    return {
      title: pd.title,
      date: d.date,
      description: pd.description,
      url: pd.url,
      imgUrl: pd.images[0] ? pd.images[0] : undefined,
    };
  });

  const context: ReadingListPageContext = {
    entries: data,
  }

  actions.createPage({
    path: '/reading-list',
    component: readingList,
    context,
  });
}
