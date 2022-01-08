const flex = require('./flex.js')
const nhentai = require('nhentai');
const api = new nhentai.API();

const express = require("express");
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const port = process.env.PORT || 4000;
app.listen(port);
app.use(bodyParser.json())

/*
api.search("riko sakurauchi").then(ru => {
    console.log(ru.doujins[0].titles)
}) */

app.post('/webhook', (req, res) => {
  //  console.log(req.body);
    let reply_token = req.body.events[0].replyToken;
    let msg = req.body.events[0].message.text;
    fetch(msg,reply_token);
    res.sendStatus(200);
})

app.get('/' , (req,res) => {
    console.log(req);
    res.send("<h1>it works<h1>");
})


function fetch(code,rpt)
{
    api.fetchDoujin(code).then(book => {

        try{
            console.log(book.titles)
            var size = book.cover.width.toString() + ':' + book.cover.height.toString();
            console.log(size)
            try {(reply(rpt, code, book.titles.pretty, book.cover.url, size))}
            catch(e) {console.log("out of range");}
        }
        catch(e) {console.log("out of range");}
        
        console.log("___________________________________");
        
    }
    , (err, res, body) => {
        console.log('not a number');
    }
    );
}


function reply(reply_token, code, title, coverurl, size) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {kitU7r1CNHa1+t4eUACoTRonmtZdX+c2SSTGW7Hs2Zmu+R8WK88kl8etpaxTGE3inWBxZUxa7gJ/kjjqJTCcOnaebc2AXY1ixendrmH436NjMpSLYSVm4+BVgOsTfIEQdnvyo+OAEcKo2nSq6O+i5gdB04t89/1O/w1cDnyilFU=}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: "flex",
            altText: "Not safe for work",
            contents: flex.flex(title,coverurl,code,size)
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }
    , (err, res, body) => {
        console.log('status = ' + res.statusCode);
     //   console.log(flex.flex());
    }
    );
}