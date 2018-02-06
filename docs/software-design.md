# 5.0	Requirements Specification


## 5.1	Introduction
  This Software Requirements Specification (SRS) documents explains the requirements for the MusicPalace web application. MusicPalace is a personal online database for one to store and listen to their music. MusicPalace's primary function is to find and store ones music. Through its web application, MusicPalace will provide users with a simple and clean user interface to find and listen to music. Functionality will include features such as searching for songs and making playlists. The MusicPalace system architecture is comprised of a javascript/HTML/CSS graphical user interface, a node server, and a Neo4j database.

## 5.2	Functional Requirements

### 5.2.1	Frontend
  - 5.2.1.1 The Frontend shall display a login page for the user
  - 5.2.1.2 The Frontend shall provide text entry fields into which the user may type their login information.
  - 5.2.1.3 The Frontend shall provide error checking on text entered in fields upon clicking the login button.
  - 5.2.1.4 The Frontend shall display a register button.
  - 5.2.1.5 The Frontend shall provide another text entry field for confirming password of new user.
  - 5.2.1.6 The Frontend shall have the user's homepage set up
  - 5.2.1.7 The Frontend shall provide the user with a Search bar to search for songs
  - 5.2.1.8 The Frontend shall let the user see their currently made playlists
  - 5.2.1.9 The Frontend shall let the user see their music in their playlists
  - 5.2.2.0 The Frontend shall display a login button
  - 5.2.2.1 The Frontend shall display a settings button that drops down a menu.

### 5.2.2	Backend
  - 5.2.2.1 The Backend shall make a network connection with the database.
  - 5.2.2.2 The Backend shall send all Frontend based queries into their respective databases
  - 5.2.2.3 The Backend shall send all results of database queries to the Frontend.
  - 5.2.2.4 The Backend shall authenticate users.
  - 5.2.2.5 The Backend shall perform data validation before sending queries to the database.
  - 5.2.2.6 The Backend shall throw a 404 error code when a page is not found.
  - 5.2.2.7 The Backend shall throw a 500 error code when there is an unknown issue with the server.
  - 5.2.2.8 The Backend shall throw a 503 error code if the overloaded or server is under maintenance

### 5.3.3	Database
  - 5.2.3.1 The database will have a table containing data about each playlist
  - 5.2.3.2 The database will contain data about the owner of each account
  - 5.2.3.3 The database will contain data about the songs in each playlist
  - 5.2.3.4 The database will have a table containing info about each user

## 5.3	Performance Requirements
  - 5.3.1 User registration should be less than 3 minutes. Once the user registers
  the web page should almost instantaneously take the user to their home page.
  - 5.3.2 User login verification should take 1 second or less. Once the user enters
  their login credentials the web page should almost instantaneously take the user to their
  home page.
  - 5.3.3 User logout should take less than 0.5 seconds. Once the user logs out, the web
    directs the user to the login page.
  - 5.3.4 User searching up song should take less than 1 second.
  - 5.3.5 User making a new playlist should take less than .5 seconds

## 5.4	Project Environment Requirements

### 5.4.1	Development Environment Requirements
Hardware Requirements

| Category | Requirement |
|---|---|
| 2 x 1,6 GHz CPU |
| Graphics Card | Intel(R) HD Graphics 4600 |
| Ram | 8 GB |

Software Requirements

| Category | Requirement |
|---|---|
| Front End | HTML/CSS/Javascript |
| Server | Node |
| Database | Neo4j |


### 5.4.2	Execution Environment Requirements

| Category | Requirement |
|---|---|
| Operating System | Windows 10 / Mac OSX |
