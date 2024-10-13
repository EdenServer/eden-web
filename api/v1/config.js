module.exports = {
  rules : {
    terms : {
      updated : '5/22/2020',
      list : [
        'You will be watched from time to time by the active/hidden GM team that patrols and responds to reports for cheating.',
        'Like most online games, Eden will collect and store data from you such as IP addresses, MAC addresses, and other unique device identifiers to help curb cheating.',
        'You will follow the server rules listed below. ALL rules may be met with punishment including up to a ban on all Eden content.',
        'You will not engage in any manner to profit from the work of SQUARE ENIX CO., LTD. or the Eden staff. This includes the selling of accounts, gil, or items.',
        'These terms may change at any time. Each time you connect to Eden you are bound to the terms as they are posted here.',
        'You acknowledge that we are not affiliated in any way with SQUARE ENIX CO., LTD.',
        'You acknowledge that SQUARE ENIX CO., LTD. is the owner of all FINAL FANTASY® XI content and images with all rights reserved.',
        'You acknowledge that Eden has no ownership over or affiliation with any of the content, images, registered trademarks or any other rights reserved by SQUARE ENIX CO., LTD.',
      ],
    },
    rules :
        {
          updated : '3/25/2023',
          list :
              [
                'Using a non-Eden bootloader--including using a modified version of the Eden bootloader--is NOT allowed. The bootloader must be downloaded from the official site or #install-support-links channel in our official Discord otherwise there are no guarantees it is official.',
                'If something feels like it is broken, either not like it was on era retail, or a potential exploit, or too overpowered (read: if something seems like it was not intentional from the development team) report it. Knowingly taking advantage of these activities is NOT allowed.',
                'Each player is only allowed to have 2 characters logged in and active, with an additional third character confined to a city and idle. This character may only be used to bazaar or mule items while your other characters are logged in. (This will not be locked down by IP, but it will be actively patrolled.) Tri-boxing 3 or more active characters is NOT allowed.',
                'Claim bots, modifying DATs to claim, any type of targeting using mob ID (such as /target 12345678) or using any other third party tools such as Shorthand or its Windower equivalent to claim is NOT allowed.',
                "Any scripts, bots, or addons that automate actions are NOT allowed. Macros using the /wait or <wait> feature within the game are OK. (Such as /lastsynth macros up to the game's maximum of 6 lines.)",
                "Account sharing is strongly discouraged and may be disallowed in the future. If one or more of your accounts are linked to a player that is caught cheating by either logging into an offending player's account or by that player logging into one of your accounts you will share the same punishment as the cheater--which is 9 out of 10 times a permanent ban.",
                'Not really a rule but be aware that players may be limited in the future to 3 characters. So create new ones at your own risk. It is undecided how additional characters would be handled if we imposed these limits.',
                'Using known bugs (including terrain) or unpatched exploits to your advantage in a way that would not be possible in retail. For example: purposefully crawling on walls to avoid aggro using the current navmesh’s bugs is NOT allowed. (Note: this does not mean people are exploiting because they are standing on walls. It is a normal reaction to be on a wall. But climbing through tight spaces without oils and powders without aggro is obviously a bug and you will be punished for it.)',
                'Testing known or possible exploits on the live server is not allowed unless permission is given from a server administrator first. Like every other rule this includes GMs and developers too.',
                "Holding a monster for the purpose of grieving other players or monopolizing the time it spawns is NOT allowed (note that since determining a player's intent is highly subjective to the GM addressing the ticket, if asked to begin damage by a GM you must start fighting the monster within a reasonable amount of time or you will forfeit the claim). To clarify, reasonable is up to the GM team's discretion, holding to recover from a wipe is allowed, intention to kill with reinforcements on the way isn't holding, and Darters in Dragon's Aery may be held alive 5 minutes from time of claim. Please see Discord and ask a GM for more information if you need it.",
                "Not so much a rule either but if you are aware of any non-era item/NM/recipe/et cetera please report it. And do expect the rewards obtained from it to be removed. We can't find every non-era thing at once but as we find them they will be removed.",
                'Creating characters for the purpose of market manipulation is NOT allowed.',
                'Gardening is only allowed on up to 3 characters. (30 total plants.)',
                'Hacking/exploiting/cheating of any kind including, but not limited to, buying items and selling back for more than you paid for is NOT allowed.',
                'Spamming any public chat is NOT allowed. (Linkshells and tells are the exception as they will only be subject to harassment reports.)',
                'Harassment of any kind including offensive character or linkshell names is NOT allowed.',
                'Character names that depict cheating, could be considered sexually explicit, or any names that could be disallowed on retail are NOT allowed.',
                'Use of, or advertisement of, any cheat program/addon or a non-approved addon/program on Eden or its media is NOT allowed. There will be an allowed list and a non-allowed list. Those not in the approved list are discouraged from use as you may be penalized for using them. Use at your own risk. Those that are similar to a forbidden program are most likely forbidden as well.',
                'GM interaction is limited here but if a GM messages you in game and you are active, respond within a reasonable time. Ignoring a GM is likely to get you jailed as we will think you are afk botting.',
              ],
          violations : [
            {
              rule : 'Using Bots to include Fish Botting and Claim Botting',
              consequence : 'Banned',
            },
            {rule : 'Pos Hacking / Speed Hacking', consequence : 'Banned'},
            {
              rule : 'Harassment',
              consequence : 'Staff Discretion',
            },
            {
              rule : 'Navmesh Abuse',
              consequence : 'Staff Discretion',
            },
            {
              rule : 'Intentional MPK',
              consequence : 'Staff Discretion',
            },
            {
              rule : 'RMT (Buying and Selling)',
              consequence : 'Banned (Buyer and Seller)',
            },
            {
              rule : 'Too many characters online',
              consequence : 'Staff Discretion',
            },
            {
              rule : 'Gardening on more than 3 characters',
              consequence : 'Staff Discretion',
            },
            {
              rule : 'Severe Exploits',
              consequence : 'Banned',
            },
            {
              rule : 'Inappropriate Character Names',
              consequence : 'Staff Discretion',
            },
          ],
        },
    software : {
      updated : '3/25/2023',
      list : [
        {item : 'Combat Parsers', allowed : true},
        {item : 'GearLock', windower : 'Dressup', allowed : true},
        {item : 'TPParty', windower : 'TParty', allowed : true},
        {item : 'WatchEXP', windower : 'Pointwatch', allowed : true},
        {item : 'FPS', windower : 'Config', allowed : true},
        {item : 'Duration', allowed : true},
        {item : 'HideConsole', allowed : true},
        {item : 'Recast', windower : 'Timers', allowed : true},
        {item : 'Timestamp', allowed : true},
        {
          item :
              'Shorthand (only for actions on players -- NOT allowed for claiming)',
          allowed : true,
        },
        {
          item :
              'Renamer (only using the lists we provide -- NOT for custom naming of mobs)',
          allowed : true,
        },
        {
          item :
              'Any modified bootloader or a bootloader downloaded from any source other than edenxi.com',
        },
        {item : 'AuctionHelper / Auction House assistants'},
        {item : 'Multisend / Servo'},
        {
          item :
              'Scripts ran unattended. (If a GM speaks to you and you do not reply within a certain time frame, you may be jailed.)',
        },
        {item : 'Shorthand (when used to claim)'},
        {item : 'LightLuggage'},
        {
          item :
              'Fishing/exp/healing bots or any other bots that automate player actions',
        },
        {
          item :
              'Claim tools or character enhancement tools like flee or warp hacks.',
        },
        {
          item :
              "WatchDog (or anything that gives you abilities you shouldn't have access to)",
        },
      ],
    },
    yells :
        {
          updated : '10/12/2024',
          list :
              [
                'Yell is a global chat and has a 15 minute cooldown period. Shout is limited to a single zone with a large radius and has a 5 minute cooldown period, except in some instanced zones.',
                'Zoning and logging off do not reset these cooldowns. New characters will have yell and shout cooldowns applied during the opening cutscene.',
                'Do not yell or shout profanity, hate messages, or any harassing statements. Violating this rule may result in mutes and/or an account ban depending on severity.',
                'Do not banter back and forth between yourselves in yell (instead use shout for banter). This includes replying in yell to someone who has violated these rules. Banter in yell may result in mutes applied.',
                'Asking a legitimate FFXI question in yell is fine. However, replies to questions should ideally be sent in tell.',
                'Adding on irrelevant banter not related to the purpose of a yell may result in a mute. Example: “WTS pebbles also... player XYZ sux!”',
              ],
        },
    search : {
      updated : '12/14/2020',
      list : [
        'Do not use profanity, hate messages or any harassing statements. These are public-facing channels.'
      ],
    },
    discord : {
      updated : '5/22/2020',
      list : [
        "Please be respectful to each other. Consider this phrase when typing - treat others as you would want to be treated. You wouldn't want someone yelling at you or belittling you so you don't need to do it to another person.",
        'Please keep the cursing at a minimum. Some people prefer not to read constant cursing. We know sometimes a word or two will slip out in the heat of the moment and that is ok but if it becomes a habit we will go to you in private about it.',
        'Do not post nudity of any kind.',
        'Do not give out any personal information in public. If you must send it do so via a PM. There are too many people that will take advantage of this personal information.',
        "Most importantly we want you all to have fun while you use our discord. We know you won't agree with everything we implement and that is ok. We do ask that you follow our rules. If you feel you won't be able to then we kindly thank you for using our Discord and ask you to move on to somewhere else to chat.",
        'Any attempt evading a mute will result in an immediate ban.',
      ],
    },
  },
  links : [
    {
      url : 'https://discord.gg/S3EAWr2Jec',
      image :
          'https://vignette.wikia.nocookie.net/ffxi/images/0/08/Flag.jpg/revision/latest?cb=20060211183144',
      header : 'Eden Discord',
      description :
          'Join us on Discord for technical support, up-to-date announcements, community events, memes, live chat with staff, and more.',
    },
    {
      url : 'https://edenxi.miraheze.org/wiki/Classic_FFXI_community',
      image : 'https://static.miraheze.org/metawiki/3/35/Miraheze_Logo.svg',
      header : 'Eden Wiki',
      description :
          'This is a player-led wiki open for everyone to edit, intended to be specific to Eden\'s era.',
    },
    {
      url : 'https://github.com/EdenServer/community/issues',
      image : 'https://static.ffxiah.com/images/icon/17001.png',
      header : 'Bug Reports',
      description :
          'Eden has bugs too. :( See what issues we have and chime in if you found a bug!',
    },
    {
      url : 'https://github.com/EdenServer/eden-web/issues',
      image : 'https://static.ffxiah.com/images/icon/17005.png',
      header : 'Website Bugs',
      description :
          'In addition to technical bugs, Eden refines rules, information, and connection details occassionally. Chime in if you found an error!',
    },
    {
      url : 'https://ffxiclopedia.wikia.com/wiki/Main_Page',
      image :
          'https://vignette.wikia.nocookie.net/ffxi/images/b/b7/Favicon_Poroggo.png/revision/latest/scale-to-width-down/60?cb=20170308121952',
      header : 'FFXIclopedia',
      description :
          'The OG resource of era. You\'ll want to backdate any page you visit to get era-accurate data.',
    },
    {
      url : 'https://www.bg-wiki.com/',
      image : 'https://static.ffxiah.com/images/icon/15076.png',
      header : 'BG Wikipedia',
      description :
          "Another resource, heavily updated for the modern era. Can be a good place to get information that isn't provided by other sources.",
    },
    {
      url : 'http://campsitarus.blogspot.com/',
      image : 'https://www.bg-wiki.com/images/c/c3/Artemis%27s_Medal_icon.png',
      header : 'Campsitarus',
      description :
          'A great resource on era retail camps. Some camps will not apply as they are WoTG area camps.',
    },
    {
      url : 'https://wiki.ffo.jp/',
      image : 'https://static.ffxiah.com/images/icon/191.png',
      header : 'JP Wiki',
      description :
          'This wiki offers another resource for data from the retail and 2008 eras. You\'ll need some form of translation if you can\'t read Japanese.',
    },
    {
      url : 'http://www.pyogenes.com/ffxi/timer/v2.html',
      image : 'https://static.ffxiah.com/images/icon/3706.png',
      header : 'Pyogenes Timer',
      description :
          "Pyogenes developed a Vana'Diel clock for retail. Eden runs on the same timer.",
    },
    {
      url : 'http://www.ffxidb.com/',
      image : 'http://www.ffxidb.com/public/img/xidb-logo-2.png',
      header : 'FFXIDB',
      description :
          'Common site to track drop rates of items. With things like drop rate changes and TH10 on retail, this data may not always be accurate.',
    },
    {
      url : 'http://ashita.atom0s.com/',
      image : 'https://www.ashitaxi.com/assets/img/ashita.ico',
      header : 'Ashita',
      description :
          'Eden supports Ashita v3 to enhance gameplay, and Ashita v3 comes bundled with the Eden installer. You can find support for Ashita v3-specific things here. v4 can be used with some tech know-how',
    },
    {
      url : 'http://windower.net/',
      image : 'http://windower.net/img/icon.png',
      header : 'Windower',
      description :
          'While we do not offer setup or troubleshooting assistance for Windower, Windower does work on Eden, and player tech support can help get you set up!',
    },
  ],
  install : {
    source1 : 'https://bit.ly/Eden535',
    source2 : 'https://bit.ly/Eden535Backup',
    bootloader :
        'https://github.com/EdenServer/xiloader/releases/latest/download/xiloader.exe',
    discord : 'https://discord.gg/S3EAWr2Jec',
  },
};
