Darryl Cohen
============

### **Welcome to _DOTs and Boxes_**

<img src=https://ibin.co/3aBm7hSOEYKh.jpg width="300">

## The Requirements

Project 1 in the General Asssembly Web Development immersive course was to develop a game that can be played by 2 or more players alternating turns. The game should indicate which player must go and keep track of score. I chose the game of Dots and Boxes.

The game can be played by multiple players on any sized grid. The aim is to create a box around the dots. The strategy is to trap your opponent so that you can make the last move to capture the box. The person with the most captured boxes wins the game.

## My Solution

### Game Logic
  * Draw the grid and set up players according to the parameters
  * Check to see if a dot is surrounded to make a box
  * Person who completes a box gets 1 point
  * Once all boxes complete person who has the highest score wins

### Game Design
I separated the functionality into different objects. Interaction with the user, the controller of the game, the players and the grid

### Issues
The idea of the design was to have loose coupling between objects. IE only the controller knows about all the objects. This presented a problem in the object that deals with user interaction had to hold onto a reference to the controller so that events could be past on. This created a tight coupling between the Controller and the Viewer.

A better solution, and most probably not the right way but still better is to have an Event Listener object that only listens to events and passes that information back to the controller.

### TO DO

Add instructions to the Game

[Click here to see my design ](https://github.com/darrylcohen/dot_to_dot/blob/master/design.pdf)

### Play the Game
[Click here to play the Game](https://darrylcohen.github.io/dots_and_boxes/)


## My Web Site

[Please visit my web site](https://www.darrylcohen.com.au)

<a href="https://www.darrylcohen.com.au"> <img src=https://i.imgur.com/kbAnu4b.jpg width="300"></a>
