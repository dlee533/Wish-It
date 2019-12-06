var db = firebase.firestore();
    console.log("ver 3.01");
    let itemIdNumberMap;    // to be used for onclick events of individual items (write to db for adding into the user's wishlist)
    function readAllItems() {
        //Read the database items collections, and add HTML elements dynamically. Sort the display by
        //categories, 5 items of each category per row
      let itemNamesList = [];
      let priceList = [];
      let imgSrcList = [];
      let itemIdList = [];
      //db.collection("items").get().then(function(querySnapshot) {
      //    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      //store elements with same class name as list
      let itemAddItemClassElemList = document.getElementsByClassName("addItem");
      let itemNameClassElemList = document.getElementsByClassName("itemNmae");
      let itemPriceClassElemList = document.getElementsByClassName("itemPrice");
      let itemImageClassElemList = document.getElementsByClassName("itemImage");
      let uid = localStorage.getItem('userId');
      let userWishListRef = db.collection("users").doc(uid).collection("wishlist");
      let i = 0;
      db.collection("items").where("category", "==", "tech").limit(5).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          //    console.log(doc.id, " => ", doc.data());
          let item_name = String(doc.id);
          itemNameClassElemList[i].innerHTML = doc.id;
          itemPriceClassElemList[i].innerHTML = doc.data().price
          itemImageClassElemList[i].setAttribute("src", doc.data().img_src);
          itemAddItemClassElemList[i].onclick = function () {
            userWishListRef.doc(item_name).set({
              itemRef: db.doc("items/" + item_name)
            });
          }
          i++;
        });
      });
      db.collection("items").where("category", "==", "clothing and shoes").limit(5).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          //    console.log(doc.id, " => ", doc.data());
          let item_name = String(doc.id);
          itemNameClassElemList[i].innerHTML = doc.id;
          itemPriceClassElemList[i].innerHTML = doc.data().price
          itemImageClassElemList[i].setAttribute("src", doc.data().img_src);
          itemAddItemClassElemList[i].onclick = function () {
            userWishListRef.doc(item_name).set({
              itemRef: db.doc("items/" + item_name)
            });
          }
          i++;
        });
      });
      db.collection("items").where("category", "==", "office equipment").limit(5).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          //    console.log(doc.id, " => ", doc.data());
          let item_name = String(doc.id);
          itemNameClassElemList[i].innerHTML = doc.id;
          itemPriceClassElemList[i].innerHTML = doc.data().price
          itemImageClassElemList[i].setAttribute("src", doc.data().img_src);
          itemAddItemClassElemList[i].onclick = function () {
            userWishListRef.doc(item_name).set({
              itemRef: db.doc("items/" + item_name)
            });
          }
          i++;
        });
      });
      db.collection("items").where("category", "==", "sports equipment").limit(5).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          //    console.log(doc.id, " => ", doc.data());
          let item_name = String(doc.id);
          itemNameClassElemList[i].innerHTML = doc.id;
          itemPriceClassElemList[i].innerHTML = doc.data().price
          itemImageClassElemList[i].setAttribute("src", doc.data().img_src);
          itemAddItemClassElemList[i].onclick = function () {
            userWishListRef.doc(item_name).set({
              itemRef: db.doc("items/" + item_name)
            });
          }
          i++;
        });
      });
      db.collection("items").where("category", "==", "house products").limit(5).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          //    console.log(doc.id, " => ", doc.data());
          let item_name = String(doc.id);
          itemNameClassElemList[i].innerHTML = doc.id;
          itemPriceClassElemList[i].innerHTML = doc.data().price
          itemImageClassElemList[i].setAttribute("src", doc.data().img_src);
          itemAddItemClassElemList[i].onclick = function () {
            userWishListRef.doc(item_name).set({
              itemRef: db.doc("items/" + item_name)
            });
          }
          i++;
        });
      });
    }
    readAllItems();
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
      let my_friends = document.getElementById("myFriends");
      my_friends.onclick = function () {
        window.location.href = "friendsList.html?" + localStorage.getItem('userId');
      };
    }
    myFriendsDirect();
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
    