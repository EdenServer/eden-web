
SET @accountName = 'Godmode';
SET @charName = 'Godmode';
SET @email = 'devgodmode@edenxi.com';


-- Create account
SET @accId = (SELECT IFNULL(max(id), 0)+1 FROM accounts);
INSERT INTO accounts (id, login, password, email, timecreate, timelastmodify) VALUES (@accId, @accountName, PASSWORD('password'), @email, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());

-- Create character
SET @charid = (SELECT IFNULL(max(charid), 0)+1 FROM chars);
INSERT INTO chars(charid, accid, charname, pos_zone, nation) VALUES(@charid, @accId, @charname, 0, 0);
INSERT INTO char_look(charid, face, race, size) VALUES(@charId, 0, 0, 0);
INSERT INTO char_stats(charid, title, mjob) VALUES(@charId, 1, 1);

INSERT INTO char_jobs(charid) VALUES(@charId) ON DUPLICATE KEY UPDATE charid = charid;
INSERT INTO char_profile(charid) VALUES(@charId) ON DUPLICATE KEY UPDATE charid = charid;
INSERT INTO char_equip(charid) VALUES(@charId) ON DUPLICATE KEY UPDATE charid = charid;


-- Set as online with an accounts_session
INSERT INTO accounts_sessions(accid, charid, session_key, server_addr, server_port, client_addr) VALUES(@accId, @charId, BINARY(1), 0, 0, 0);
