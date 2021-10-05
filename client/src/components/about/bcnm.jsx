import React from 'react';
import { Card } from 'semantic-ui-react';
import { block10, block11, block12, block13, block14 } from './text';

export default () => (
  <div>
    <h4>Suggested Tools</h4>
    <div className="ui cards">
      <Card>
        <div className="content">
          <div className="header">Visual Studio Code</div>
          <div className="meta">Text Editor</div>
          <div className="description">
            This is not the same program as Visual Studio Community. Although Visual Studio Community is also a text editor, I like Code the most. You'll likely
            spend most of your time coding using a text editor so pick one you are comfortable with.
          </div>
        </div>
        <div className="extra content">
          <div className="ui two buttons">
            <a className="ui blue button" href="https://code.visualstudio.com/" rel="noopener noreferrer" target="_blank">
              Download
            </a>
          </div>
        </div>
      </Card>
      <Card>
        <div className="content">
          <div className="header">Heidi SQL</div>
          <div className="meta">SQL viewer/editor</div>
          <div className="description">While you can use the mysql executable to run SQL queries a GUI is much easier to navigate.</div>
        </div>
        <div className="extra content">
          <div className="ui two buttons">
            <a className="ui blue button" href="https://www.heidisql.com/download.php" rel="noopener noreferrer" target="_blank">
              Download
            </a>
          </div>
        </div>
      </Card>
    </div>
    <h4>Files</h4>
    <p>
      Here are a list of files that you'll need to review/edit in order to create a BCNM. I'll break down what needs to be done for each file section by section
      below. These files are listed by their relative path.
    </p>
    <p>
      <i>
        Note: These are probably not the only files you'll need to review/edit. You'll also probably need to edit mobs, magic, skills, et. cetera. Editing mobs,
        magic, skills, and so on is beyond the scope of this tutorial. For an example I will be reviewing the BCNM "Under Observation".
      </i>
    </p>
    <ul>
      <li>scripts/globals/bcnm.lua</li>
      <li>
        scripts/zones/{`{zonename}`}/bcnms/{'{bcnmname'}
      </li>
      <li>sql/mob_spawn_points.sql</li>
      <li>sql/bcnm_battlefield.sql</li>
      <li>sql/bcnm_info.sql</li>
      <li>sql/bcnm_loot.sql</li>
      <li>sql/bcnm_treasure_chests.sql</li>
    </ul>

    <br />
    <h5>scripts/globals/bcnm.lua</h5>
    <p>
      In this file you'll just need to make sure that your BCNM exists and it's connected to the right zone and orb ID. On line 13 you'll see an object called
      itemid_bcnmid_map. You're going to scroll down to the see the zone you need listed in the comment on the right and then you're going to make sure that
      your BCNMID and ORBID are added there. For Under Observation, we will look at the following line:
    </p>
    <pre className="gm_code-block">{block10}</pre>
    <p>
      The zone id is 139, the orb id is 1131, and the bcnm id is 12. These are all provided here. However if we wanted to add the BCNM Tails of Woe we would
      change this line to:
    </p>
    <pre className="gm_code-block">{block11}</pre>
    <p>
      Tails of Woe also uses orb id 1131 but its bcnm id is 1. To find an orb id you can query SQL for the name in the item_basic table. To find a bcnm id you
      can query SQL for the name in the bcnm_info table.
    </p>

    <br />
    <h5>scripts/zones/Horlais_Peak/bcnms/under_observation.lua</h5>
    <p>
      If this file doesn't exist you can pretty much copy and paste it from another file in the same zone. Just make sure to change the details in the top. If
      it does exist, then you're in luck! You probably won't need to edit it.
    </p>

    <br />
    <h5>sql/mob_spawn_points.sql</h5>
    <p>
      More than likely the mobs here are already in the correct position. However you'll need to verify that they have the right spawn points. In addition, if
      they are not behaving like they should, are not the correct mob or model, or are using the wrong skills or magic you'll probably need to edit the
      appropriate files/tables. (Editing mobs is beyond this tutorial.)
    </p>

    <br />
    <h5>sql/bcnm_battlefield.sql</h5>
    <p>This table includes monsters that spawn inside the BCNM. All of these columns will need to be verified.</p>
    <ul>
      <li>bcnmId: This is the id you've found in bcnm_info</li>
      <li>battlefieldNumber: Usually there is 1, 2, and 3. Make sure not to assign the same monsterId to more than one battlefield.</li>
      <li>monsterId: You can look up the monster ids in mob_spawn_points.</li>
      <li>
        conditions: This one is a bit trickier. This is the condition for the monster to spawn. It's an integer that we refer to as a mask. 1 means it's spawned
        when you enter the BCNM and 2 means it's required to win. Usually this column will be 3.
      </li>
    </ul>

    <br />
    <h5>sql/bcnm_info.sql</h5>
    <p>This is the main table where you're going to get info of what you need for your code and other tables. The important rows to take note of are:</p>
    <ul>
      <li>bcnmId: This is used to relate all of the other bcnm tables plus it will be important to add to the bcnm.lua</li>
      <li>
        name: This is what you need to make sure your scripts/zones/
        {`{zonename}`}/bcnms/{`{bcnmname}`} script is named if it isn't already included.
      </li>
      <li>fastestName, fastestTime: These are not needed to edit for BCNMs. Uou can disregard these columns.</li>
      <li>levelCap: Self-explainatory. This is the level cap of the BCNM. If there is no cap put 0 here.</li>
      <li>partySize: Self-explanatory. This is the maximum number of players that can enter the BCNM.</li>
      <li>lootDropId: This is the id of the loot rows in bcnm_loot</li>
      <li>rules: It is also a mask. You can view these masks in the BCRULES enum in battlefield.h but typically this number should be 15.</li>
      <li>isMission: Just make sure this is set as 0 for consistency for orb BCNMs</li>
    </ul>

    <br />
    <h5>sql/bcnm_loot.sql</h5>
    <p>
      BCNMs contain treasure! In order for it to drop when you open the chest you need to make sure that there is something in this table. Under bcnm_info
      you'll see the column "lootDropId" You will use that to query bcnm_loot. In our example for Under Observation the lootDropId is 16. So we would query like
      this to validate the treasure is correct. "SELECT * FROM bcnm_loot WHERE lootdropid = 16;"
    </p>
    <p>
      You can have a group of items that only drops 1 item per group. This is identified by lootGroupId. The rolls column determines the likelyhood of getting
      the drop within that group. Max combined value is 1000. You'll review/edit/add this information to the bcnm_loot table.
      <br />
      <br />
      Example 1: A group that should drop either a flowerpot or an arcane 100% of the time with equal chance to drop both.
    </p>
    <pre className="gm_code-block">{block12}</pre>
    <p>Example 2: A group that should drop a item 30% of the time with equal chance for all items to drop.</p>
    <pre className="gm_code-block">{block13}</pre>
    <p>You'd also need to change the spawn points in npc_list for these npcs.</p>

    <br />
    <h5>sql/bcnm_treasure_chests.sql</h5>
    <p>
      Each BCNM needs a treasure chest for each instance of the battlefield. Typically there are three instances per battlefield area. To find the BCNM chests
      for Under Observation you can run this query "SELECT * FROM bcnm_treasure_chests WHERE bcnmid = 12;" You'll notice that it has an npcid. This id is found
      in the table npc_list. You want to use a treasure chest that no other bcnm uses. If you were to add Tails of Woe here then you would add the following
      lines in the bcnm_treasure_chests.sql file. You can also run this in your SQL viewer of choice.
    </p>
    <pre className="gm_code-block">{block14}</pre>
    <p>You'd also need to change the spawn points in npc_list for these npcs.</p>
  </div>
);
