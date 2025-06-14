# Web Development Final Project - *SailingHub*

Submitted by: **Frederick DeBiase**

This web app: **SailingHub is a platform that allows any in or interested in the sailing community to explore and create posts.**

Time spent: **12** hours spent in total

Link: https://sailing-hub.netlify.app/

## Required Features

The following **required** functionality is completed:


- [x] **Web app includes a create form that allows the user to create posts**
  - Form requires users to add a post title
  - Forms should have the *option* for users to add: 
    - additional textual content
    - an image added as an external image URL
- [x] **Web app includes a home feed displaying previously created posts**
  - Web app must include home feed displaying previously created posts
  - By default, each post on the posts feed should show only the post's:
    - creation time
    - title 
    - upvotes count
  - Clicking on a post should direct the user to a new page for the selected post
- [x] **Users can view posts in different ways**
  - Users can sort posts by either:
    -  creation time
    -  upvotes count
  - Users can search for posts by title
- [x] **Users can interact with each post in different ways**
  - The app includes a separate post page for each created post when clicked, where any additional information is shown, including:
    - content
    - image
    - comments
  - Users can leave comments underneath a post on the post page
  - Each post includes an upvote button on the post page. 
    - Each click increases the post's upvotes count by one
    - Users can upvote any post any number of times

- [x] **A post that a user previously created can be edited or deleted from its post pages**
  - After a user creates a new post, they can go back and edit the post
  - A previously created post can be deleted from its post page

The following **optional** features are implemented:


- [x] Web app implements pseudo-authentication
  - Users can only edit and delete posts or delete comments by entering the secret key, which is set by the user during post creation
  - **or** upon launching the web app, the user is assigned a random user ID. It will be associated with all posts and comments that they make and displayed on them
  - For both options, only the original user author of a post can update or delete it

The following **additional** features are implemented:

* [x] Only a signed in user can create posts.
* [x] Only the user that created the post can edit/delete it.
* [x] Only signed in users can comment

## Video Walkthrough

Here's a walkthrough:

<img src='https://i.imgur.com/Vq5NrqS.gif' title='Video Walkthrough pt1' width='' alt='Video Walkthrough' />

<img src='https://i.imgur.com/He49HWC.gif' title='Video Walkthrough pt2' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF recored with streamlabs then converted with Ezgif.com and posted on imgur

## Notes

Great application!

## License

    Copyright [2025] [Frederick DeBiase]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
