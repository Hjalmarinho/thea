This repo includes the frontend for the admin application.

<ul>
  <li><em><a href="#getting-started">Getting Started</a></em></li>
  <li><em><a href="#project-structure">Project Structure</a></em></li>
  <li><em><a href="#frameworks-and-libraries">Frameworks and Libraries</a></em></li>
  <li><em><a href="#team-members">Team Members</a></em></li>
</ul>



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

In order to get this site working, you need one file named "site_info.php". This file is added to .gitignore, so it wont be included in the repository. The contents of the file should be:

<pre>
<code>
&lt;?php
define('ROOT_URL', 'http://127.0.0.1/thea2/thea_app');
</code>
</pre>

The URL should of course point to the correct URL in your development environment. On the production server for instance, the value is set to 'https://thea.theachnology.com'. The trailing slash must NOT be included.

<h4 name="project-structure">Project Structure</h4>

<pre>
<code>
.
├── css                       # 
  + semantic.min              # 
  + style.css                 # 
├── js                        # 
  + api_handler.js            # 
  + main.js                   # 
  + semantic.min.js           # 
  + validation.js             # 
+ index.php                   # 
+ README.md                   # Readme-file
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

<h4 name="team-members">Team members</h4>


