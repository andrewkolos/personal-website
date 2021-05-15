import { objectPromiseAll } from '@akolos/object-promise-all';
import { CreatePagesArgs } from 'gatsby';
import { getLinkPreview } from 'link-preview-js';
import { ReadingListEntry } from '../src/components/reading-list-page/reading-list-entry';
import { ReadingListPageContext } from '../src/components/reading-list-page/reading-list-page';
import rawReadingListData from '../src/data/readinglist.json';

type UnionToIntersection<T> =
  (T extends any ? (x: T) => any : never) extends
  (x: infer R) => any ? R : never;

export async function createReadingListPage({ actions }: CreatePagesArgs): Promise<void> {
  const readingList = require.resolve('../src/components/reading-list-page/reading-list-page.tsx');

  const readingListDataWithLinkPreviewInfo = await objectPromiseAll(rawReadingListData.map(d => ({
    linkPreviewInfo: getLinkPreview(d.url),
    date: new Date(d.date).toString(),
  })));

  const entries: ReadingListEntry[] = readingListDataWithLinkPreviewInfo.map(d => {
    const pd = d.linkPreviewInfo as UnionToIntersection<typeof d.linkPreviewInfo>; // Need this assertion because the library has ackward non-discriminated union typings.
    return {
      title: pd.title,
      date: d.date,
      description: pd.description,
      url: pd.url,
      imgUrl: pd.images[0] ? pd.images[0] : undefined,
    };
  });

  const context: ReadingListPageContext = {
    entries,
  }

  actions.createPage({
    path: '/reading-list',
    component: readingList,
    context,
  });
}
