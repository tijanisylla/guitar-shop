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
SELECT guitars.*, cart_item.quantity, round((guitars.price * cart_item.quantity)::numeric, 2) as subtotal from users
      join cart on users.id = cart.user_id
      join cart_item on cart.id = cart_item.cart_id
      join guitars on guitars.id = cart_item.guitar_id
      where users.id = 2 --($1) placeholder.
