--? Admin
--? guitars
--? users
--? LINIT OFFSET
--? guiatr id, details...

-- Testing table
--   id: 24
--   model_name: "Stratocaster"
--   description: "Instantly, totally familiar..."
--   price: "1600.00"
--   rating: 5
--   image_url: "image.png"
SELECT *
FROM "Booking" JOIN "User" ON "User"."id"="Booking"."renter"


CREATE TABLE orders
(
    "id" SERIAL PRIMARY KEY,
    "buyerId" INTEGER REFERENCES users(id),
    "payment" VARCHAR(255),
    "shippingLoc" TEXT,
    "orderStatus" status DEFAULT 'CART'
);
-- Join Table cart and check out
SELECT *
FROM guitars
    JOIN cart_item ON guitars.id = cart_item.guitar_id
    JOIN cart ON  cart.id = cart_item.cart_id
    JOIN users ON users.id = cart.user_id;

    