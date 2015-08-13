This repo includes a GUI/frontend-project allowing participants and teams to make entries for a student-athlete event by means of an input-form, passing data back and forth to a API, documented at http://docs.thea.apiary.io/#reference.

<ul>
  <li><em><a href="#getting-started">Getting Started</a></em></li>
  <li><em><a href="#project-structure">Project Structure</a></em></li>
  <li><em><a href="#frameworks-and-libraries">Frameworks and Libraries</a></em></li>
  <li><em><a href="#team-members">Team Members</a></em></li>
</ul>

<h4 name="getting-started">Getting Started</h4>
The frontend-project can be run by downloading the project folder, entry_frontend, and then run the index.php on a local server with help from <a href="http://www.wampserver.com/en/">wamp</a> or <a href="http://www.easyphp.org/easyphp-devserver.php">easyphp</a>.

<h4 name="project-structure">Project Structure</h4>


<pre>
<code>
.
├── css                       	  # Styling folder
	+ semantic.min            # Styling file for Semantic UI
	+ style.css            	  # Custom styling file
├── js                  	  # JavaScript folder
	+ api_handler.js          # Handles communication with the API
	+ main.js            	  # Main functions used by the entry-GUI. Calls api_handler and updates the GUI.
	+ semantic.min.js         # JavaScript file for Semantic UI
	+ validation.js           # Validation-rules for the entry-form
├── view_components           	  # GUI components to be included in several files
	+ head.php 		  # The head-component
	+ personal_info.php       # Personal info-GUI of the form
	+ portrait_additions.php  # Portrait and additions-GUI of the form
+ entry_participant.php 	  # GUI-scheme for making a participant entry
+ entry_team.php 		  # GUI-scheme for making a team entry
+ index.php                   	  # The starting point for the entry_frontend application
+ README.md                   	  # Readme-file

</code>
</pre>



<h4 name="frameworks-and-libraries">Frameworks and Libraries</h4>
The purpose of this frontend-project is to be a starting point for an entry-GUI used for student-athlete events. Hence, it is meant to be simple to understand, and includes a minimum of frameworks and libraries.

<strong>jQuery</strong>
jQuery is a lightweight JavaScript library, making it much easier to use JavaScript on a website by wrapping comming tasks in JavaScript into methods that you can call with a single line of code.

<strong>Semantic UI</strong>
Semantic UI is a modern front-end development framework, powered by LESS and jQuery. It provides a set of pre-defined GUI-components, and helps make the application responsive.

<h4 name="team-members">Team members</h4>
<strong>Thor Håkon Bredesen</strong>, thor.hakon.bredesen@gmail.com <br>
<strong>Øystein Molnes</strong>, molnes.oystein@gmail.com <br>
<strong>Erik Frøseth</strong>, sinuserik@gmail.com <br>
