console.log("ver 3.01");
        let db = firebase.firestore();
        let queryStringURL = decodeURIComponent(window.location.search);
        let tempVar = queryStringURL.split('?');
        let passedValue = tempVar[1];
        tempVar = passedValue.split('=');
        let selectionType = String(tempVar[0].toLowerCase());
        let searchValue = String(tempVar[1].toUpperCase());
        let uid = localStorage.getItem("userId");
        //console.log('HELLO', selectionType, typeof (selectionType), searchValue, typeof (searchValue));
        let tempSplit = searchValue.split(' ');
        let keySearchValue = tempSplit[0].toLowerCase();
        let itemsRef = db.collection("items");
        if (selectionType === "users") {
            //console.log("here1");
            keySearchValue = keySearchValue.charAt(0).toUpperCase() + keySearchValue.slice(1);
            queryUsersResults();
        } else {
            queryItemsResults();
        }
        let userWishListRef = db.collection("users").doc(uid).collection("wishlist")
        function editCollapsedContent() {
            //This function is an onclick event function when the user wants to add
            //a custom item into the database AND into their database. Adds the item into the
            //items collection as an object and into the user's wishlist subcollection 
            //as a reference to that item
            itemNameEditElem = document.getElementById("customItemName");
            itemPriceEditElem = document.getElementById("customItemPrice");
            itemNameEditElem.setAttribute("contenteditable", "true");
            itemPriceEditElem.setAttribute("contenteditable", "true");
            saveBtnElem = document.getElementById("saveBtn");
            saveBtnElem.onclick = function() {
                console.log(itemNameEditElem.innerHTML);
                console.log(itemPriceEditElem.innerHTML);
            itemsRef.doc(itemNameEditElem.innerHTML).set({
                price: itemPriceEditElem.innerHTML,
                img_src: temp
            }).then(function() {
                console.log("Document successfully written!");
            })
            userWishListRef.doc(itemNameEditElem.innerHTML).set({
                itemRef: "items/" + itemNameEditElem.innerHTML
            }).then(function() {
                console.log("ItemRef Document successfully written!");
            })
        } 
        }
        let fileTag = document.getElementById("filetag");
        let preview = document.getElementById("customItemImg");
        preview.style.width = 400 + 'px';
        
        let uniqueKey = uuidv4();
        let temp;
   
        let itemPhotoStorageRef = firebase.storage().ref("Custom Item Photos/" + uniqueKey);
        function openFile(event) {
        //this function is directed when they click the upload profile photo
        //the profile photo is uploaded to the database and written in the 
        //src_img field of the uid document in users collection
            let reader = new FileReader();
            let input = event.target;
                reader.onload = function() {
                    let dataURL = reader.result;
                    //store picture to db storage and set the new profile photo path to it
                    // here
                    preview.setAttribute('src', dataURL);
                    temp = dataURL;
                }
                reader.readAsDataURL(input.files[0]);
                
                itemPhotoStorageRef.put(input.files[0]);
        }
        function uuidv4() {
            //unique key generator for using it as a child node name for storage references
            //returns a multi length string used for storage photo names 
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
            });
        }
        function queryUsersResults() {
            //query the user's text input with the "users" drop-down selection. The search query
            //is not advanced. It is not case-sensitive (made it all lowered-case automated)
            //and only returns if the starting input text matches the starting name of the user
            //Displays at max 10 users
            db.collection("users").orderBy("name").startAt(keySearchValue).endAt(keySearchValue + '\uf8ff').limit(10).get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    //console.log(doc.id, doc.data());
                    createUserBlockResults(doc.id, doc.data());
                });
            });
        }
        function createUserBlockResults(frienduid, data) {
            //queryUsersResults helper function. creates the results HTML elements dynamically
            //the first parameter is the friend user's uid, and the data is the friend's data information
            divElem = document.createElement("DIV");
            imgElem = document.createElement("IMG");
            pElemName = document.createElement("P");
            pElemBackground = document.createElement("P");
            parentDiv = document.getElementById("results");
            divElem.className = "jumbotron resultDiv";
            parentDiv.appendChild(divElem);
            divElem.appendChild(imgElem);
            divElem.appendChild(pElemName);
            divElem.appendChild(pElemBackground);
            addFriendBtnElem = document.createElement("BUTTON");
            addFriendBtnElem.innerHTML = "Add Friend";
            addFriendBtnElem.onclick = function() {
                //add to friend's friend request system (no need for requests on user)
                console.log("added test");
                db.collection("users").doc(frienduid).collection("requests").doc(uid).set({
                    userRef: db.doc("users/" + uid)
                });
                this.innerHTML = "Added!";
            }
            divElem.appendChild(addFriendBtnElem);
            viewFriendBtnElem = document.createElement("BUTTON");
            viewFriendBtnElem.innerHTML = "View";
            viewFriendBtnElem.onclick = function() {
            //db.collection("users").doc(doc.id).get().then(function(doc) {
                window.location.href = "profile.html?" + frienduid;    
            }
            divElem.appendChild(viewFriendBtnElem);
            imgElem.setAttribute("SRC", data.profile_photo);    //to be added on user's profile page and update to db
            imgElem.setAttribute("WIDTH", 100 + 'px');        // to be edited with CSS; temporary here for testing
            pElemName.innerHTML = data.name;
            pElemBackground.innerHTML = data.short_bio;    //short bio (residence location, education background)
        }
        function queryItemsResults() {
            //query the item's text input with the "items" drop-down selection. The search query
            //is not advanced. It is not case-sensitive (made it all lowered-case automated)
            //and only returns if the starting input text matches the starting name of the item
            //Displays at max 10 items
            db.collection("items").orderBy('__name__').startAt(keySearchValue).endAt(keySearchValue + '\uf8ff').limit(10).get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    console.log(doc.data());
                    createItemBlockResults(doc.id, doc.data());
                });
            });
        }
        function createItemBlockResults(name, data) {
            //queryItemsResults helper function. creates the results HTML elements dynamically
            //the first parameter is the item name, and the data is the item's data information
            //If the user clicks on one of the result items, the item is added into the
            //user's wishlist (the item is added by reference field)
            divElem = document.createElement("DIV");
            imgElem = document.createElement("IMG");
            pElemName = document.createElement("P");
            pElemPrice = document.createElement("P");
            btnElemAddToWishList = document.createElement("BUTTON");
            btnElemAddToWishList.innerHTML = "Add to wishlist";
            parentDiv = document.getElementById("results");
            parentDiv.appendChild(divElem);
            divElem.appendChild(imgElem);
            divElem.appendChild(pElemName);
            divElem.appendChild(pElemPrice);
            divElem.appendChild(btnElemAddToWishList);
            btnElemAddToWishList.onclick = function() {
                userWishListRef.doc(pElemName.innerHTML).set({
              itemRef: db.doc("items/" + pElemName.innerHTML)
            });
            }
            imgElem.setAttribute("SRC", data.img_src);
            imgElem.setAttribute("WIDTH", 150 + 'px');        // to be edited with CSS; temporary here for testing
            pElemName.innerHTML = name;
            pElemPrice.innerHTML = '$' + data.price;
        }
        function querySearch() {
    //get the input text and drop down selection (users or items) in the search bar 
    //and query the input word by reading the database in the users or items collection.
    //The user is directed to the searchResult.html page with the results of the closest
    //related user or item queries. The first part of the attached string url is the 
    //selection of the drop-down options, followed by an '=', and then the queried input.
            let selection = document.getElementById("dropDownSelect").value;
            //let btn = document.getElementById("queryButton");
            let query = document.getElementById("queryText").value;
            //btn.onclick = function() {
            window.location.href = "searchResult.html?" + selection + '=' + query;
            //}
        }
        function myProfileDirect() {
    //direct to the user's profile page when the user clicks on the my profile nav bar.
    //the logged-in user's uid is passed on by url 
            let my_profile = document.getElementById("myProfile");
            my_profile.onclick = function () {
                window.location.href = "profile.html?" + localStorage.getItem('userId');
            };
        }
        myProfileDirect();

        function myFriendsDirect() {
    //direct the user to the friendslist.html where the user can see their friend list if
    //they have accepted friends request in the past
    //the user's uid is passed down by url 
    //wishlist
            let my_friends = document.getElementById("myFriends");
            my_friends.onclick = function () {
                window.location.href = "friendsList.html?" + localStorage.getItem('userId');
            };
        }
        myFriendsDirect();