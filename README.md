#Scalable javascript architecture based on work by [Nicholas C. Zakas](http://www.nczonline.net/)

* [Here is a video](http://developer.yahoo.com/yui/theater/video.php?v=zakas-architecture) which was used as the basis for this architecture.
* [Here is a slideshare](http://developer.yahoo.com/yui/theater/video.php?v=zakas-architecture) which was used as the basis for this architecture.

###Key Concepts:

* Loose coupling between modules
* Consistent sandbox interface to the application core (i.e. interfaces over implementation paradigm)
* Modules only access DOM elements in their box
* Modules don't create global objects
* Modules only access the sandbox the rest of the architecture doesn't exist to a module
* Sandbox can limit module access to core methods
* Application core manages modules and communication between modules
* Application core does general error handling
* Application core is extensible
* Base library (jQuery YUI etc...) is abstracted in the Application core

###To Run Tests:

* clone project
* cd scalable-javascript-architecture
* open jasmine/SpecRunner.html in the browser you want to test

###TODO:

* Complete unit testing!