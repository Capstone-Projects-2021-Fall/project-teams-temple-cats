# Temple Cats
Team:
Karl Schaller, Rebecca Robb, Jordan Billie, Christine Gregotski, Christian Davis

## Project Overview
The Temple Cats mobile app is for people in the Temple University area who want to help local stray cats. The Temple Cats organization tracks its own feral cat colony, but the Temple University area also has an extremely high population of stray cats who were abandoned by their owners and are in need of care or a home. The mobile app aims mainly to address this problem by providing a lost & found service for reporting cats, as well as by connecting users with extensive resources and information specific to the Temple University area for all different types of cat related situations users might encounter.

## Release Notes
### v3.0
* User Features Added
  * Query Feature
    * Search name on home screen and map directs to you the searched cats location
  * Report Inappropriate Cat Functionaily 
    *Added button to report cats and give reason why 
  * Feeding Stations 
    * Added various feeding stations with modal pop up
  * Pin Tap View
    * Cats and feeding stations have pop-up views on pin press
  * Commenting
    * Commenting functionality on cat pop-up view
* Moderator Features Added
  * Account Screen Buttons
    * Moderators see “Reported Posts” button
    * Moderators see “Downvoted Posts” button
  * Delete Cat Functionality (ADDED)
    * On cat view of pin, moderators see a “Delete Cat Button” which deletes the cat’s information and photo in the database in real time. 


### v2.0
* Login Page (UPDATED)
  * Layout and styling updates
* Map (UPDATED)
  * Pins Display as Cat Pictures
  * Button to redirect to Temple
  * Button to redirect to current location
  * Border around Temple campus scoring boundary
  * Layout and styling updates
* Cat Form (UPDATED)
  * Camera and Camera Roll functionality
  * Layout and styling updates
* Resources (UPDATED)
  * Added resources for PAWS and Forgotten Cats
* Leaderboard (UPDATED)
  * Mock points data will appear
  * Weekly and All Time layout
* Facebook (ADDED)
  * Added tab for Web view of Temple Cats Facebook page
* Rewards Page (ADDED)
  * Can be accessed in Account  →  Prize Symbol
* Issue collector (ADDED)
  * Can be accessed in Account → Settings

### v1.0
* General layout
* Facebook authentication
* Home/Map screen
* Displaying on the map of pins found in database (there are mock pins around Temple campus)
* Cat form (submitted cats should appear on map)

## Installation instructions
Currently, v2.0 of the application is being hosted on an Expo server. In order to install Temple Cats:
* On either iOS or Android please install the Expo Go app (App Store, Google Play) before scanning the QR code.
* On iOS: Scan the QR code via the Camera app
* On Android: Scan the QR via the Expo Go app

![Expo Go QR Code](/QRcode.png)

## Testing Instructions

Depending on iOS and Andriod some of the pop-ups may appear in a different order. In any case please click allow on all permission pop-ups.

For testing the latest version of our app, follow these testing procedures:

### Login
* Open the app after following the installation instructions.
* Click the login button.
* (iPhone only) A pop-up will appear saying '"Expo" Wants to Use "expo.io" to Sign In'. Click the continue button.
* A pop-up will appear saying 'The app ... is asking you to sign into another service. Is this OK?'. Click Yes.
* Authenticate with Facebook and allow. (FB will prompt you to enter username and password then click submit. After this FB will say "Temple Cats is requesting access to: Your name and profile picture" Click continue as your name here
* (on Android) A pop-up will appear asking to use your location.
* You should be redirected to the home screen.

### Cat Form Submission
* From the home screen, click the top left "+" button to open the cat form screen.
* (on iPhone) A pop-up will appear saying 1 of 2 things, "Allow to use location" or "Experience needs permissions" click allow.
* Click Submit Cat
  * An alert should say an image is required
* Click upload image and choose either from camera or from camera roll. 
  * If you pick from the camera, test out the flash and selfie modes.
    * The door icon will allow you to go back to the cat form.
  * If you pick from a camera roll, you’ll then be prompted to crop the image you select.
  * The image you select should appear on the cat form as a square.
* Click Submit Cat
  * An alert should say a location is required
* Click add location.
  * When the map is displayed click a point on the map to create a pin. A red pin should appear.
  * Then click submit.
  * The selected location should appear in the text box.
* Click Submit Cat
  * An alert should say date is required
* Click Set Date and choose a date.
  * The date should appear on the form.
* Click on the time and choose a time.
  * The time should appear on the form.
* Click Submit Cat
  * An alert should appear telling you that the cat was submitted
* Reload the app in order to update the pins on the map.
* Your cat should appear at your selected location on the map.

### Resources Tab
* Click the resources button on the navigation bar.
* The resources screen should appear with information and images for PAWS and FORGOTTEN CATS
* Click on both the PAWS and FORGOTTEN CATS buttons.
* Both of these buttons should open their respective web pages in your browser.

### Facebook Tab
* Click the Facebook button on the navigation bar.
* An alert should appear asking if you want to open the Temple Cats Facebook page through the Facebook app installed on your device.
  * If you select “No”, a webview of the Facebook page should appear.
  * If you select “Yes” with the Facebook app installed, then it should redirect you to the Temple Cats Page on Facebook.
* In order to reset the alert to test the other option, reload the app.

### Leaderboard Tab
* Click the leaderboard button on the navigation bar.
* The leaderboard screen should display the name, ranking, and points of mock users.
* Click to switch to weekly board to view name, ranking, and points for top users of the week.

### Account Tab
* Click the account button on the navigation bar.
* The account screen with the word "Account" and a sign out button should appear.
* Click the rewards icon at the top right
  * The placeholder screen with the word Rewards should appear
* Swipe down to return to the Account screen
* Click the settings icon at the top right
  * A screen should appear with a provide feedback button at the top.
* Tap the provide feedback button.
  * If the button is too small, you should be able to pinch to zoom in.
  * A prompt to raise a bug should open.
* Close the prompt.
* Swipe down to return to the account screen click sign out.


## Source Code
* [v2.0](https://github.com/Capstone-Projects-2021-Fall/project-teams-temple-cats/releases/tag/v2.0.0)
* [v1.0](https://github.com/Capstone-Projects-2021-Fall/project-teams-temple-cats/releases/tag/v1.0.0)
