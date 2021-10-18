# Temple Cats
Team:
Karl Schaller, Rebecca Robb, Jordan Billie, Christine Gregotski, Christian Davis

## Project Overview
The Temple Cats mobile app is for people in the Temple University area who want to help local stray cats. The Temple Cats organization tracks its own feral cat colony, but the Temple University area also has an extremely high population of stray cats who were abandoned by their owners and are in need of care or a home. The mobile app aims mainly to address this problem by providing a lost & found service for reporting cats, as well as by connecting users with extensive resources and information specific to the Temple University area for all different types of cat related situations users might encounter.

## Release Notes
### V1.0
* General layout
* Facebook authentication
* Home/Map screen
* Displaying on the map of pins found in database (there are mock pins around Temple campus)
* Cat form (submitted cats should appear on map)

## Installation instructions

### As of milestone demo 1 only test on iPhone. Android functionality is a work in progress. 

Currently, the alpha version of the application is being hosted on an Expo server. In order to install Temple Cats:

On iOS: Scan the following QR code with your camera.

On Android: Install the Expo Go app on Google Play and scan the following QR code within the app.

![Expo Go QR Code](/QRcode.png)

## Testing Instructions

### As of milestone demo 1 only test on iPhone. Android functionality is a work in progress. 

For testing the latest version of our app, follow these testing procedures:

Depending on iOS and Andriod some of the pop-ups may appear in a different order. In any case please click allow on all permission pop-ups.

* Open the app by following installation instructions.
* Click log in button.
* (iphone only) A pop-up will appear saying '"Expo" Wants to Use "expo.io" to Sign In'. Click continute button.
* A pop-up will appear saying 'The app ... is asking you to sign into another service. Is this OK?'. Click Yes.
* Authenticate with Facebook and allow. (FB will promp you ro enter user name and password then click submit. After this FB will say "Temple Cats is requesting access to: Your name and profile picture" Click contine as *your name here* 
* (on android) A pop-up will appear asking to use your location. 
* Click top left "+" button to enter a cat.
* (on iphone) A pop-up will appear saying 1 of 2 things, "Allow to use location" or "Experience needs permissions" click allow.
* Enter all or some information on the form besides the media!
* Scroll down, you must scroll down using the bottom half of your form screen.
* Click add location.
* When map is displayed click on a point on the map to create a pin. A red pin should appear. Ensure there is a red pin.
* Then click submit. 
* Click submit button on form. 
* Errors will appear click dismiss until they are gone.
* A pop-up will appear saying 'Alert cat submitted reload app'. Click OK.
* Close the expo app.
* Open the expo app.
* Click "Temple Cats" recently opened.
* Your created pin will appear on map.
* Zoom in to it.
* Click red pin, this will display information about the pin for now. 
* Click resources button on navigation bar the screen with the word "resources" will appear. 
* Click leaderboard button on navigation bar the screen with the word "leaderboard" will appear with a button. 
* Click account button on navigation bar the screen with the word "account" will appear with a button. 
* On account screen click sign out. 

* NOTE: Do not click the "i" button on top right of the home screen. You will have to close app and reopen app.

## Source Code
* [V1.0](https://github.com/Capstone-Projects-2021-Fall/project-teams-temple-cats/releases/tag/v1.0.0)
