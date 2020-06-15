BEGIN;

TRUNCATE
  items,
  weapons,
  equipment
  RESTART IDENTITY CASCADE;

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