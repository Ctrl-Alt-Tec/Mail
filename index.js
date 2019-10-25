const express = require('express')
const basicAuth = require('express-basic-auth')

var app = express()

app.use(express.json())
app.use(basicAuth({
    users: {'admin': 'ctrlalttec'},
    challenge: true
}))


const fetch = require('node-fetch')


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
    console.log(req.auth.user)
    //let mails = await getMails()
    //res.end(JSON.stringify(mails))
    res.sendFile(__dirname+'/index.html')
})


app.listen(process.env.PORT || 8080, function(){
	console.log("Your node js server is running")
})