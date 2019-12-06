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
    
            //store elements with same class name as list
            let itemAddItemClassElemList = document.getElementsByClassName("addItem");
            let itemNameClassElemList = document.getElementsByClassName("itemNmae");
            let itemPriceClassElemList = document.getElementsByClassName("itemPrice");
            let itemImageClassElemList = document.getElementsByClassName("itemImage");
            let i = 0;
    
            db.collection("items").where("category", "==", "tech").limit(5).get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
                                        //    console.log(doc.id, " => ", doc.data());
                itemNameClassElemList[i].innerHTML = doc.id;
                itemPriceClassElemList[i].innerHTML = "$" + doc.data().price
                itemImageClassElemList[i].setAttribute("src", doc.data().img_src);
                itemAddItemClassElemList[i].onclick = function () {
                    window.location.href = "login.html";
                }
                i++;
                });
    
            });
            db.collection("items").where("category", "==", "clothing and shoes").limit(5).get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
                                        //    console.log(doc.id, " => ", doc.data());
                itemNameClassElemList[i].innerHTML = doc.id;
                itemPriceClassElemList[i].innerHTML = "$" + doc.data().price
                itemImageClassElemList[i].setAttribute("src", doc.data().img_src);
                itemAddItemClassElemList[i].onclick = function () {
                    window.location.href = "login.html";
                }
                i++;
                });
    
            });
            db.collection("items").where("category", "==", "office equipment").limit(5).get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
                                        //    console.log(doc.id, " => ", doc.data());
                itemNameClassElemList[i].innerHTML = doc.id;
                itemPriceClassElemList[i].innerHTML = "$" + doc.data().price;
                itemImageClassElemList[i].setAttribute("src", doc.data().img_src);
                itemAddItemClassElemList[i].onclick = function () {
                    window.location.href = "login.html";
                }
                i++;
                });
    
            });
            db.collection("items").where("category", "==", "sports equipment").limit(5).get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
                                        //    console.log(doc.id, " => ", doc.data());
                itemNameClassElemList[i].innerHTML = doc.id;
                itemPriceClassElemList[i].innerHTML = "$" + doc.data().price
                itemImageClassElemList[i].setAttribute("src", doc.data().img_src);
                itemAddItemClassElemList[i].onclick = function () {
                    window.location.href = "login.html";
                }
                i++;
                });
            });
            db.collection("items").where("category", "==", "house products").limit(5).get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
                                        //    console.log(doc.id, " => ", doc.data());
                itemNameClassElemList[i].innerHTML = doc.id;
                itemPriceClassElemList[i].innerHTML = "$" + doc.data().price
                itemImageClassElemList[i].setAttribute("src", doc.data().img_src);
                itemAddItemClassElemList[i].onclick = function () {
                    window.location.href = "login.html";
                }
                i++;
                });
    
            });
        }
        readAllItems();
    
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