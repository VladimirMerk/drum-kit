'use strict';

const fs = require('fs');
const path = require('path');
const source = path.join(__dirname, './../static/samples/');
const target = path.join(__dirname, './../dist/sounds.json');
const files = fs.readdirSync(source);

const resultsData = []

for (let filename of files) {
  filename = path.parse(filename)
  switch (filename.ext) {
    case '.wav':
    case '.mp3':
      const absolutePath = path.join(source, filename.base)
      resultsData.push(fileToBase64(absolutePath))
      break;
  }
}

Promise.all(resultsData).then(result => {
  const saveData = {}
  for (let pair of result) {
    pair[0] = path.parse(pair[0]).name.toLowerCase()
    console.log(pair[0])
    saveData[pair[0]] = pair[1]
  }

  fs.writeFile(target, JSON.stringify(saveData), function(err) {
      if(err) {
          return console.error(err);
      }
      console.log(`The ${target} was saved!`);
  });
});

function fileToBase64(path) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path, 'base64', function(err, contents) {
      if (err) {
        reject(err);
      } else {
        resolve([
          path,
          contents
        ]);
      }
    });
  });
}
