const fs = require('fs');
// SSL
const key = fs.readFileSync('./src/ssl/private.key');
const cert = fs.readFileSync('./src/ssl/certificate.crt');
const options = {
  key: key,
  cert: cert
};
// SERVER
const express = require('express');
const cors = require('cors');
const app = express();
var compression = require('compression');
const dateFormat = require('dateformat');
const http = require('http');
const https = require('https');
const serverHTTPS = https.createServer(options, app);
const serverHTTP = http.createServer(app);
//const io = require( 'socket.io' )( serverHTTP, serverHTTPS ) ;
const prettify = require('html');
const html = require('./src/modules/html');
const ip = require('ip').address();
const Jimp = require('jimp');

/* io.on('connection', socket => {
  console.log(socket.request.connection.remoteAddress + ' connected')
  socket.on('message', data => {
    console.log(data);
    socket.broadcast.emit( 'message' ,data );
  });
  socket.on('log', data => {
    console.log(data);
  });
}); */


app.use(compression());
app.use(cors());
app.options(cors());
//app.use(function(req,res,next){setTimeout(next,500)});

// STATIC FILES
app.use(express.static(__dirname + `/src/frontend/build`));

// SSL VERIFICATION
app.get('/.well-known/pki-validation/:file', function(req, res) {
  const { file } = req.params;
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Content-Type', 'text/plain');
  res.sendFile(__dirname + `/src/ssl/.well-known/pki-validation/${file}`);
});

// GOOGLE VERIFICATION
app.get('/googleb600e8ef30b86857.html', function(req, res) {

  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Content-Type', 'text/plain');
  res.sendFile(__dirname + `/src/frontend/build/googleb600e8ef30b86857.html`);

});

// ROBOTS
app.get('/robots.txt', function(req, res) {

  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Content-Type', 'text/plain');
  res.sendFile(__dirname + `/src/frontend/build/robots.txt`);

});

// FAVICON
app.get('/favicon.ico', function(req, res) {

  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Content-Type', 'image/png');
  res.sendFile(__dirname + `/src/frontend/build/images/icons/favicon.ico`);

});

// LOADER.IO VERIFICATION
app.get('/loaderio-fbc896b413f1edba439299f31ba64ec6.txt', function(req, res) {

  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Content-Type', 'text/plain');
  res.sendFile(__dirname + `/src/loader.io/test.txt`);

});

// SSL LOGO COMODO
app.get('/ssl/images/comodo_secure_seal_113x59_transp.png', function(req, res) {

  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Content-Type', 'image/png');
  res.sendFile(__dirname + `/src/ssl/images/comodo_secure_seal_113x59_transp.png`);

});

// ROOT URL
app.get('/', function(req, res) {
  console.log('/')
  const query = req.query;
  if (query.render !== undefined) {
    _forcePageRendering('index');
  }
  res.sendFile(__dirname + `/src/html/index.html`);

});

// socket io
app.post('/socket.io', function(req, res) {

  res.sendFile(__dirname + `/node_modules/socket.io-client/dist/socket.io.js`);

});
app.get('/socket.io', function(req, res) {

  res.sendFile(__dirname + `/node_modules/socket.io-client/dist/socket.io.js`);

});

// L1 URLS
app.get('/:l1', function(req, res) {
  console.log('/:l1')
  const { l1 } = req.params;
  const query = req.query;
  if (query.render !== undefined) {
    _forcePageRendering(l1);
  }
  res.sendFile(__dirname + `/src/html/${l1}.html`);

});

// TEMPLATES JSON
app.get('/templates/:page', function(req, res) {
  console.log('/templates/:page')
  const { page } = req.params;
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Content-Type', 'application/json');
  res.sendFile(__dirname + `/src/templates/${page}.json`);

});

// IMAGES
app.get('/images/:image', function(req, res) {
  console.log('/images/:image')
  const { image } = req.params;
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Content-Type', 'image/jpeg');
  res.sendFile(__dirname + `/src/images/${image}`);
  console.log('reading image: ' + image);
  console.log('> ' + req.connection.remoteAddress)

});

// VECTORS
app.get('/svg/:svg', function(req, res) {
  console.log('/svg/:svg')
  const { svg } = req.params;
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Content-Type', 'image/svg+xml');
  res.sendFile(__dirname + `/src/svg/${svg}.svg`);

});

