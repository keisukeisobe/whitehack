CREATE TABLE login (
  login_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  email TEXT NOT NULL
);