var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var port = process.env.PORT || 3000;

var friends = [
    {
         name: "Manuela",
         photo: "https://secure.parksandresorts.wdpromedia.com/resize/mwImage/1/1280/720/100/wdpromedia.disney.go.com/media/disneyparks_v0100/1/media/special-offers/special-offers-dlr-generic-pep.jpg",
         survey: [5, 3, 1, 2, 5, 4, 2, 1, 5, 1]
     },
     {
         name: "Karina",
         photo: "http://img4.zergnet.com/1462067_300.jpg",
         survey: [3, 3, 2, 2, 5, 3, 2, 1, 1, 2]
     },
     {
         name: "Byron",
         photo: "https://cdn-live-s3.sidearmstreaming.com/allaccess-vod/ugeorgia/12151309.jpeg",
         survey: [5, 3, 3, 4, 2, 1, 3, 4, 1, 5]
     },
     {
         name: "Christy",
         photo: "http://seaotters.com/wp-content/uploads/2012/03/628x353-otter-cu-yawn.jpg",
         survey: [5, 1, 4, 2, 3, 3, 2, 1, 5, 3]
     }
];


// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use("/assets",express.static(path.join(__dirname, "app/public")));

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});

app.get("/api/friends", function(req, res) {
  res.json(friends);
});

app.post("/api/new", function(req, res) {
  	var newSurvey = req.body;
    var lowestFriend;
    var hold;
    
    for(var i = 0; i < friends.length; i++){
        var total = 0;
        for(var j = 0; j < newSurvey.survey.length; j++){
            total = total + Math.abs(newSurvey.survey[j] - friends[i].survey[j]);
            console.log(i + ": " + total);
        }
        if(hold == undefined || hold > total){
            hold = total;
            lowestFriend = i;
        }
        
    }
  	console.log(friends[lowestFriend]);

  	res.json(friends[lowestFriend]);
});

// Starts the server to begin listening
// =============================================================
app.listen(port, function() {
  console.log("App listening on PORT " + port);
});