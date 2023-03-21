1) move the task from "Sprint Backlog" to "In Progress"       
2) create a branch      
3) do the work      
4) git commit / git push      
5) review the result at  http://dev.bpi.buspark.io   
6) if complete, create PR       
6) move card to Ready for Review       
7) wait for team to give "thumbs up"      
8) PM merges PR      
9) PM moves card to done


# Boston Police Index


## System Architecture:


This web-app is a site with a [Next.js](https://nextjs.org/) framework, with a PostreSQL server as the backend. We also use [Material UI] (https://mui.com) and [MDX] (https://mdxjs.com) to assist in front-end.


The [Boston Police Index] (https://dev-bpi.netlify.app), aims to be a successor to the now inactive [Woke Windows] (https://www.wokewindows.org) project, where we aim to make Boston police data as accessible and easy to understand for as many people as possible.


## Table of Contents:


- [Testing Local Changes](#testing-local-changes)
- [Contribution Steps](#contribution-steps)
 - [Step 1: Move task from “Sprint Backlog” to “In Progress”]
 - [Step 2: Create a branch]
 - [Step 3: Add any changes or modifications]
 - [Step 4: Submit a pull request to Git]
 - [Step 5: Other teammates review the new changes and give a “thumbs up”]
 - [Step 6: Move task from “In Progress” to “Ready for Review”]
 - [Step 7: Wait for project manager to approve the Pull Request before merging]
 - [Step 8: Once approved, merge]
 - [Step 9: Once merged, move the task to “Done”]


## Testing Local Changes


To test changes locally, run either commands:


```bash
npm run dev
# or
yarn dev
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


You can start editing the page by modifying any file. The page auto-updates as you edit the file.


## Contribution Steps


### Step 1: Move task from “Sprint Backlog” to “In Progress”


Log in to the [Boston Police Index Taiga Page] (https://tree.taiga.io/project/langdon-boston-police-index/timeline) and click “Scrum” then “Backlog”. Click a task you want to work on and click “In Progress” for a task you want to work on.


### Step 2: Create a branch
Click onto the top left “Branch” button and create a new branch by clicking the “New Branch Button on the top right. Name the new branch something related to the change.


### Step 3: Add any changes or modifications
After switching to the new branch in your IDE, make modifications to complete the selected task from Step 1. Make sure to test your changes before pushing as outlined in [Testing Local Changes](#testing-local-changes).


### Step 4: Submit a pull request to Git
Click on the “Pull request” button and create a new pull request by clicking the “New pull request” button on the top right. Select the correct branch, confirm that changes are correct, and submit the pull request. 


### Step 5: Other teammates review the new changes and give a “thumbs up”
A teammate should notify others in the group using the appropriate methods when a pull request is submitted. A separate teammate should check the changes the made and give it a “thumbs up” by moving the task from “In Progress” to “Ready for Review” as outlined in Step 6


### Step 6: Move task from “In Progress” to “Ready for Review”
Log in to the [Boston Police Index Taiga Page] (https://tree.taiga.io/project/langdon-boston-police-index/timeline) and click “Scrum” then “Backlog”. Click a task you want to work on and click “Ready for Review” for a task you want reviewed.


### Step 7: Wait for the project manager to approve the Pull Request before merging
Patience is important, please wait for the project manager to approve the pull request.


### Step 8: Once approved, merge
After the project manager approves the changes, go ahead and merge the new branch to the main branch.


### Step 9: Once merged, move the task to “Done”

