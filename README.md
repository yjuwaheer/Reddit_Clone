# About

Building a Forum / Reddit clone. \
Inspired by [GrammerHub Goatpad](https://github.com/grammerhub/goatpad).

## Languages, Frameworks and Tools

- ReactJS
- Firebase
  - Firebase Auth
  - Firebase Firestore
  - Firebase Storage
- TailwindCSS
- ChakraUI

# Getting Started

- Clone the repository.
- Install dependencies using `npm install`.
- Run `npm start`.

# Structure (Overview)

```mermaid
  flowchart TD;
      index-->App;

      App<-->Navbar
      Navbar-->SignupModal;
      Navbar-->AddPostModal;

      App-->Home;
      App-->Profile;
      App-->Settings;

      Home-->Post;
      Home-->PostCard;
      Post-->CommentSection;
      CommentSection-->Comment;

      Profile-->ProfilePostCard;
      Profile-->EditPostModal;
```

>`Note:` ***Navbar*** in included in ***App*** to be made available to all pages (thus the bi-directional arrow).
