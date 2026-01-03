import bcrypt from 'bcryptjs';

const myPassword = 'zxcvbnmm';

const hash = bcrypt.hashSync(myPassword, 10);

console.log('\nCopy this hash to your .env.local file:');
console.log(hash);
