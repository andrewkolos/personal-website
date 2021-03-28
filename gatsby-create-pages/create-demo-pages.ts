import { CreatePagesArgs } from 'gatsby';
import embedDescriptors from '../build/embeddedapps';
import { exec } from '../build/exec';
import { EmbeddedAppProps } from '../src/components/embedded-app/embedded-app';

export async function createDemoPages({ actions, graphql, reporter }: CreatePagesArgs): Promise<void> {
  const { createPage } = actions;
  const embeddedAppTemplate = require.resolve(`../src/components/embedded-app/embedded-app.tsx`);

  
  await Promise.all(embedDescriptors.map(async (ed) => {
    const name = ed.urlName;
    const dirname = getFilesystemFriendlyName(name);
    await (`mkdir -p ${dirname} && cd ${dirname}`)
    await ed.install();
    await exec(`cp ${ed.copyFrom} -r demos/${ed.urlName}`)
  }));

  embedDescriptors.forEach(ed => {
    const context: EmbeddedAppProps = {
      urlName: ed.urlName,
    };
    createPage({
      path: getSlug(ed.urlName),
      component: embeddedAppTemplate,
      context,
    });
  });
}

function getFilesystemFriendlyName(name: string) {
  return name.replace(/[/\\?%*:|"<>]/g, '-');
}

function getSlug(filename: string) {
  return `demos/${filename}`;
}