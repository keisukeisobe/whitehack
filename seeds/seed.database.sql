BEGIN;

TRUNCATE
  userchars,
  characters,
  login,
  items,
  equipment,
  weapons
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

INSERT INTO login(username, password, email)
VALUES
  ('kitsune', 'pbkdf2:sha256:150000$OyVhjZMd$6d892625b2b0cd896028c815d7e794ef04cc43a267833fedab9ac470fbcb2f24', 'vng@brandeis.edu'),
  ('keisuke', 'pbkdf2:sha256:150000$XpK9QiuT$967021aeb59d4188378660755c6d4d531a6cde2e5f9d12768102c3b6bb3bcbf7', 'keisuke.isobe.2011@gmail.com');

INSERT INTO userchars(user_id, character_id)
VALUES
  (1, 1);

INSERT INTO items (name, description, cost, weight)
VALUES
  ('Backpack', 'Standard adventuring gear with 30lb capacity', 5, 1),
  ('Cart', 'Horse-drawn cart with 300lb capacity', 60, 500),
  ('Grappling Hook', 'Lets you traverse', 5, 5);

INSERT INTO weapons (name, damageDie, damageBonus, special, range, fireRate, cost, weight, description)
VALUES 
  ('Axe', '1d6', 1, '', 0, 0, 10, 6, 'Typical axe'),
  ('Javelin', '1d6', 0, '1d6-2 damage in melee', 40, 1, 2, 2, '6 pack of throwing javelins'),
  ('Scimitar', '1d6', 0, '+1 AV while riding', 0, 0, 8, 5, 'Curved swords');

INSERT INTO equipment (name, armorClass, weight, cost, special, description)
VALUES
  ('Shield', 1, 10, 5, '', 'Standard shield'),
  ('Studded Leather', 2, 20, 20, '', 'Studded leather armor. Sturdy.'),
  ('Full Plate', 6, 60, 50, '', 'Heavy.');

COMMIT;