        let db = firebase.firestore();
        console.log("ver 3.01");
        let queryStringURL = decodeURIComponent(window.location.search);
        let tempVar = queryStringURL.split('?');
        let uid = tempVar[1];
        let profilePhotoStorageRef = firebase.storage().ref("Profile Photos/" + uid);
        //console.log(uid, typeof (uid));   works
        //let userData;
        //let storage = firebase.storage().ref;
        //<input id="shortBioBtn" type="button" value="Edit" onclick = "editShortBio()" />
        if (localStorage.getItem('userId') === uid) {
            //if profile.html is not the logged in user's, don't let them upload photo
            let uploadPicElement = document.createElement('INPUT');
            uploadPicElement.setAttribute("TYPE", "FILE");
            uploadPicElement.setAttribute("ACCEPT", "IMAGE/*");
            uploadPicElement.setAttribute("ONCHANGE", "openFile(event)");
            uploadPicElement.setAttribute("ID", "filetag");
            profileBlockElem = document.getElementById("profileBlock");
            profileBlockElem.appendChild(uploadPicElement);

            let shortBioTextElem = document.getElementById("shortBio");
            let bioBlockElem = document.getElementById("bioBlock");
            let editShortBioElem = document.createElement("button");
            editShortBioElem.setAttribute("ID", "shortBioBtn");
            bioBlockElem.appendChild(editShortBioElem);//shortBioBtnElem);
            let i = 0;
            shortBioEdit();
            function shortBioEdit() {
                //lets the user edit the short bio text if the user clicks the edit button
                //save the edited text short bio onto the database when the user clicks the save
                //button
                i++;
                console.log(i);
                editShortBioElem.innerHTML = "Edit Bio";

                editShortBioElem.onclick = function() {
                    //editShortBio();
                    shortBioTextElem.setAttribute("contenteditable", "true");
                    this.innerHTML = "Save";
                    this.onclick = function () {
                        i = 0;
                        console.log(i);
                        db.collection("users").doc(uid).set({
                            short_bio: shortBioTextElem.innerHTML

                        }, {merge: true});
                        //editShortBioElement.innerHTML = editedShortBioElement;
                        shortBioTextElem.setAttribute("contenteditable", "false");
                        if (i === 0) {
                            console.log('here');
                            shortBioEdit();
                        }
                    }
                }
            }
        }

        function getUserData() {
            //when the profile.html is loaded, this function grabs the user's uid document in the database
            //to call user's information such as the user's name, profile photo, and the user's short bio
            //uses a help function updateElements(doc.data()) to update the HTML elements dynamicallly
            db.collection("users").doc(uid).get()
                .then(function (doc) {
                    if (doc.exists) {
                        //console.log(doc.data());  works
                        updateElements(doc.data());
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch(function (error) {
                    console.log("Error getting document:", error);
                });
        }
        getUserData();
        let myWishList = [];    // store wishlistitem refs here
        function updateElements(userData) {
            let displayProfilePhoto = document.getElementById("profilePhoto");
            console.log(userData.name);
            //let wishListRef = db.collection("users").doc(uid).collction("wishlist");
            let displayNameElem = document.getElementById("displayName");
            displayNameElem.innerHTML = userData.name;
            let displayShortBioElem = document.getElementById("shortBio");
            displayShortBioElem.innerHTML = userData.short_bio; //to be updated to db once user sets one
            profilePhotoStorageRef.getDownloadURL().then(function(url) {
            //get profile photo from storage
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function(event) {
                    var blob = xhr.response;
                };
                xhr.open('GET', url);
                //xhr.send();

                // Or inserted into an <img> element:
                
                displayProfilePhoto.src = url;
                
                }).catch(function(error) {
                // Handle any errors
                displayProfilePhoto.src = userData.profile_photo;
                });
        }

        let fileTag = document.getElementById("filetag");
        let preview = document.getElementById("profilePhoto");
        //fileTag.addEventListener("onchange", function() {
        //        changeImage(this);
        //});
        let temp;
        function openFile(event) {
            let reader = new FileReader();
            let input = event.target;

            //if (input.files && input.files[0]) {
            //    reader = new FileReader();

                reader.onload = function() {
                    let dataURL = reader.result;
                    //store picture to db storage and set the new profile photo path to it
                    // here
                    // make sure user uploading file is it's own profile only
                    //console.log(dataURL);
                    //profilePhotoStorageRef.put(dataURL);
                    preview.setAttribute('src', dataURL);
                    temp = dataURL;
                }

                reader.readAsDataURL(input.files[0]);
                console.log(uid);
                profilePhotoStorageRef.put(input.files[0]);
                console.log(input.files[0]);
                db.collection("users").doc(uid).set({
                    profile_photo: temp
                });
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
        // console.log(user.uid, localStorage.getItem('userId'));
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
            let my_friends = document.getElementById("myFriends");
            my_friends.onclick = function () {
                window.location.href = "friendsList.html?" + localStorage.getItem('userId');
            };
        }
        myFriendsDirect();
    //direct the user to the friendslist.html where the user can see their friend list if
    //they have accepted friends request in the past
    //the user's uid is passed down by url 
        //wishlist
        function readWishlist() {
            db.collection("users").doc(uid).collection("wishlist").get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        db.collection("items").doc(doc.id).get()
                            .then(function (itemDoc) {
                                createItem(itemDoc);
                            }).catch(function () {
                                console.log("Cannot find itemDoc")
                            })
                        console.log(doc.id, " => ", doc.data().itemRef);

                    });
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });
        }
        let itemCard = $(".itemCard").first();
        function createItem(item) {
            console.log(item.data()['price']);
            if (itemCard.last.value === "filled") {
                itemCard.clone().appendTo(".cardContainer");
                console.log(item.id)
                $("#start").find(".itemName:last").text(item.id);
                $("#start").find(".itemPrice:last").text(item.data()['price']);
                $("#start").find(".itemCheck:last").val(item.id);
                $("#start").find(".itemImg:last").attr("src", item.data()['img_src']);
            } else {
                console.log(item.id)
                itemCard.last.value = "filled";
                $("#start").find(".itemName").text(item.id);
                $("#start").find(".itemPrice").text(item.data()["price"]);
                $("#start").find(".itemCheck:last").val(item.id);
                $("#start").find(".itemImg:last").attr("src", item.data()['img_src']);
            }
        }
        readWishlist();



        //hide buttons
        function checkOnclickHandler() {
            //hide the checkOffItems btn
            document.getElementById("checkOffItems").style.display = "none";

            //display radio btn + save btn
            document.getElementById("save").style.display = "block";
            let items = document.querySelectorAll(".itemCheck");
            console.log(items);
            items.forEach(function (item) {
                item.style.cssText = "visibility:visible";
            });
        }

        function saveOnclickHandler() {
            //get the value of items in an array : jquery?
            let itemsToDelete = document.querySelectorAll("input:checked");
            console.log(itemsToDelete)
            //hide save btn +radio btn
            document.getElementById("save").style.display = "none";
            let items = document.querySelectorAll(".itemCheck");
            console.log(items);
            items.forEach(function (item) {
                item.style.cssText = "visibility:hidden";
            });
            //change the css of the items with value inside the jquery, or possibly delete them from database altogether
            removeItems(itemsToDelete);
            //display the checkOffItems btn         
            document.getElementById("checkOffItems").style.display = "inline";
        }

        function removeItems(itemArr) {
            itemArr.forEach(function (item) {
                db.collection("users").doc(uid).collection("wishlist").doc(item.value).delete().then(function () {
                    console.log(item.value, " deleted from ", uid);
                    $(item).closest(".itemCard").hide();
                }).catch(function (error) {
                    console.error("error removing document:", error);
                });
            });
        };
        document.getElementById("checkOffItems").onclick = checkOnclickHandler;
        document.getElementById("save").onclick = saveOnclickHandler;