CREATE TABLE equipment (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  name TEXT NOT NULL,
  armorClass TEXT NOT NULL,
  cost INTEGER NOT NULL,
  weight INTEGER NOT NULL,
  special TEXT,
  description TEXT
);