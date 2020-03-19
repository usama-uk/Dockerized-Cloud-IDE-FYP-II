var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Dockerized Cloud IDE' });
});

// router.get('/Tab', function (req, res, next) {
//     res.render('Tab', { title: 'Tab Menu' });
// });

router.get('/fileOpen', function (req, res, next) {

    var filePath = '/home/uk/files/K5MD9O0C'+'/'+req.query.filename;
    console.log(filePath);

    fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        res.send(data);
      });
    //res.send(data);
});

router.get('/explorer', function (req, res, next) {
    var files = traverseDir('/home/uk/files/K5MD9O0C', []);
    //console.log(files);
    console.log(JSON.stringify(files, null, 2));
    //req.files=files;
    res.send(files);
});


function traverseDir(dir, files) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            var arr = [];
            files.push({ name: file, content: arr })
            traverseDir(fullPath, arr);
        } else {
            files.push({ name: file })
        }
    });
    return files;

}

module.exports = router;
