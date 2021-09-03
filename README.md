## Project Abstract
The Temple Cats mobile app is for people in the Temple University area who want to help local stray cats. The Temple Cats organization tracks its own feral cat colony, but the Temple University area also has an extremely high population of stray cats who were abandoned by their owners and are in need of care or a home. The mobile app aims mainly to address this problem by providing a lost & found type of service for reporting cats, as well as by connecting users with extensive resources and information specific to the Temple University area for all different types of cat related situations users might encounter.

## High Level Requirement
Users will be able to report cats that they have seen outside so that they appear to other users on a map. Additional information will be collected about the cats appearance, estimated age, behavior, etc. The app aims to be integrated with Facebook to allow users to contact each other and connect with the Temple Cats organization's official Facebook page. Temple Cats also aims to provide resources and information in the event that a stray cat is found that needs help, including nearby shelters, spay/neuter programs, vets who can scan for microchips, etc.

## Conceptual Design
The app should be available for both Android and iOS. Most development will probably be completed with something like React Native, and we will be using APIs like Facebook and a map API. For storing data of reported cats, database hosting may be necessary as well (SQL).

## Background
Most popular existing lost & found services are websites like [petfinder.com](https://www.petfinder.com/cats/lost-and-found-cats/), [pawboost.com](https://www.pawboost.com/lost-found-pets/), and [lostmykitty.com](https://www.lostmykitty.com/). Unlike these services, the Temple Cats app strives to have an extremely intuitive and convenient user interface by showing cats on an interactive map, while being easier to use on-the-go since users will come across stray cats suddenly and unexpectedly outside, where they can then quickly capture and upload an image. The app also will provide much more extensive resources and information to help users through cat related situations.

## Required Resources
#### Background Info: Cat Resources & Info (some stuff that will be figured out in detail during development)
* where to look for assistance for pet cat care, what to do when taking-in friendly stray cats (flea prevention, "low cost" or "free" vaccinations & spay/neuter surgeries, etc.)
* what to do when feeding stray cats outside (flea prevention, available assistance for free vaccinations & spay/neuter surgeries, providing winter shelter boxes, etc.)
* what to do when encountering a "lost or found" cat or an injured cat (how to report, what public shelter to bring the animal to, emergency medical care, etc.)
* where to look for volunteer or internship opportunities working with cats (local organizations, shelters, agencies, etc)
* what the "commitment" of adopting a pet is (graduating/relocating a pet, re-homing a pet, etc.)
#### Software
* Firebase
* React Native
* Facebook API
* Some Map API
* Firebase Realtime Database
#### Hardware
* Possible an Android phone or IPhone for testing (can really just use an emulator instead)
