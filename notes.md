Javascript is a client side language that runs in a webbrowser

node.js is a way we can run javascript serverside as an application on our computer, serving up documents or applications.

127.0.0.1 is our local IP address it's a convention usually used in development when you to locally host an application on your computer, to see how it's working.

running node <our_file>.js serves up our application and it is accessible at 127.0.0.1:3000 
(at the address 127.0.0.1 on the port 3000)

Other common local IP addresses used are  
127.0.0.1
0.0.0.0


port: 3000 (can be any number as long as it's not already in use, it's not reserved for something else i.e. (:80 for http or :20 for ftp)) 


RELEVANT LINUX COMMANDS: 

"ping google.com" -> shows the related IP address of google.com -> 142.250.186.78. 

(Ping is also an easy way to test your network access or the availability of a server)


"top" -> see all system processes and what ports they are running on etc. 


What is express.js? 

it's a webframework written on top of node.js, helps us with more organized , easy to read code that we can maintain. 


non-persisted - DB , if you exit the application, all the data will not be saved. 


GIT NOTES 
--------- 
After you clone , make sure you set up your git remote so that your local repo knows where your push should go. We can do this using the "git remote" commands. 

git remote -v 

shows what remotes are already registered, if your repo is already registered, you don't need to add it. 

(it should look like this)
origin	git@github.com:dd-code-immersives/ExpressIntro.git (fetch)
origin	git@github.com:dd-code-immersives/ExpressIntro.git (push)

git remote add origin git@github.com:dd-code-immersives/ExpressIntro.git 

adds the repo git@github.com:dd-code-immersives/ExpressIntro.git to our remotes under the name "origin". 


NOTE: usually when you clone, this happens automatically, just double check to make sure. If you don't clone, you have to this step.  


git checkout -b "another-branch"

-creates a branch "another-branch"

git branch -d another-branch

-deletes the branch "another-branch"


git checkout  "another-branch"

-switches to "another-branch" 


GIT COMMON ERRORS 
-----------------
git push
fatal: No configured push destination.
Either specify the URL from the command-line or configure a remote repository using

    git remote add <name> <url>

and then push using the remote name

    git push <name>


FIX -> add your remote repo 

----------------------------------
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin main 
    	  or 
    git push -u origin main 

FIX -> Run indicated command