// IMAGES WITH QUALITY
app.get('/images/:image/:quality', async (req, res) => {
  const { image, quality } = req.params;
  console.log(`asking for image: ${image} with quality: ${quality}`)
  if (!fs.existsSync(`./src/images/${quality}/${image}`)) {
    console.log('file not found... creating it!')
    await Jimp.read(`./src/images/${image}`)
      .then( resource => {
        const { width, height } = resource.bitmap;
        const rapp = parseInt(width / height * 100) / 100;
        const mewWidth = 800
        resource.quality(95) // set JPEG quality
                .resize(mewWidth, parseInt(mewWidth / rapp))
                .write(`./src/images/${quality}/${image}`); // save
      })
      .then( () => {
        res.header("Access-Control-Allow-Origin", "*");
        res.setHeader('Content-Type', 'image/jpeg');
        res.sendFile(__dirname + `/src/images/${quality}/${image}`);
      })
  } else {
    console.log('file exists !')
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-Type', 'image/jpeg');
    res.sendFile(__dirname + `/src/images/${quality}/${image}`);
  }
});

// GOOGLE IMAGE SEARCH
app.get('/google/images/:search', (req, res) => {
  const { search } = req.params;

  https.get('https://www.google.nl/search?q=' + search + '&gbv=1&prmd=ivns&source=lnms&tbm=isch&sa=X', (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      var imgs = data.match(/<img.*?src="(.*?)"/g);
      var result = [];
      imgs.map((el) => {
        result.push(el.split('src="')[1].split('"')[0])
      })
      res.send(result);
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
});


// functions  

const _getProductionCss = () => {
  const items = fs.readdirSync(`./src/frontend/build/static/css`, 'utf8');
  var result;
  for (var i = 0; i < items.length; i++) {
    result = items[i].split('.css')[0];
  }
  return `${result}.css`;
}

const _getProductionJs = () => {
  const items = fs.readdirSync(`./src/frontend/build/static/js`, 'utf8');
  var result;
  for (var i = 0; i < items.length; i++) {
    result = items[i].split('.js')[0];
  }
  return `${result}.js`;
}

const _forcePageRendering = (payload) => {
  console.log(`force rendering => ${payload}.html`)
  var page = JSON.parse(fs.readFileSync(`./src/templates/${payload}.json`, 'utf8'));
  var result = html.createHTML(page, true);
  var options = {
    'indent_size': 2,
    'indent_char': ' ',
    'max_char': 78,
    'brace_style': 'expand',
    'unformatted': ['sub', 'sup', 'b', 'i', 'u']
  }
  result = _addAsyncResourcesLoader(result)
  fs.writeFileSync(`./src/html/${payload}.html`, prettify.prettyPrint(result, options));
}

const _addAsyncResourcesLoader = (html) => {
  const style = `/static/css/${_getProductionCss()}`
  const script = `/static/js/${_getProductionJs()}`
  const scriptLoader = `(function () {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = '${script}';
    var x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s, x);
    var c = document.createElement('link');
    c.type = 'text/css';
    c.rel = 'stylesheet';
    c.href = '${style}';
    c.media = 'all';
    c.type = 'text/css';
    c.async = true;
    var y = document.getElementsByTagName('script')[0];
    y.parentNode.insertBefore(c, y);
  })();`;
  html = html.replace(`</body>`, `<div id="first-loader" style="position:absolute;top:0px;bottom:0px;left:0px;right:0px;background-color:white;z-index:1000000;display: none;justify-content: center;align-items: center;font-family:helvetica; font-size:36px;">loading..</div><script>document.querySelector('#navigation').style.opacity = 0;document.querySelector('#content').style.opacity = 0;document.querySelector('#first-loader').style.display = 'flex';</script><script>${scriptLoader}</script></body>`);
  return html
}

const _cleanBuildIndex = () => {
  const jsBundleName = _getProductionJs()
  const cssBundleName = _getProductionCss()
  var index = fs.readFileSync('./src/frontend/build/index.html', { encoding: 'utf-8' })
  const jsBundleTag = '<script type="text/javascript" src="/static/js/' + jsBundleName + '"></script>'
  const cssBundleTag = '<link href="/static/css/' + cssBundleName + '" rel="stylesheet">'
  index = index.replace(jsBundleTag, '').replace(cssBundleTag, '')
  fs.writeFileSync('./src/frontend/build/index.html', prettify.prettyPrint(index, options))
}

const _updateAllPages = () => {
  const pages = fs.readdirSync(`./src/templates`, 'utf8');
  for (let i in pages) {
    if (pages[i].indexOf('.json') > 0) {
      _forcePageRendering(pages[i].replace('.json', ''))
    }
  }
  fs.writeFileSync('./src/frontend/build/index.html', fs.readFileSync('./src/html/index.html'));
  console.log('_updateAllPages -> done')
}

_updateAllPages()

console.log('NODE_ENV: ' + process.env.NODE_ENV);
serverHTTPS.listen(443);
console.log(`https://${ip}`);
serverHTTP.listen(80);
console.log(`http://${ip}`);