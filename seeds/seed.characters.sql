BEGIN;

TRUNCATE
  characters
  RESTART IDENTITY CASCADE;

INSERT INTO characters (characterName, strength, dexterity, constitution, intelligence, charisma, wisdom, class, characterLevel, hitDie, experience, attackValue, savingThrow, slots, miracles, groups, raises, gold, encumbrance, movement, armorClass, initiativeBonus, languages)
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