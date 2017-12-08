# Static-Pack
Production ready, SEO friendly, static website generator boilerplate that follows best pratices from the excellent [Front-End Checklist](https://frontendchecklist.io/)

<img src="https://assets-cdn.github.com/images/icons/emoji/unicode/2757.png" width=24 height=24> Currently supported for Jekyll but plans for other generators coming soon!

* CI/CD ready (tested on Netlify & GitLab)
* Static CMS ready [(Netlify-CMS)](https://www.netlifycms.org/)
* Optimized asset delivery
  * JS/CSS/HTML minification and tree shaking (dead code removal)
  * Image compression
  * 'Critical' CSS inlining
  * Non-blocking rendering ready (async)
    * Non-JS fallbacks
  * Favicon generation
  * Automatic Google PageSpeed testing (WIP)
* SEO friendly
  * JSON-LD structured data templates
  * Sitemap & RSS feed generation
* Modern dev environment
  * Live dev environment (BrowserSync)
    * Automatic site generation
    * JS/CSS hot-reloading
  * ES6+ & CSS3+ transpiling
  * JS/CSS linting




## Getting Started
Make sure you have Jekyll, NodeJS and your favorite Node package manager installed before starting

```javascript
npm install
```

### Starting the live dev environment
```javascript
npm start
````
Point your browser to localhost:3000

### Creating a dist(ribution) release
```javascript
npm run dist
```
Production ready site is now available in the `dist` folder