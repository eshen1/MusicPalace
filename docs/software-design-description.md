## 6.1      Introduction

This Software Design Description (SDD) presents the architecture and detailed design for the software for MusicPalace. MusicPalace is a personal online database and music player that allows users to store, sort, and listen to their favorite songs. A MusicPalace user will be able to upload songs and store them in their playlists. MusicPalace will have a sleek format and allow users to easily access and listen to their songs. Making a playlist will allow a user to enter in as many songs as they would life. MusicPalace will also allow for sharing music playlists with other users. The MusicPalace system architecture is comprised of a CSS/JS/HTML graphical user interface, a Node server, and a Neo4j database.

## 6.1.1     System Objectives

The system objective of MusicPalace is to serve as a online database for music that allows user to access and listen to their music as well as keep it in orderly fashion. Our project will allow for users to easily add their songs to their playlists. MusicPalace should allow for a enjoyable user experience that is easy to use.

## 6.1.2     Hardware, Software, and Human Interfaces

| Interface Type | Interface Description |
|---|---|
| Human Interface | keyboard and mouse |
| Human Interface | monitor |
| Software | Google Chrome |
| Hardware | Computer |

## 6.2       Architectural Design

## 6.2.1     Major Software Components

- Login Page
  - A login page will be displayed to the user.
- Home Page
  - The Frontend shall provide a brand new user with a homepage that will be customizable.
- Sign Up button
  - A sign up button that the user can click to sign up.
- Search Song
  - This component will allow the user to search for music to add to their playlists
- List Module
  - This list module will display a list of the users playlists
- New playlist button
  - This button will allow the user to create a new bank
- Music player
  - A music player at the bottom of the screen to allow a user to play the song

## 6.2.2     Major Software Interactions

- Login Page
  - A login page will be displayed to the user. The login page will have entry fields for the user to enter login information. The login page will also have a Sign Up button for the user to create an account.
- Home Page
  - A user will have a home page displayed and on the left side will be the users playlists in which they can click on and a search bar to search up songs
- Sign Up button
  - A sign up button will take the user to the sign up page and then have text fields to allow the user to register
- Search Song
  - After the user has searched the song the user can click the add button to add it to their playlist
- List Module
  - Clicking on a playlist in the users list module will change the playlists
- New playlist button
  - Clicking the new playlist button will allow the user to input a name for the playlist and then be displayed on the list module list
- Music player
  - A music player at the bottom of the screen that can be clicked to play, pause, go back, or forward from the current song

## 6.2.3     Architectural Design Diagrams
## 6.3.      CSC and CSU Descriptions
## 6.3.1     Class Descriptions
- Front Page
  - Login Class -- This class has the GUI for MusicPalace's login page as well as sending the data to our database for authentication when logging in
  - Join Class -- This class has the GUI for MusicPalace's sign up page and also sends and saves the data to our database to register this user
- Home Page
  - Home Page -- This class is the GUI for each persons playlist and songs and contains a recommendation for the user
    - Search bar Class -- Has the GUI for the search bar
    - List Class -- Has the GUI for the list class
- Account Class -- Talks to our account Database the fetch user info and deals with stuff such as authentication, changing profile name and pictures, deleting an account, and playlists.
- Playlists Class -- Deals with the storage of songs and managing playlists

## 6.3.1.1   Detailed Class Description 1
                  .
                  .
                  .
## 6.3.1.n   Detailed Class Description n
## 6.3.2     Detailed Interface Descriptions
## 6.3.3     Detailed Data Structure Descriptions
## 6.3.4     Detailed Design Diagrams
## 6.4       Database Design and Description
## 6.4.1     Database Design ER Diagram
## 6.4.2     Database Access
## 6.4.3     Database Security
