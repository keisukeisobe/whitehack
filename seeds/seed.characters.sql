BEGIN;

TRUNCATE
  characters
  RESTART IDENTITY CASCADE;

INSERT INTO characters (charactername, strength, dexterity, constitution, intelligence, charisma, wisdom, characterclass, characterlevel, hitdie, experience, attackvalue, savingthrow, slots, miracles, groups, raises, gold, encumbrance, movement, armorclass, initiativebonus, languages)
VALUES
  (
    'Valtyra',
    10,
    10,
    10,
    10,
    10,
    10,
    'Strong',
    1,
    1,
    0,
    10,
    7,
    1,
    '',
    '',
    0,
    '',
    0,
    30,
    0,
    0,
    'Common'
  );

COMMIT;