## aframe-livereload-image

[![Version](http://img.shields.io/npm/v/aframe-livereload-image.svg?style=flat-square)](https://npmjs.org/package/aframe-livereload-image)
[![License](http://img.shields.io/npm/l/aframe-livereload-image.svg?style=flat-square)](https://npmjs.org/package/aframe-livereload-image)

### Livereload for images used in A-Frame 

> It's a development/design tool

Performs live reloading of a `src` attribute on an entity (makes most sense to use with a-sky)

Optimized for image files. Works with `file://` protocol in FireFox and detects changes by comparing file sizes.

What? Why file size? and why just file size?

1. None of the http headers are available via `file://` protocol so not a lot of other options
1. Most reasonable format for large files is `jpg` anyway and it will change the file size on content changes
1. Working on a file:// protocol I noticed this component detects when the image manipulation program starts writing the file and sees it as growing from 0 bytes up.
1. Yes, I will add checking headers in case you're running on http soon.

Built for [A-Frame](https://aframe.io).

### API

```html
<a-sky livereload="src: image.jpg"></a-sky>
```

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
| src      | path to image to load and watch            |               |
| freq      | frequency of checking for the file, in miliseconds           |  500             |

### Installation

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.6.0/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-livereload-image/dist/aframe-livereload-image.min.js"></script>
</head>

<body>
  <a-scene>
    <a-sky livereload="src: skybackground.jpg"></a-entity>
  </a-scene>
</body>
```

#### npm

Install via npm:

```bash
npm install aframe-livereload-image
```

Then require and use.

```js
require('aframe');
require('aframe-livereload-image');
```
