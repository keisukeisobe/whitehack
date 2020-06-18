BEGIN;

TRUNCATE
  login
  RESTART IDENTITY CASCADE;

INSERT INTO login(username, password, email)
VALUES
  ('kitsune', 'pbkdf2:sha256:150000$OyVhjZMd$6d892625b2b0cd896028c815d7e794ef04cc43a267833fedab9ac470fbcb2f24', 'vng@brandeis.edu'),
  ('keisuke', 'pbkdf2:sha256:150000$XpK9QiuT$967021aeb59d4188378660755c6d4d531a6cde2e5f9d12768102c3b6bb3bcbf7', 'keisuke.isobe.2011@gmail.com');

COMMIT;