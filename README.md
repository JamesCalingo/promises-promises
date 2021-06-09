# promises-promises
Studying the inner workings of one of JavaScript's most important features - and maybe some 1980s one-hit wonders.

# Background
Promises are quite possibly one of JavaScript's most important features because they allow code to be run **asynchronously**.

What is the importance of asynchronous code?

Well, imagine you're trying to program something that requires data from an external source (aka an API). JavaScript, as a synchronous language, will run from top to bottom, with each line waiting for the previous line to execute before it can execute itself. In other words, the whole thing will be stopped at a point until it's clear to go (like a traffic light).

This can lead to some problems when dealing with APIs, especially in the Web Development realm. Having your entire app stop, wait for some data to come in, and then run is not great for users to deal with - they're likely to think that your app is just broken!

With asynchronous programming/promises, you can have your app perform other tasks while you wait for the data to arrive. This signals to the user that your app is working on getting the data it needs, making them (slightly) less frustrated when waiting as well as making your app more "useable".

What's more, this implementation is done with Test Driven Development (TDD). Automated software testing is probably one of, if not the single most overlooked things by bootcamps, and as a bootcamp grad myself, was something I was woefully unfamiliar with until I kept hearing senior engineers discuss the importance of software testing.

I've attempted to dabble in writing tests before, but going back to old projects and adding tests hasn't been the easiest thing to do. I'm hoping that by doing this, I can go back to my old projects and maybe figure out how to cover them in tests.

I used [this blog post](https://www.mauriciopoppe.com/notes/computer-science/computation/promises/#) as a guide for this project.

# Technology

This is pure JavaScript with Jest as a testing library and Prettier for formatting - which caused some interesting things to happen.
