import crypto from 'crypto';

function generateSecret(length = 64) {
  return crypto.randomBytes(length).toString('hex');
}

const accessSecret = generateSecret(64);
const refreshSecret = generateSecret(64);

console.log('\nGenerated JWT Secrets:\n');
console.log('JWT_ACCESS_SECRET=' + accessSecret);
console.log('JWT_REFRESH_SECRET=' + refreshSecret);
console.log('\nCopy these values to your .env file\n');
console.log('Keep these secrets secure and never commit them to git!\n');

