const AWS = require('aws-sdk');
const sharp = require('sharp');

const s3 = new AWS.S3();

exports.handler = async (event, context, callback) => {
  const Bucket = event.Records[0].s3.bucket.name; // react-twitter
  const Key = decodeURIComponent(event.Records[0].s3.object.key); // decode 한글 깨지는거 방지
  console.log(Bucket, Key);
  const filename = Key.split('/')[Key.split('/').length - 1];
  const ext = Key.split('.')[Key.split('.').length - 1].toLowerCase(); // PNG대문자 => png로바꿔준다
  const requiredFormat = ext === 'jpg' ? 'jpeg' : ext;
  console.log('filename', filename, 'ext', ext);
  try {
    const s3Object = await s3.getObject({ Bucket, Key }).promise();
    console.log('original', s3Object.Body.length); // body에 이미지들 저장되어있다
    const resizedImage = await sharp(s3Object.Body)
      .resize(400, 400, { fit: 'inside'})
      .toFormat(requiredFormat)
      .toBuffer();
    await s3.putObject({
      Bucket,
      Key: `thumb/${filename}`,
      Body: resizedImage,
    }).promise();
    console.log('put', resizedImage.length);
    return callback(null, `thumb/${filename}`);
  } catch (err) {
    console.error(err);
    return callback(err);
  }
}