export const block1 = `
cd %USERPROFILE%\\Desktop
mkdir edendsp
cd edendsp
git init
git checkout -b master
git remote add --track master origin https://github.com/DarkstarProject/darkstar.git
git pull origin master
git reset --hard 8f1bf33c63007c68eccc24925c893fe8540981ff
cd sql
"C:\\Program Files\\MySQL\\MySQL Server 5.7\\bin\\mysqladmin" -h localhost -u root -proot DROP dspdb -f
"C:\\Program Files\\MySQL\\MySQL Server 5.7\\bin\\mysqladmin" -h localhost -u root -proot CREATE dspdb -f
FOR %%X IN (*.sql) DO ECHO Importing %%X & "C:\\Program Files\\MySQL\\MySQL Server 5.7\\bin\\mysql" dspdb -h localhost -u root -proot -f < %%X
"C:\\Program Files\\MySQL\\MySQL Server 5.7\\bin\\mysql" dspdb -h localhost -u root -proot -f -e "INSERT INTO accounts (\`id\`,\`login\`,\`password\`) VALUES (1,'dev',PASSWORD('dev'));"
"C:\\Program Files\\MySQL\\MySQL Server 5.7\\bin\\mysql" dspdb -h localhost -u root -proot -f -e "INSERT INTO chars(charid,accid,charname,pos_zone,nation,gmlevel) VALUES(1,1,'Developer',139,0,5);"
"C:\\Program Files\\MySQL\\MySQL Server 5.7\\bin\\mysql" dspdb -h localhost -u root -proot -f -e "INSERT INTO char_look(charid,face,race,size) VALUES(1,1,1,1);"
"C:\\Program Files\\MySQL\\MySQL Server 5.7\\bin\\mysql" dspdb -h localhost -u root -proot -f -e "INSERT INTO char_stats(charid,mjob,mlvl,sjob,slvl) VALUES(1,4,75,3,37);"
"C:\\Program Files\\MySQL\\MySQL Server 5.7\\bin\\mysql" dspdb -h localhost -u root -proot -f -e "UPDATE char_jobs SET blm = 75, whm = 37 WHERE charid = 1;"
`;

export const block10 = `139, {1177, 4, 1552, 10, 1553, 11, 1131, 12, 1175, 15, 1180, 17}, -- Horlais Peak`;
export const block11 = `139, {1131, 1, 1177, 4, 1552, 10, 1553, 11, 1131, 12, 1175, 15, 1180, 17}, -- Horlais Peak`;
export const block12 = `
INSERT INTO \`bcnm_loot\` VALUES ('300','152','500','0'); -- Flowerpot
INSERT INTO \`bcnm_loot\` VALUES ('300','221','500','0'); -- Arcane Flowerpot
`;
export const block13 = `
INSERT INTO \`bcnm_loot\` VALUES ('300','1525','100','0'); -- Adamantoise Egg
INSERT INTO \`bcnm_loot\` VALUES ('300','1526','100','0'); -- Wyrm Beard
INSERT INTO \`bcnm_loot\` VALUES ('300','1527','100','0'); -- Behemoth Tongue
`;
export const block14 = `
INSERT INTO \`bcnm_treasure_chests\` VALUES ('1', '1', '17346702');
INSERT INTO \`bcnm_treasure_chests\` VALUES ('1', '2', '17346709');
INSERT INTO \`bcnm_treasure_chests\` VALUES ('1', '3', '17346716');
`;
