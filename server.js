const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
var history = require('connect-history-api-fallback');
var Jimp = require('jimp');
var fs = require('fs');
var app = express();
app.use(history());
app.use(serveStatic(path.join(__dirname, 'dist')));

app.get('*', function (req, res) {
    res.redirect('/');
});

app.post('*', (req, res) => {



    Jimp.read('./public/0001.jpg', (err, lenna) => {
        if (err) throw err;
        lenna
            // .resize(256, 256) // resize
            .quality(100) // set JPEG quality
            .greyscale() // set greyscale
            .crop( 20, 20, 300, 250 ) 
            .write('lena-small-bw.jpg', (err) => {
                console.log(err);
                // res.sendFile("./lena-small-bw.jpg", (err) => {
                //     if (err) return res.status(404);
                    console.log(path.join(__dirname, '/lena-small-bw.jpg'));
                // });
                res.sendFile(path.join(__dirname, '/lena-small-bw.jpg'));

            });

    });
    // var tee = fs.createWriteStream("./lena-small-bw.jpg");
    // console.log(tee);



})

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Listening onport 8080");

});







// res.status(200).sendFile("/lena-small-bw.jpg", (err)=>{
//     if(err) console.log("done");
// });