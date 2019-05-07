Minimal Viable Product
Login page(signed-out)
● When the user clicks the MemeMaster homepage button, the user is redirected to the same page.
● When the user signs into their account, the user is directed to the Read page.
Read page(signed-in, viewing saved memes)
● When the user clicks the MemeMaster homepage button, the user is redirected to the same page.
● When the user clicks the My Account button, the user is directed to the My Account page.
● When the user clicks the Add Meme button, the user is directed to the Editor page.
● When the user clicks the Log Out button, the user is no longer logged in and is directed to the Login page.
● The user sees a list of Memes that they had uploaded or made in past.
● For any saved meme, the date and the order of upload will show up.
● For any saved meme, when the user clicks the Edit button, the user is directed to the Editor page.
● For any saved meme, when the user clicks the Delete button, a confirmation message appears. If the user
confirms the delete, then the appropriate changes are made in the database and on the page.
● For any saved meme, when the user clicks the share button, a popup appears to share the meme on Slack.
● For any saved meme, when the user clicks the download button, a popup appears to download the meme onto
the user’s computer.
My Account page(signed-in)
● This page only appears when the user is signed in.
● When the user clicks the MemeMaster homepage button, the user is redirected to the Read page.
● When the user clicks the My Account button, the user is redirected to the same page.
● The user’s username is displayed on the page.
● In the My Account page, the user is able to change his/her password by typing in a new password and clicking
the Change Password button.
● When the user clicks the Log Out button, the user will no longer be logged in and the user is directed to the
Login page.
Editor page(signed-in, writing and editing memes)
● When the user clicks the MemeMaster homepage button, the user is redirected to the Read page.
● If the user is adding a new meme, the editor will be blank.
● If the user is editing an existing meme, the editor will display the picture and text that were used to create the
original meme.
● When the user clicks on the Save button, a confirmation message appears. If the user confirms the edits, the
appropriate changes are made in the database.
● The user is able to import a picture from their computer or from a URL.
● The user is able to add text at the top and the bottom of the meme.
● When the user clicks the Log Out button, the user will no longer be logged in and the page will direct the user to
the Login page.
Error page(when user authentication fails)
● When the user clicks the MemeMaster homepage button, the page redirects the user to the Read page.
● The error page shows why the user authentication failed.
● The user is able to attempt to log in again.
The limitations the app may have
● If we use an open source API to create a meme, we as the developer have to periodically check if there’s an
update for the API.
● The user will be required to only create an ID and password when signing up, but we may need more
authentication such as email verification for security reasons.
API we plan on using for user account management
● Firebase API
● We will use the Firebase functions to let the user create an account on our web app and use their account
information to store their memes on the database
APIs we plan on using for image management
● Canvas API
● Firebase API
● When creating a new meme, a unique identification number will be saved with it’s height, text, source image url,
etc. After that, firebase will store the object by JSON type in the server database.
● We will use Javascript Canvas API to draw it on HTML.
API we plan on using for distribution mechanism
● Slack API
● https://api.slack.com/incoming-webhooks
● Incoming webhook generates a unique URL to which user sends a JSON payload with the text message and
some option to post messages from apps into slack.
Logistical thoughts
● We will develop software by agile development process.
● We will use version control (Github) for source code management. When using Github, we will make sure each
individual does not work on the master branch directly.
● We will implement a minimal viable product first, then try to implement more functions on application.
● We will use a planning application such as trello for easier communication.
● We will set up skeleton codes for front-end, and we will learn and implement firebase CRUD application as our
application controller, then we will apply javascript on the app. We will make sure the website runs without error
before applying javascript. After all back-end process, we will apply CSS for styles.
