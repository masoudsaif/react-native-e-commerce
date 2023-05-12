const { ACCESS_KEY, SECRET_ACCESS_KEY } = require("./constants");
const { S3Client } = require("@aws-sdk/client-s3");

const s3Config = {
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: "us-east-1",
};

const s3Client = new S3Client(s3Config);

module.exports = {
  getS3Client: () => s3Client,
};
