import fs from 'fs';
import path from 'path';

export default {
  port: 1337,
  dbUri: 'mongodb://localhost:27017/ts-project',
  saltWorkFactor: 10,

  privateKey: fs.readFileSync(
    path.join(__dirname, '../keys/private.pem'),
    'utf8'
  ),

  publicKey: fs.readFileSync(
    path.join(__dirname, '../keys/public.pem'),
    'utf8'
  ),
};
