# Andrew Kolos' personal website

[![Netlify Status](https://api.netlify.com/api/v1/badges/4378521a-a6da-4355-a3c7-b328194ac2c6/deploy-status)](https://app.netlify.com/sites/andrewkolos/deploys)

<https://andrewkolos.com>

## Building

You might need Visual Studio with the Desktop Development with C++ workload installed.

```bash
npm i
npm run dev # or "npm run build & npm run start"
```

## Deploying

The Netlify CLI can be useful. Install using:

```bash
npm install netlify-cli -g
netlify login
netlify link
```

Netlify is set up to deploy automatically from the master branch.
If using a different service, make sure the proper env variables are set up. See the .env file.

## git lfs

Some images (e.g. art) are tracked with Git LFS. The files are hosted on Netlify.
<https://docs.netlify.com/large-media/setup/>
