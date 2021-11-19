import { CreatePagesArgs } from 'gatsby';
import { EmbeddedAppContext } from '../src/components/embedded-app/embedded-app';
import { embeddedDemos } from '../src/demos';

export async function createDemoPages({
  actions,
}: CreatePagesArgs): Promise<void> {
  const { createPage } = actions;
  const embeddedAppTemplate = require.resolve(
    `../src/components/embedded-app/embedded-app.tsx`
  );

  embeddedDemos.forEach(({ urlName, demoUrl, repoUrl }) => {
    const context: EmbeddedAppContext = {
      demoUrl,
      repoUrl,
    };

    createPage({
      path: `demos/${urlName}`,
      component: embeddedAppTemplate,
      context,
    });
  });
}
