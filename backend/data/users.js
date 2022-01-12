import bcrypt from 'bcryptjs'

const users = [
    {
      name: 'Tausif',
      email: 'tausif@techshop.com',
      //password: 'king143.',
      //Hashing using HashSync with salt 10
      password: bcrypt.hashSync('king143.', 10),
      isAdmin: true
    },
    {
        name: 'Afroz',
        email: 'afroz@techshop.com',
        //password: 'king143.',
        password: bcrypt.hashSync('king143.', 10),
        isAdmin: false
    },
    {
        name: 'ahad',
        email: 'ahad@techshop.com',
        //password: 'king143.',
        password: bcrypt.hashSync('king143.', 10),
        isAdmin: false
    }
  ]
  
  export default users
  