import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import 'dotenv/config';
import crypto from 'crypto';

const region = process.env.S3_REGION;
const bucketName = process.env.S3_BUCKETNAME;
const accessKeyId = process.env.S3_ACCESSKEY_ID;
const secretAccessKey = process.env.S3_SERCET_ACCESS_KEY;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  }
});

export async function generateUploadUrl() {
  const rawBytes = crypto.randomBytes(16);
  const imageName = rawBytes.toString('hex');

  const params = ({
    Bucket: bucketName,
    Key: imageName,
  });

  try {
    const command = new PutObjectCommand(params);
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
    return uploadUrl;
  } catch (error) {
    console.error('Error generating upload URL:', error);
    throw error;
  }
}