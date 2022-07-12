const {
  Client
} = require('pg')
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@postgres:5432/guitar-shop'
  , ssl: process.env.NODE_ENV === 'production' ? {
      rejectUnauthorized: false
  } : undefined
});
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;
// get All users
async function getAllUsers() {
  try {
      const {
          rows
      } = await client.query(`
      SELECT * FROM users;
  `);
      return rows;
  } catch (error) {
      throw error;
  }
}

async function getUserQeury(username) {
  try {
      const {
          rows 
      } = await client.query(`
      SELECT * FROM users WHERE username ILIKE $1;
   `,[`%${username}%`]);
      return rows;
     } catch (error) {
       throw error;
  }
}
// =========================== Admin stuff ===========================
// Create admin
async function createAdmin({
   username
  ,password
}) {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
  const adminRole = "admin"
  try {
      const {
          rows: [admin]
      } = await client.query(`
    INSERT INTO admin(username, password,role) 
    VALUES($1, $2, $3) 
    ON CONFLICT (username) DO NOTHING 
    RETURNING *;

`, [username, hashedPassword,adminRole]);
      return admin;
  } catch (error) {
      throw error;
  }
}
//? get all admins 
async function getAdmins() {
  try {
      const {
          rows
      } = await client.query(`
     SELECT * FROM admin;
  `);
      return rows;
  } catch (error) {
      throw error;
  }
}
//? get admin username and password
async function getAdminUsernameAndPassword({
  username
  , password
}) {
  if (!username || !password) {
      return
  }
  try {
      const admin = await getAdminByUsername(username)
      if (!admin) {
          return
      }
      const hashedPassword = admin.password
      const passwordsMatch = await bcrypt.compare(password, hashedPassword)
      if (!passwordsMatch) {
          return
      }
      delete admin.password
      return admin
  } catch (error) {
      throw error
  }
}
//? get admin username
async function getAdminByUsername(userName) {
  try {
      const {
          rows
      } = await client.query(`
        SELECT *
        FROM admin
        WHERE username = $1;
    `, [userName])
      if (!rows || !rows.length) return null
      const [admin] = rows
      return admin
  } catch (error) {
      throw error
  }
}
// ======================================================
// Create users
async function createUsers({
   username
  ,password,
   role
}) {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
  try {
      const {
          rows: [user]
    } = await client.query(`
    INSERT INTO users(username, password,role) 
    VALUES($1, $2, $3) 
    ON CONFLICT (username) DO NOTHING 
    RETURNING *;

`, [username, hashedPassword, role]);
      return user;
  } catch (error) {
      throw error;
  }
}
async function getUser({
  username
 ,password
}) {
  if (!username || !password) {
      return
  }
  try {
      const user = await getUserByUsername(username)
      if (!user) {
          return
      }
      const hashedPassword = user.password
      const passwordsMatch = await bcrypt.compare(password, hashedPassword)
      if (!passwordsMatch) {
          return
      }
      delete user.password
      return user
  } catch (error) {
      throw error
  }
}
async function getUserByUsername(userName) {
  // first get the user
  try {
      const {
          rows
      } = await client.query(`
        SELECT *
        FROM users
        WHERE username = $1;
    `, [userName])
      if (!rows || !rows.length) return null
      const [user] = rows
      return user
  } catch (error) {
      throw error
  }
}
// guiatrs LIMIT AND OFFSET
async function getAllGuitars({
   limit
  ,offset
  ,search
}) {
  try {
      const {
          rows
      } = await client.query(`
  SELECT *
  FROM "guitars"
  WHERE brand_name ILIKE $1
  ORDER BY "guitars"."id"
  LIMIT  $2
  OFFSET $3;
 
  `,
   [`%${search}%`,limit, offset]);
      return rows
  } catch (error) {
      throw error;
  }
}
// craete guitars
async function createGuitar({
  model_name
  , description
  , brand_name
  , price
  , rating
  , image_url
  , category
}) {
  try {
      const {
          rows: [guitar]
      } = await client.query(`
        INSERT INTO guitars(model_name,description,brand_name, price, rating, image_url,category)
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING *
    `, [
    model_name

          , description
          , brand_name
          , price
          , rating
          , image_url
          , category
  ]);
      //  console.log(guitar)
      return guitar;
  } catch (error) {
      throw error;
  };
};
// Get guitar by id
async function getGuitarById(id) {
  try {
      const {
          rows: [guitar]
      } = await client.query(`
 SELECT * FROM guitars
 WHERE id = ${id};
`);
      if (!guitar) {
          throw error('Id doesnt exsit')
      };
      return guitar
  } catch (error) {
      throw error;
  }
}
module.exports = {
  client
  , getAllUsers
  , createUsers
  , getUser
  , createGuitar
  , getAllGuitars
  , getGuitarById
  , getUserByUsername
  , createAdmin
  , getAdmins
  , getAdminByUsername
  , getAdminUsernameAndPassword,
  getUserQeury
}