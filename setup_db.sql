-- Create database and user for LeetBrawl
CREATE DATABASE leetbrawl;

-- Create user with password
CREATE USER "user" WITH PASSWORD 'password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE leetbrawl TO "user";

-- Connect to the new database and grant schema privileges
\c leetbrawl
GRANT ALL ON SCHEMA public TO "user";
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO "user";
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO "user";