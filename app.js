const express = require('express')
const bodyParser = require('body-parser')
const https  = require('https')
const app = express();
app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended:true}))
app.get('/',function(req,res){
    res.sendFile(__dirname+"/signup.html")
})
app.post('/',function(req,res){
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;
    var data =  { 
        members :  [
        {
            email_address : email,
            status : "subscribed",
            merge_fields:{
                FNAME : firstName,
                LNAME : lastName
            }
        }
    ] 
};
const jsonData = JSON.stringify(data);
const url = "https://us6.api.mailchimp.com/3.0/lists/f855793ee0";
const options = {
    method : "POST",
    auth:"ch3pe:56db2f9c11222ff47720b19b1af1a87b-us6"
}

const request = https.request(url,options,function(response){

    if(response.statusCode === 200){
        res.sendFile(__dirname+"/success.html")
    } else {
        res.sendFile(__dirname+"/failure.html")
    }
response.on("data",function(data){
    console.log(JSON.parse(data))
})
})
request.write(jsonData)
request.end()
})

app.post('/failure',function(req,res){
    res.redirect("/")
})
app.post('/success',function(req,res){
    res.redirect("/")
})
app.listen(process.env.PORT || 3000,function(){
    console.log("Running on 3000")
})
// 56db2f9c11222ff47720b19b1af1a87b-us6
// f855793ee0