const {
  Client
} = require('pg')
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://localhost:5432/guitar-shop',
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : undefined
});

const bcrypt = require('bcrypt');
const {
  createInsertString,
  createValueString,
  createSetString
} = require('./Utils');
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
   `, [`%${username}%`]);
    return rows;
  } catch (error) {
    throw error;
  }
}

// ======================================================
// Create users
async function createUsers({
  username,
  password,
  role,
  image

}) {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
  try {
    const {
      rows: [user]
    } = await client.query(`
    INSERT INTO users(username, password,role, date,image) 
    VALUES($1, $2, $3, NOW(),$4) 
    ON CONFLICT (username) DO NOTHING 
    RETURNING *;

`, [username, hashedPassword, role,image]);
    return user;
  } catch (error) {
    throw error;
  }
};

async function getUser({
  username,
  password,
  newDate
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
async function getUserById(id) {
  try {
    const {
      rows : gotUser
    } = await client.query(`
    SELECT * FROM users
    WHERE id = ${id};
`)
    return gotUser;
  } catch (err) {
    throw err
  }
}

// DELETE USER
async function deleteUserById(id) {
  try {
    const {
      rows
    } = await client.query(`
DELETE FROM users
WHERE id=${id}
RETURNING *
`)
    return rows;
  } catch (err) {
    throw err
  }
}
// All online users
async function getAllActiveUsers() {
  try {
    const {
      rows: activeUsers
    } = await client.query(`
          SELECT * FROM users
          WHERE "active"=true
      `)

    return activeUsers
  } catch (error) {
    throw error
  }
}

// Reset password  
async function resetPassword(id,password) {
  try {
    
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
    const {
      rows: [updated]
    } = await client.query(`
        UPDATE "users"
        SET password=($1)
        WHERE id=($2)
        RETURNING *
    `, [hashedPassword ,id])

    return updated
  } catch (error) {
    throw error
  }

}

// Online user
async function activateUser(id) {
  try {
    const {
      rows: activatedUser
    } = await client.query(`
          UPDATE users
          SET active=true
          WHERE id=${id}
          RETURNING *;
      `)

    return activatedUser
  } catch (error) {
    throw error
  }
}
// Offline user
async function deactivateUser(id) {
  try {
    const {
      rows: deactivatedUser
    } = await client.query(`
    UPDATE users
    SET active=false
    WHERE id=${id}
    RETURNING *;
         `)

    return deactivatedUser
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
  limit,
  offset,
  search
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
      [`%${search}%`, limit, offset]);
    return rows
  } catch (error) {
    throw error;
  }
}
// craete guitars
async function createGuitar({
  model_name,
  description,
  brand_name,
  price,
  rating,
  image_url,
  category
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

      , description, brand_name, price, rating, image_url, category
    ]);
    //  console.log(guitar)
    return guitar;
  } catch (error) {
    throw error;
  };
};

// Delete a specific guitar
async function deleteGuitarById(id) {
  try {
    const {
      rows
    } = await client.query(`
DELETE FROM guitars
WHERE id=${id}
RETURNING *
`)
    return rows;
  } catch (err) {
    throw err
  }
}
// Get guitar by id
async function getGuitarById(id) {
  try {
    const {
      rows: [guitar]
    } = await client.query(`
 SELECT * FROM guitars
 WHERE id = ${id};
`);
    return guitar;
  } catch (error) {
    throw error;
  }
}

// Update guitar 
async function updateGuitar(id, fields) {
  try {
    const setString = createSetString(fields)
    if (setString.length === 0) {
      return
    }

    const {
      rows: [updated]
    } = await client.query(`
        UPDATE guitars
        SET ${ setString }
        WHERE id= ${id}
        RETURNING *
    `, Object.values(fields))

    return updated
  } catch (error) {
    throw error
  }

}

module.exports = {
  client,
  getAllUsers,
  createUsers,
  getUser,
  createGuitar,
  getAllGuitars,
  getGuitarById,
  getUserByUsername,
  getUserQeury,
  deleteUserById,
  deleteGuitarById,
  updateGuitar,
  getAllActiveUsers,
  deactivateUser,
  activateUser,
  getUserById,
  resetPassword,

}