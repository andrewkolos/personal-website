import { GatsbyNode } from 'gatsby';
import { createBlogPages } from './create-blog-pages';
import { createDemoPages } from './create-demo-pages';
import { createProjectsPage } from './create-projects-page';
import { createReadingListPage } from './create-reading-list-page';

export const createPages: GatsbyNode['createPages'] = async (params) => {
  await Promise.all([createBlogPages(params), 
    createProjectsPage(params), 
    createDemoPages(params), 
    createReadingListPage(params)
  ]);
};


