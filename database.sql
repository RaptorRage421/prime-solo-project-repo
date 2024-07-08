-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- Create the users table
CREATE TABLE IF NOT EXISTS "user" (
    "id" SERIAL PRIMARY KEY UNIQUE,
    "username" VARCHAR(35) UNIQUE NOT NULL,
    "password" VARCHAR(200) NOT NULL,
    "role" INTEGER NOT NULL,
    "first_name" VARCHAR(50),
    "last_name" VARCHAR(50),
    "stage_name" VARCHAR(100),
    "email" VARCHAR(200) NOT NULL,
    "phone_num" VARCHAR(15) NOT NULL,
    "avatar_image" VARCHAR(150),
    "years_active" INTEGER,
    "bio" TEXT,
    "link" VARCHAR(255)
);

-- Create the events table
CREATE TABLE IF NOT EXISTS "events" (
    "id" SERIAL PRIMARY KEY UNIQUE,
    "user_id" INTEGER REFERENCES "user"("id") ON DELETE CASCADE,
    "event_name" VARCHAR(255) NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "date" TIMESTAMPTZ NOT NULL,
    "start_time" TIME NOT NULL,
    "end_time" TIME NOT NULL
);

-- Create the genres table
CREATE TABLE IF NOT EXISTS "genres" (
    "id" SERIAL PRIMARY KEY UNIQUE,
    "genre_name" VARCHAR(50) UNIQUE NOT NULL
);

-- Create the dj_genre table
CREATE TABLE IF NOT EXISTS "dj_genre" (
    "id" SERIAL PRIMARY KEY UNIQUE,
    "genre_id" INTEGER REFERENCES "genres"("id") ON DELETE CASCADE,
    "user_id" INTEGER REFERENCES "user"("id") ON DELETE CASCADE
);

-- Create the bookings table
CREATE TABLE IF NOT EXISTS "bookings" (
    "id" SERIAL PRIMARY KEY UNIQUE,
    "event_id" INTEGER REFERENCES "events"("id") ON DELETE CASCADE,
    "user_id" INTEGER REFERENCES "user"("id") ON DELETE CASCADE,
    "status" VARCHAR(50) NOT NULL
);

-- Create the events_genres table
CREATE TABLE IF NOT EXISTS "events_genres" (
    "id" SERIAL PRIMARY KEY UNIQUE,
    "event_id" INTEGER REFERENCES "events"("id") ON DELETE CASCADE,
    "genre_id" INTEGER REFERENCES "genres"("id") ON DELETE CASCADE
);

-- Create the photo_gallery table
CREATE TABLE IF NOT EXISTS "photo_gallery" (
    "id" SERIAL PRIMARY KEY UNIQUE,
    "user_id" INTEGER REFERENCES "user"("id") ON DELETE CASCADE,
    "photo_url" VARCHAR NOT NULL
);
