var express = require('express');
var path = require('path');
var fs = require('fs');
var formidable = require('formidable');
var cookieParser = require('cookie-parser');
var readChunk = require('read-chunk');
var session = require('express-session');
var fileType = require('file-type');
var _ = require('underscore');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var nodes = {};
var mangUsers=[];
var mangUsersLiveCode = [];
app.set('port', (process.env.PORT || 3000));
app.set('view engine', 'ejs');
app.set('view options', {layout: false});
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Tell express to serve static files from the following directories
// app.use(express.static('public'));
app.use('/public', express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(session({secret: "Shh, its a secret!"}));
var indexRouter = require('./routes/index');
var postRouter = require('./routes/post');
var accountRouter = require('./routes/account');
var liveCodeRouter = require('./routes/livecode');

app.use('/', indexRouter);
app.use('/post', postRouter);
app.use('/account', accountRouter);
app.use('/livecode',liveCodeRouter);

app.use(function(req, res, next) {
    var oneof = false;
    if(req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if(req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if(req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if(oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }

    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});

app.get('/message', function (req, res) {
    // Don't bother about this :)
    var filesPath = path.join(__dirname, 'uploads/');
    fs.readdir(filesPath, function (err, files) {
        if (err) {
            console.log(err);
            return;
        }

        files.forEach(function (file) {
            fs.stat(filesPath + file, function (err, stats) {
                if (err) {
                    console.log(err);
                    return;
                }

                var createdAt = Date.parse(stats.ctime),
                    days = Math.round((Date.now() - createdAt) / (1000 * 60 * 60 * 24));

                if (days > 1) {
                    fs.unlink(filesPath + file);
                }
            });
        });
    });
    res.render('message', {title: 'Trang chủ',User:req.session.acc});
});

io.on("connection", function(socket){
    console.log("Co nguoi ket noi " + socket.id);

    socket.on("client-send-Username", function(data){
        if(mangUsers.indexOf(data)>=0){
            socket.emit("server-send-dki-thatbai");
        }else{
            mangUsers.push(data);
            socket.Username = data;
            socket.emit("server-send-dki-thanhcong", data);
            io.sockets.emit("server-send-danhsach-Users", mangUsers);
        }
    });

    socket.on('client-send-code',function (data) {
        socket.broadcast.emit("server-send-code",data);
    });


    socket.on("logout", function(){
        mangUsers.splice(
            mangUsers.indexOf(socket.Username), 1
        );
        socket.broadcast.emit("server-send-danhsach-Users",mangUsers);
    });

    socket.on("user-send-message", function(data){
        io.sockets.emit("server-send-mesage", {un:socket.Username, nd:data} );
    });

    socket.on("user-send-message-sendfile", function(data){
        io.broadcast.emit("server-send-mesage", {un:socket.Username, nd:data} );
    });

    socket.on("toi-dang-go-chu", function(){
        var s = socket.Username + " đang nhập gì đó";
        io.sockets.emit("ai-do-dang-go-chu", s);
    });

    socket.on("toi-stop-go-chu", function(){
        io.sockets.emit("ai-do-STOP-go-chu");
    });
    socket.on('disconnect', function () {
        mangUsers.splice(
            mangUsers.indexOf(socket.Username), 1
        );
        socket.broadcast.emit("server-send-danhsach-Users",mangUsers);
    });

});

app.get('/download', function(req, res){
    var fileName = req.query.name;
    var file = __dirname + '/uploads/'+fileName;
    res.download(file); // Set disposition and send it.
});

/**
 * Upload photos route.
 */
app.post('/upload_photos', function (req, res) {
    var photos = [],
        form = new formidable.IncomingForm();

    // Tells formidable that there will be multiple files sent.
    form.multiples = true;
    // Upload directory for the images
    form.uploadDir = path.join(__dirname, 'tmp_uploads');

    // Invoked when a file has finished uploading.
    form.on('file', function (name, file) {
        // Allow only 3 files to be uploaded.
        if (photos.length === 1) {
            fs.unlink(file.path);
            return true;
        }

        var buffer = null,
            type = null,
            filename = '';

        buffer = readChunk.sync(file.path, 0, 262);
        type = fileType(buffer);

        // Check the file type, must be either png,jpg or jpeg
        if (type !== null) {
            // Assign new file name
            filename = file.name;

            // Move the file with the new file name
            fs.rename(file.path, path.join(__dirname, 'uploads/' + filename));

            // Add to the list of photos
            photos.push({
                status: true,
                filename: filename,
                type: type.ext,
                publicPath: 'uploads/' + filename
            });
        } else {
            photos.push({
                status: false,
                filename: file.name,
                message: 'Invalid file type'
            });
            fs.unlink(file.path);
        }
    });

    form.on('error', function (err) {
        console.log('Error occurred during processing - ' + err);
    });

    // Invoked when all the fields have been processed.
    form.on('end', function () {
        console.log('All the request fields have been processed.');
    });

    // Parse the incoming form fields.
    form.parse(req, function (err, fields, files) {
        res.status(200).json(photos);
    });
});





// app.listen(app.get('port'), function() {
//     console.log('Express started at port ' + app.get('port'));
// });
process.env.TZ = 'Asia/Ho_Chi_Minh';
server.listen(process.env.PORT || 3000);
