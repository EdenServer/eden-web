
SET @charName = 'Godmode';
SET @itemId = 1;
SET @quantity = 1;
SET @bazaarPrice = 42; -- 0 if it should not be in bazaar


-- Add item
SET @location = 0;
SET @charId = (SELECT charid FROM chars WHERE charname = @charName);
SET @slot = (SELECT IFNULL(max(slot), -1)+1 FROM char_inventory WHERE charId = @charId AND location = @location);
INSERT INTO char_inventory(charid, location, slot, itemId, quantity, bazaar) VALUES(@charId, @location, @slot, @itemId, @quantity, @bazaarPrice);
