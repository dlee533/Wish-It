# wishit

index.html
- first page to be displayed
- prompt the user to signup while enabling them to browse, search for items

index.js
- js file for index.html.
- contain functions that are required by index.html

login.html
- login page
- connected to fireauth

login.js
- js file for login.html
- allow user to signup if they do not have an account, if they do, login

main.html
- when the user signs up/logs in they get redirected to this page
- similar to index.html, its header include more options, like myProfile and friends

main.js
- js file for main.html
- contain functions that are used in main.html

profile.html
- profile page 
- user's own/ friends' profile page
- displays profile image, name, short bio, and wishlists
- allow user to edit profile pic, short bio, and the wishlists

profile.js
- js file for profile.html

searchResult.html
- search result page
- when user fill the search bar and click on search btn from other pages, they get redirected to this page
- search result for user/item depending on the dropdown menu they have selected
- user can add a custom item to their wishlist and the database

searchResult.js
- js file for searchResult.html
- creates div tags with detail of users/items
- get data from firebase database

underConstruction.html
- html file for undeveloped links

signout.js
- js file used for signing user out
- when user clicks on the button, the user signs out, local storage clears and the user gets redirected to the index.html

firebaseConfig.js
- js fiel for firebase configuration

friendsList.html
- friends list page
- on top div, displays the friends request, the informtion retrieved from the database includes profile pic, name, and shortbio
- on bottom div, displays the friends list
- when user clicks on view, redirecs the user to that person's profile page.