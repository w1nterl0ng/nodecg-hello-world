hello-world is a [NodeCG](http://github.com/nodecg/nodecg) bundle.
It works with NodeCG versions which satisfy this [semver](https://docs.npmjs.com/getting-started/semantic-versioning) range: `~0.8.0`
You will need to have an appropriate version of NodeCG installed to use it.

This is my attempt at a Hello World tutorial.

# Steps to make a module for NodeCG

## NodeCG Installation
Install [node.js (version 6 or greater) & npm (version 2 or greater)](http://nodejs.org/).  
Then, run the following commands from a terminal (command prompt):

Make sure we have Bower

```
npm install -g bower
```

Make sure we have Yeoman

```
npm install -g yo
```

Make sure we have nodecg-cli

```
npm install -g nodecg-cli
```

Let's create a base install of NodeCG

```
mkdir nodecg
cd nodecg
nodecg setup
```

Let's Start it for the first time and make sure it works.

```
nodecg start
```

Now load NodeCG in your browser [Dashboard](http://localhost:9090/dashboard).

You can kill the instance with `ctl+c`

## Create an empty bundle

Make sure we have generator-nodecg

```
npm install -g generator-nodecg
```

Run the generator to create a barebones bundle

```
cd bundles
mkdir hello-world
cd hello-world
yo nodecg
```

You will get hit with a bunch of prompts, you can for the most part use the defaults.

if the name already exists in npm, it is fine to say `no` since we will not be committing this anywhere and we will not be downloading hello-world npm.

Since our "Hello World" bundle does not have a configuration file, we do not need to "install" it to the base of nodecg.

Let's start NodeCG again and see what we have

```
cd ../../
nodecg start
```

Now load NodeCG in your browser [Dashboard](http://localhost:9090/dashboard).

We should see our new "Hello World" panel in the dashboard.  It will be empty, but we can work on that now.

## Files that we will be working with

Of the files that were generated, we are going focus on just a few to get our hello world up and running:

* dashboard/hello-world.html
* dashboard/hello-world.js
* graphics/index.html
* extension.js

The files in the dashboard folder are for the panel.  The file in the graphics folder is for the on screen display.  And the extension file is for server side JavaScript.

## Hello World

For our "hello world" demonstration we will create a text input and a button on the panel.  This will allow us to enter a text message, then click the button to have that message appear on the screen.

The main methods in NodeCG that we will focus on are:

* sendMessage
* listenFor
* Replicant
* readReplicant

For now, let us focus on `sendMessage` and `listenFor`.

Start with our panel code `dashboard/hello-world.html`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
</head>
<body>
  <input type="text" id="title" placeholder="type message here"/>
  <button type="button" name="button" id="show">Show</button>

  <script src="hello-world.js"></script>
</body>
</html>
```

And `dashboard/hello-world.js`

```javascript
(function () {
	'use strict';

	const title = document.getElementById('title');
	const show = document.getElementById('show');

	show.addEventListener('click', () => {
		nodecg.sendMessage('titleChange', title.value);
	});
})();
```

And `graphics/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
</head>
<body>
  <div id="title"></div>
  <script src="index.js"></script>
</body>
</html>
```

And `graphics/index.js`

```javascript
(function () {
  'use strict';

  const title = document.getElementById('title');

  nodecg.listenFor('titleChange', function(message){
    title.innerHTML = message;
  });
})();
```

Start up your nodecg and give ti a test.  You should see what you are looking for.

## Adding in Polymer and Paper

Now that we have a simple example, let's add some style.  Lange requests that when we work with NodeCG we use polymer-paper for the dashboard panels.  It keeps the look consistent and allows for people to reuse parts of your panel code when they create something new.

To start with, we need to crate a bower file in the root of our bundle.  Since we are only using Input and Button, we will limit to that right now.

`bower.json`

```javascript
{
  "name": "w1nterl0ng-hello-world",
  "dependencies": {
    "paper-input": "PolymerElements/paper-input#~1.1.5",
    "paper-button": "PolymerElements/paper-button#~1.0.11"
  }
}
```

Next we need to update the dashboard panel html

`dashboard/hello-world.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="import" href="components/paper-input/paper-input.html">
    <link rel="import" href="components/paper-button/paper-button.html">
</head>
<body>
	<paper-input id="title" label="TITLE"></paper-input>
	<paper-button raised id="show" class="nodecg-info">Show</paper-button>
  <script src="hello-world.js"></script>
</body>
</html>
```

What you see here, is that we added import links for paper-input, and paper-button.  Then we swapped out the plain html input and button for paper-input and paper-button.

Now, when we fire up the nodecg, we notice our panel looks like a normal paper panel.

That should do it for now.
