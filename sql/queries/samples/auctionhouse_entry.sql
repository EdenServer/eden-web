
SET @sellerName = 'Godmode';
SET @buyerName = 'Godmode';
SET @itemId = 1;
SET @stack = 0; -- 0 if single, otherwise it's a stack
SET @sellPrice = 42;


-- Add auction house entry
SET @seller = (SELECT charid FROM chars WHERE charname = @charName);
SET @date = UNIX_TIMESTAMP()/1000;
SET @sellDate = @date;
INSERT INTO server_auctionhouse(itemid, stack, seller, seller_name, date, buyer_name, sale, sell_date) VALUES(@itemId, @stack, @seller, @sellerName, @date, @buyerName, @sellPrice, @sellDate);
