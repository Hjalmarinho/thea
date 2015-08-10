# thea backend
This folder contains the rock solid foundation of thea; the backend.


<ul>
  <li><em><a href="#development-setup">Development setup</a></em></li>
  <li><em><a href="#depolyment">Deploying thea backend</a></em></li>
  <li><em><a href="#testserver">Connecting to thea testserver</a></em></li>
</ul>

<h4 name="development-setup">Development setup</h4>
thea backend is a Java applet. Below is a guide to set up your development environment (targeted for Windows...).

IMPORTANT: If you have Java 32-bit installed on your machine, all of the following downloads must also be 32-bit.
<ol>
  <li>Ensure that you have Java JDK 8 installed</li>
  <li>Download and install Eclipse IDE for Java EE Developers: https://www.eclipse.org/downloads/</li>
  <li>Download and extract Apache Tomcat 8.0 (binary distribution, core). : http://tomcat.apache.org/download-80.cgi</li>
  <li>Open Eclipse and create a new "Dynamic Web Project". Your workspace can be anywhere on your computer.</li>
  <ol>
    <li>Write "thea-backend" as the Project Name.</li>
    <li>Click "New Runtime", choose "Apache Tomcat v8.0", and enter the path where you extracted tomcat in under "Tomcat installation directory".</li>
    <li>Click "Next", and remove "src" from "Source folders on build path".</li>
    <li>Click "Finish".</li>
  </ol>
  <li>Right click on your project, and select "Configure" -> "Convert to Maven Project".</li>
  <li>Delete the newly created file "pom.xml".</li>
  <li>Delete the file "WebContent/WEB-INF/web.xml".</li>
  <li>Right click on your project, and select "New" -> "Folder".</li>
  <ol>
    <li>Click on "Advanced", and select "Link to alternate location".</li>
    <li>Browse to the repository folder "/thea_backend/src/".</li>
  </ol>
  <li>Right click on the folder "WebContent/WEB-INF/web.xml", and select "New" -> "File".</li>
  <ol>
    <li>Click on "Advanced", and select "Link to file in the file system".</li>
    <li>Browse to the repository file "/thea_backend/configuration/web.xml".</li>
  </ol>
  <li>Right click on your project, and select "New" -> "File".</li>
  <ol>
    <li>Click on "Advanced", and select "Link to file in the file system".</li>
    <li>Browse to the repository file "/thea_backend/configuration/pom.xml".</li>
  </ol>
  <li>Finally, right click on your project and select "Build Project" to ensure that everything works!</li>
  <li>You should now be ready to develop the marvelous thea backend.</li>
</ol>

<h4 name="depolyment">Deploying thea backend</h4>
<i>To be continued...</i>

<h4 name="testserver">Connecting to thea testserver</h4>
<h5>MySQL database</h5>
<b>Hostname:</b> 92.62.34.78 <br>
<b>Username:</b> thea-remote <br>
<b>Password:</b> HUmMxGs8NdrQ <br>
<b>Database:</b> thea-test <br>
