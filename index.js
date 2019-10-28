const express = require('express')
const basicAuth = require('express-basic-auth')

var app = express()

app.use(express.json())
/*app.use(basicAuth({
    users: {'admin': 'ctrlalttec'},
    challenge: true
}))
*/
const fetch = require('node-fetch')
const readline = require('readline-sync')
const nodemailer = require('nodemailer')

let email = readline.question("Email ")
let password = readline.question("Password ", {hideEchoBack: true})

var mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: password
    }
})

function sendMails(addresses, url, subject){
    //for(let address of addresses){
        fetch(url).then(data=>data.text()).then(content=>{
            mailer.sendMail({
                to: addresses, 
                subject: subject,
                html: content
            }, (error, info)=>{
                if(error){
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            })
        })
    //}
}

/*
async function getMails(){
    return new Promise((resolve, reject)=>{
        fetch('https://ctrl-alt-tec-members.herokuapp.com/members').then((data)=>data.json()).then((data)=>{
            resolve(
                data.map( l => ({
                    address: l['CORREO ELECTRONICO '],
                    name: l['NOMBRE (S)']
                })  )
            )
        })
    })
}
*/


app.get('/', async (req, res)=>{
    //console.log(req.auth.user)
    //let mails = await getMails()
    //res.end(JSON.stringify(mails))
    res.sendFile(__dirname+'/index.html')
})



app.get('/templates', (req, res)=>{
    fetch('https://ctrl-alt-tec.github.io/Templates/templates.json').then(data=>data.json()).then(data=>{
        res.end(JSON.stringify(data))
        //console.log(data)
    }).catch(err=>{console.log(err)})
})

app.post('/send', (req, res)=>{
    sendMails(req.body.mails, req.body.url, req.body.subject)
})



app.listen(process.env.PORT || 8080, function(){
	console.log("Your node js server is running")
})