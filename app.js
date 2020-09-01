const exp = require('express');
const bodyParser = require('body-parser');
const https= require("https");
const request = require("request");
const app = exp();
//to use static files like css
app.use(exp.static("static"));

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){

res.sendFile(__dirname+"/signup.html");

})
app.post("/failure",function(req,res){

  res.redirect("/");
})
app.post("/new",function(req,res){

  var firstname= req.body.Fname;
  var lastname= req.body.Lname;
  var gmail = req.body.Email;
  url="https://us17.api.mailchimp.com/3.0/lists/507f181009";
  var data =
  {
    members:
  [
  {
  email_address: gmail,
  status: "subscribed",
  merge_fields:
  {
	FNAME: firstname,
	LNAME: lastname
  }
  }
]
};

var jsondata = JSON.stringify(data);
options={
  method:"POST",
  auth:"akhil:1b66d6534ea0f00e5e44e5f7bf3b7e03-us17"
}
const request=https.request(url,options,function(response)
{

  response.on("data",function(data){
    console.log(JSON.parse(data));
    if(response.statusCode===200)
    {
      console.log(response.statusCode);
      res.sendFile(__dirname+"/success.html");
    }
    else
    {
      Newconsole.log(response.statusCode);
        res.sendFile(__dirname+"/failure.html");
    }

  })
})
request.write(jsondata);
request.end();

})

app.listen(process.env.PORT||3000,function(){console.log("listening on port 30000")});
//API KEY//1b66d6534ea0f00e5e44e5f7bf3b7e03-us17
//MANAGE AUDIENCE//507f181009
