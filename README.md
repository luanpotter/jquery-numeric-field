js-base
=======
Just a simple collection of preconfigured stuff, allows for easily starting your js lib right on track.  
If you want to use it, you will have to fork it to change the default configs.  
Once setup, just clone and run setup.sh -- it will do everything.  
Run grunt to build (it will run a simple test that I created that can be used as a base too).  

How-to
======
Once forked and configured:
 * create the new repo in github.com
 * activate travis and code climate for it
 * clone your js-base fork
 * rename folder
 * run setup.sh and fill the info
 * commit!

Features
=======
This pack includes:
 * node, packages.json so we can use grunt
 * bower, already setup with qunit and jquery dependencies
 * grunt, already setup to build, run tests, etc
 * a simple jquery plugin structure and a qunit test for it (can be changed to other hs libs, of course)

Forking?
======
To use it for yourself, you need to change the file config.sh to setup your github username, name and email.
Conveniently, you can fork this repo for you so you don't need to change it all the time.
