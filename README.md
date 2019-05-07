Minimal Viable Product</br>
Login page(signed-out)</br>
● When the user clicks the MemeMaster homepage button, the user is redirected to the same page.</br>
● When the user signs into their account, the user is directed to the Read page.</br>
Read page(signed-in, viewing saved memes)</br>
● When the user clicks the MemeMaster homepage button, the user is redirected to the same page.</br>
● When the user clicks the My Account button, the user is directed to the My Account page.</br>
● When the user clicks the Add Meme button, the user is directed to the Editor page.</br>
● When the user clicks the Log Out button, the user is no longer logged in and is directed to the Login page.</br>
● The user sees a list of Memes that they had uploaded or made in past.</br>
● For any saved meme, the date and the order of upload will show up.</br>
● For any saved meme, when the user clicks the Edit button, the user is directed to the Editor page.</br>
● For any saved meme, when the user clicks the Delete button, a confirmation message appears. If the user</br>
confirms the delete, then the appropriate changes are made in the database and on the page.</br>
● For any saved meme, when the user clicks the share button, a popup appears to share the meme on Slack.</br>
● For any saved meme, when the user clicks the download button, a popup appears to download the meme onto</br>
the user’s computer.</br>
My Account page(signed-in)</br>
● This page only appears when the user is signed in.</br>
● When the user clicks the MemeMaster homepage button, the user is redirected to the Read page.</br>
● When the user clicks the My Account button, the user is redirected to the same page.</br>
● The user’s username is displayed on the page.</br>
● In the My Account page, the user is able to change his/her password by typing in a new password and clicking</br>
the Change Password button.</br>
● When the user clicks the Log Out button, the user will no longer be logged in and the user is directed to the</br>
Login page.</br>
Editor page(signed-in, writing and editing memes)</br>
● When the user clicks the MemeMaster homepage button, the user is redirected to the Read page.</br>
● If the user is adding a new meme, the editor will be blank.</br>
● If the user is editing an existing meme, the editor will display the picture and text that were used to create the</br>
original meme.</br>
● When the user clicks on the Save button, a confirmation message appears. If the user confirms the edits, the</br>
appropriate changes are made in the database.</br>
● The user is able to import a picture from their computer or from a URL.</br>
● The user is able to add text at the top and the bottom of the meme.</br>
● When the user clicks the Log Out button, the user will no longer be logged in and the page will direct the user to</br>
the Login page.</br>
Error page(when user authentication fails)</br>
● When the user clicks the MemeMaster homepage button, the page redirects the user to the Read page.</br>
● The error page shows why the user authentication failed.</br>
● The user is able to attempt to log in again.</br>
The limitations the app may have</br>
● If we use an open source API to create a meme, we as the developer have to periodically check if there’s an</br>
update for the API.</br>
● The user will be required to only create an ID and password when signing up, but we may need more</br>
authentication such as email verification for security reasons.</br>
API we plan on using for user account management</br>
● Firebase API</br>
● We will use the Firebase functions to let the user create an account on our web app and use their account</br>
information to store their memes on the database</br>
APIs we plan on using for image management</br>
● Canvas API</br>
● Firebase API</br>
● When creating a new meme, a unique identification number will be saved with it’s height, text, source image url,</br>
etc. After that, firebase will store the object by JSON type in the server database.</br>
● We will use Javascript Canvas API to draw it on HTML.</br>
API we plan on using for distribution mechanism</br>
● Slack API</br>
● https://api.slack.com/incoming-webhooks</br>
● Incoming webhook generates a unique URL to which user sends a JSON payload with the text message and</br>
some option to post messages from apps into slack.</br>
Logistical thoughts</br>
● We will develop software by agile development process.</br>
● We will use version control (Github) for source code management. When using Github, we will make sure each</br>
individual does not work on the master branch directly.</br>
● We will implement a minimal viable product first, then try to implement more functions on application.</br>
● We will use a planning application such as trello for easier communication.</br>
● We will set up skeleton codes for front-end, and we will learn and implement firebase CRUD application as our</br>
application controller, then we will apply javascript on the app. We will make sure the website runs without error</br>
before applying javascript. After all back-end process, we will apply CSS for styles.</br>
