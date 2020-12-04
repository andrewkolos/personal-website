import { GatsbyNode } from 'gatsby';
import { createBlogPages } from './create-blog-pages';
import { createProjectsPage } from './create-projects-page';

export const createPages: GatsbyNode['createPages'] = async (params) => {
  await Promise.all([createBlogPages(params), createProjectsPage(params)]);
};


