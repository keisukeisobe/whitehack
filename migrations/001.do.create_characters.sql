CREATE TABLE characters (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  characterName TEXT NOT NULL,
  strength INTEGER NOT NULL,
  dexterity INTEGER NOT NULL,
  constitution INTEGER NOT NULL,
  intelligence INTEGER NOT NULL,
  charisma INTEGER NOT NULL,
  wisdom INTEGER NOT NULL,
  charcterclass TEXT NOT NULL,
  characterLevel INT,
  hitDie INT,
  experience INT,
  attackValue INT,
  savingThrow INT,
  slots INT,
  miracles TEXT,
  groups TEXT,
  raises INT,
  gold TEXT,
  encumbrance INT NOT NULL DEFAULT 0,
  movement INT NOT NULL DEFAULT 0,
  armorClass INT NOT NULL DEFAULT 0,
  initiativeBonus INT NOT NULL DEFAULT 0,
  languages TEXT
);