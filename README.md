# client

Typescript NuxtJs GraphQl SSR Docker Cloudrun, firebase hosting

gcr.io/nuxt-server-239020

gcloud auth configure-docker

sudo docker build -t gcr.io/nuxt-server-239020/custom-name:tag1 .
sudo docker run -p 8080:8080 ID
sudo docker push gcr.io/nuxt-server-239020/custom-name:tag1

firebase init hosting
firebase deploy --only hosting

https://nuxt-server-239020.firebaseapp.com/

Application is packaged in a container image. Then, using Firebase Hosting, I can direct HTTPS requests to trigger the containerized app to run.

Cache dynamic content — You can configure caching of your dynamic content on a global CDN.
For example, if a function generates new content only periodically, you can speed up your app by caching the generated content for at least a short period of time. You can also potentially reduce execution costs because the content is served from the CDN rather than via a triggered function or containerized app.

Prerender your single-page apps — You can improve SEO and optimize sharing across various social networks by creating dynamic meta tags.

> Nuxt.js project

## Build Setup

```bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
test
