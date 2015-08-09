# thea


<ul>
  <li><em><a href="#what-is-this">What is this?</a></em></li>
  <li><em><a href="#getting-started">Getting Started</a></em></li>
  <li><em><a href="#project-structure">Project Structure</a></em></li>
  <li><em><a href="#frameworks-and-libraries">Frameworks and Libraries</a></em></li>
  <li><em><a href="#team-members">Team Members</a></em></li>
</ul>

<h4 name="what-is-this">What is this?</h4>
Repository for the development of Thea 2.0. This repo includes both front end and back end, in perfect harmony.


<h4 name="getting-started">Getting Started</h4>
Read this http://jmfurlott.com/tutorial-setting-up-a-simple-isomorphic-react-app/

<ol>
  <li>Install <a href="https://nodejs.org"> Node.js</a> </li>
  <li>Clone project</li>
  <li>Run: <code>npm install --save-dev babel babel-loader express jade react react-hot-loader react-router webpack webpack-dev-server nodemon</code></li>
  <li>Run <code>npm start</code></li>
  <li>Visit localhost:3000</li>
  <li>Have a great day!</li>
</ol>

<h4 name="project-structure">Project Structure</h4>
Folder-structure is inspired by <a href="https://www.youtube.com/watch?v=o5E894TmHJg">Flux Tutorial - Writing a Simple App in Flux and React</a>. For an introduction to the Flux-architecture, see <a href="www.vg.no">FLUX</a>.

<pre>
<code>
.
├── dist                        # Compiled distribution files 
├── node_modules                # Package-files installed by npm
├── src                         # 
│   ├── js                      # 
│   │   ├── actions             # 
|   │   │   ├── AppActions.js   # Contains all methods that will be executed based on actions from components
│   │   ├── components          # 
|   │   │   ├── app.js          # Defines components that can fire actions to AppAction.js
│   │   ├── constants           # 
|   │   │   ├── AppConstants.js # Defines constants in order to check which actionType is fired by components
│   │   ├── dispatcher          # 
|   │   │   ├── AppDispatcher.js# Event system that broadcasts events from actions to AppStore.js and registers callbacks
│   │   ├── stores              # 
|   │   │   ├── AppStore.js     # Responds to dispatched events. Holds models, and is the only thing in the app that knows how to update data
│   │   ├── main.js             # Grabs React and App
│   ├── index.html              # Application entry point
├── gulpfile.js                 # Runs tasks, and updates index.html in dist-folder on changes
├── package.json                # Lists all packages downloaded and installed by npm install
└── README.md                   # Readme-file
</code>
</pre>



<h4 name="frameworks-and-libraries">Frameworks and Libraries</h4>
  <code>React</code><br>
  React is a UI library developed at Facebook to facilitate the creation of interactive, stateful & reusable UI components.
  Reactify is a Browserify transform for JSX (a superset of JS used by React.js)<br><br>
  <code>Flux</code><br>
  An application architecture for React utilizing a unidirectional data flow.<br><br>
  <code>Semantic UI</code><br>
  Semantic is a UI framework designed for theming.<br><br>
  <code>Gulp</code><br>
  Gulp is a task runner which uses Node.js. Gulp-browserify enables the app to be run in the browser. Gulp-concat concatinates all js-files into a main.js. <br><br>
  <code>es6-promise</code><br>
  A lightweight library that provides tools for organizing asynchronous code.<br><br>
  <code>object-assign</code><br>
  This is...<br><br>

<h4 name="team-members">Team members</h4>


