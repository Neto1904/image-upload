CREATE TABLE users (
    id  serial PRIMARY KEY,
    registration INTEGER UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    salt VARCHAR 
)

CREATE TABLE images {
    id  serial PRIMARY KEY,
    path VARCHAR NOT NULL,
    coordinates geometry NOT NULL,
    date DATE NOT NULL,
    id_user INTEGER,
    CONSTRAINT image_fk FOREIGN KEY (id_user)
    REFERENCES users (id)
}