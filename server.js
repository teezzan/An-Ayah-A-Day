const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
var history = require('connect-history-api-fallback');
var Jimp = require('jimp');
var cors = require('cors')
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
app.use(history());
app.use(serveStatic(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.get('*', function (req, res) {
    res.redirect('/');
});

function randomint(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
setpix = (req, name) => {
    Jimp.read(`http://genpix.herokuapp.com/api/render?url=https://quran.com/${req.body.surah}/${req.body.ayah}&output=screenshot&viewport.height=2000&viewport.width=1200`, (err, lenna) => {
        if (err) throw err;
        lenna
            // .resize(256, 256) // resize
            .quality(100) // set JPEG quality
            .greyscale() // set greyscale
            // .crop( 20, 20, 300, 250 ) 
            .write(`${name}.jpg`, (err) => {
                console.log(err);
                // res.sendFile(path.join(__dirname, '/lena-small-bw.jpg'));
            });
    });
}
app.post('/set', cors(), (req, res) => {
    var net = randomint(1000, 1020).toString();
    setTimeout(() => {
        setpix(req, net)
    }, 1000);

    res.status(200).json({ name: `${net + ".jpg"}` })

})

app.post('/get', cors(), (req, res) => {

    res.sendFile(path.join(__dirname, req.body.name));
})

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Listening onport 8080");

});







// res.status(200).sendFile("/lena-small-bw.jpg", (err)=>{
//     if(err) console.log("done");
// });