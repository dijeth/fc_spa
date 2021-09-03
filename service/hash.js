const crypto = require('crypto');
const fs = require('fs');

const hash = async (filename) => new Promise((resolve, reject) => {
  const md5sum = crypto.createHash('md5');
  const stream = fs.ReadStream(filename);

  stream.on('data', (data) => {
    md5sum.update(data);
  });

  stream.on('end', () => {
    const data = md5sum.digest('hex');
    resolve(data);
  });

  stream.on('error', (err) => {
    reject(err);
  });
});

module.exports = {
  hash,
};
