-- Grant all necessary permissions to user
ALTER USER "user" CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE leetbrawl TO "user";

-- Connect to leetbrawl database
\c leetbrawl

-- Grant schema permissions
GRANT ALL ON SCHEMA public TO "user";
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO "user";
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO "user";
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO "user";

-- Make user owner of the schema for future objects
ALTER SCHEMA public OWNER TO "user";