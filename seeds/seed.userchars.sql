BEGIN;

TRUNCATE
  userchars
  RESTART IDENTITY CASCADE;

INSERT INTO userchars(user_id, character_id)
VALUES
  (1, 1);

COMMIT;