import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import InfoDisplay from './InfoDisplay';
import { Container, Row, Col } from 'react-bootstrap';
import './style.css';

const Rules = ({ list }) => {
  const { terms, rules, disallowed, allowed, yells, discord } = list;

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <InfoDisplay title="Terms and Conditions">
            <ol>
              {terms.map((t, i) => (
                <li key={`term_${i}`}> {t} </li>
              ))}
            </ol>
            <p> </p>
            <small>5/22/20</small>
            <p> </p>
          </InfoDisplay>
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <InfoDisplay title="Formal Rules">
            <Card.Text>
                  Listed here is a list of formal rules.It will be expanded upon
              and modified in the future so please stay as current as
              realistically possible with them.If you see someone breaking the
              rules,{' '}
              <b>
                <u>please do not report them in public forums like Discord </u>
              </b>{' '}
              .Either let them know they should stop, or call a GM using the in
              game Help Desk.Staff takes these reports seriously and we follow
              up on each one, but we do not want anybody shamed publicly for
              things they are simply suspected of.Once staff concludes if they
              are cheating or not, we will take appropriate action.
            </Card.Text>
            <Card.Text>
              Regarding behavior: we don & apos; t have an all inclusive code of
              conduct manual for you to read so use common sense.If you are
              doing something that would have gotten you banned or in trouble on
              retail, it is more than likely against the rules here too.If you
              are doing inappropriate things that you wouldn & apos; t do to
              your friends--I would think twice about that too.Finally, if a GM
              asks you to stop a behavior--saying & quot; it isn & apos; t in
              the rules & quot; is not a valid excuse for ignoring the GM.
            </Card.Text>
            <Card.Text>
              We give our GMs the responsibility to uphold rules in the essence
              of fair play as well as to ensure that other & apos; s play
              experience is not effected negatively, not all rules will be
              listed as some must be handled on a case by case basis, Our GM
              staff upholds communication between themselves in order to ensure
              a consistency in policy and has measures to ensure that this does
              not get abused,{' '}
              <b>
                ALL GM requests must be upheld and if something is found to be
                wrong with a certain request it will be dealt with accordingly.
                In the event you feel a GM & apos; s judgement was off you may
                contact a council member via webform on the website tools
              </b>
            </Card.Text>
            <Card.Text>
              {' '}
              <br></br>
              <br></br>
              <ul>
                {' '}
                <b> 1.)</b>Using a non-Eden bootloader--including using a
                modified version of the Eden bootloader--is NOT allowed.The
                bootloader must be downloaded from the official site or &#35;
                annoucements channel in our official Discord otherwise there are
                no guarantees it is official.
              </ul>
              <ul>
                {' '}
                <b> 2.)</b>Until a technical solution is implemented, no more
                than 8 monsters may be intentionally gathered to kill at the
                same time.
              </ul>
              <ul>
                {' '}
                <b> 3.)</b>If something feels like it is broken, either not like
                it was on era retail or a potential exploit or too overpowered.
                (read: if something seems like it was not intentional from the
                development team) report it.Knowingly taking advantage of these
                activities is NOT allowed.
              </ul>
              <ul>
                {' '}
                <b> 4.)</b>Each player is only allowed to have 2 characters
                logged in and active, with an additional third character
                confined to a city and idle.This character may only be used to
                bazaar or mule items while your other characters are logged in.
                (This will not be locked down by IP, but it will be actively
                patrolled.) Tri - boxing 3 or more active characters is NOT
                allowed.
              </ul>
              <ul>
                {' '}
                <b> 5.)</b>Claim bots, modifying dats to claim, any type of
                targeting using mob id(such as / target 12345678) or using any
                other third party tools such as Shorthand or its Windower
                equivalent to claim is NOT allowed.
              </ul>
              <ul>
                {' '}
                <b> 6.)</b>Any scripts, bots, or addons that automate actions
                are NOT allowed.Macros using the / wait or & lt; wait & gt;
                feature within the game are OK. (Such as / lastsynth macros up
                to the game's maximum of 6 lines.)
              </ul>
              <ul>
                {' '}
                <b> 7.) </b>Account sharing is strongly discouraged and may be
                disallowed in the future.If one or more of your accounts are
                linked to a player that is caught cheating by either logging
                into an offending player's account or by that player logging
                into one of your accounts you will share the same punishment as
                the cheater--which is 9 out of 10 times a permanent ban.
              </ul>
              <ul>
                {' '}
                <b> 8.)</b>Not really a rule but be aware that players may be
                limited in the future to 3 characters.So create new ones at your
                own risk.It is undecided how additional characters would be
                handled if we imposed these limits.
              </ul>
              <ul>
                {' '}
                <b> 9.)</b>Using known bugs (including terrain) or unpatched
                exploits to your advantage in a way that would not be possible
                in retail.For example: purposefully crawling on walls to avoid
                aggro using the current navmesh’s bugs is NOT allowed. (Note:
                this does not mean people are exploiting because they are
                standing on walls.It is a normal reaction to be on a wall.But
                climbing through tight spaces without oils and powders without
                aggro is obviously a bug and you will be banned for it.
              </ul>
              <ul>
                {' '}
                <b> 10.)</b>Testing known or possible exploits on the live
                server is not allowed unless permission is given from Godmode
                first. Like every other rule this includes GMs and developers
                too.
              </ul>
              <ul>
                {' '}
                <b> 11.)</b>Holding a monster for the purpose of grieving other
                players or monopolizing the time it spawns is NOT allowed(note
                that since determining a player's intent is highly subjective to
                the GM addressing the ticket, if asked to begin damage by a GM
                you must start fighting the monster within a reasonable amount
                of time or you will forfeit the claim)
                <i>
                  {' '}
                  <p> "Reasonable" is up to the GM team's discretion.</p>
                  <p> Holding to recover from a wipe is allowed.</p>
                </i>
              </ul>
              <ul>
                {' '}
                <b> 12.)</b>Darters in Dragon's Aery may be held alive 5 minutes
                from time of claim.Period.Please see #announcements or ask a GM
                for more information if you need it.
                <p> </p> Intention to kill with reinforcements on the way isn't
                holding.",
              </ul>
              <ul>
                {' '}
                <b> 13.)</b>Not so much a rule either but if you are aware of
                any non - era item / NM / recipe / et cetera please report
                it.And do expect the rewards obtained from it to be removed.I
                can't find every non - era thing at once but as I find them I
                will be removing them.
              </ul>
              <ul>
                {' '}
                <b> 14.)</b>Creating characters for the purpose of market
                manipulation is NOT allowed.
              </ul>
              <ul>
                {' '}
                <b> 15.)</b>Gardening is only allowed on up to 3 characters. (30
                total plants.)
              </ul>
              <ul>
                {' '}
                <b> 16.)</b>Hacking/exploiting / cheating of any kind including
                but not limited to buying items and selling back for more than
                you paid for is NOT allowed.
              </ul>
              <ul>
                {' '}
                <b> 17.)</b>Spamming any public chat. (Linkshells and tells are
                the exception as they will only be subject to harassment
                reports.)
              </ul>
              <ul>
                {' '}
                <b> 18.)</b>Harassment of any kind including offensive character
                or linkshell names is NOT allowed.',
              </ul>
              <ul>
                {' '}
                <b> 19.)</b>Character names that depict cheating, could be
                considered sexually explicit, or any names that could be
                disallowed on retail are NOT allowed.
              </ul>
              <ul>
                {' '}
                <b> 20.)</b>Use of or advertisement of any cheat program/addon
                or a non - approved addon / program on Eden or its media.There
                will be an allowed list and a non - allowed list.Those not in
                the approved list are discouraged from use as you may be
                penalized for using them.Use at your own risk.Those that are
                similar to a forbidden program are most likely forbidden as
                well.
              </ul>
              <ul>
                {' '}
                GM interaction is limited here but if a GM messages you in game
                and you are active, respond within a reasonable time.Ignoring a
                GM is likely to get you jailed as we will likely think you are
                afk botting.
              </ul>{' '}
            </Card.Text>
            <ol>
              {rules.map((t, i) => (
                <li key={`term_${i}`}> {t} </li>
              ))}
            </ol>
            <p> </p>
            <small>5/22/20</small>
            <p> </p>
          </InfoDisplay>
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <InfoDisplay title="Rule Violation Punishments">
            <Card.Text>
              <p></p>
              Punishment List
              <p> </p>
              <li>
                {' '}
                Using Bots to include Fish Botting and Claim Botting = Banned
              </li>
              <li> Pos Hacking / Speed Hacking = Banned </li>
              <li>
                {' '}
                Harassment = 2 Week Suspension > 1 Month Suspension > > 3 Month
                Suspension > Banned
              </li>
              <li>
                {' '}
                Bootloader Violations = Warning > 1 Month Suspension > 3 Month
                Suspension > Banned
              </li>
              <li>
                {' '}
                Navmesh Abuse = Move them off the wall > Repeated Abuse(3 times)
                = Warning > 2 Week Suspension > 1 Month Suspension
              </li>
              <li>
                {' '}
                MPK = 2 Week Suspension > 1 Month Suspension > 3 Month
                Suspension > Banned(If it falls under the lines of harassment
                due to the dialogue exchanged between players follow Harassment
                punishment lines)
              </li>
              <li> RMT = Banned(Seller and Buyer) </li>
              <li>
                {' '}
                Too many characters online = Warning > 2 Week Suspension > 2
                Month Suspension > Banned
              </li>
              <li>
                {' '}
                Holding Mobs = 2 Week Suspension > 1 Month Suspension > 3 Month
                Suspension > Banned(This includes EXP mobs, mobs that others are
                farming and NMs.TBD by the GM handling the ticket)
              </li>
              <li>
                {' '}
                Market Manipulation with Alts = Warning > 2 Month Suspension >
                Banned
              </li>
              <li>
                {' '}
                Gardening Violations = Warning > 1 Month Suspension > 3 Month
                Suspension > Banned(Also empty out all their pots)
              </li>
              <li>
                {' '}
                Exploits that are similar to Duping or reselling exploits =
                Banned
              </li>
              <li>
                {' '}
                Character Names that break the rule = Warning with forced name
                change(If they change it to something inappropriate again, we
                will assign them a random name)
              </li>
              <li>
                {' '}
                Holding Darters with no intention to kill: Warning > 2 Week > 1
                Month > 3 Month{' '}
              </li>
              <li>
                {' '}
                Repeated false reports regarding darters: Warning > 1 Week > 2
                Week > 1 Month
              </li>
              <p> </p> <p> </p>
              <p> </p>
            </Card.Text>
            <small>5/22/20</small>
          </InfoDisplay>
        </Col>
      </Row>

      <Row className="my-3">
        <Col>
          <InfoDisplay title="Modification Rules:">
            <Card.Text>
              <p>Allowed plugins and other third party softwares.</p>
              <p> </p>
              <table class="modrulestable">
                <tr class="modrulestable">
                  <p>
                    <br></br>
                    <center>
                      <strong>Allowed / Disallowed Ashita Plugins </strong>
                    </center>
                  </p>

                  <td class="modrulestable">
                    <center>
                      <strong>Allowed / Disallowed Windower Plugins</strong>
                    </center>
                  </td>
                </tr>
                <tr class="modrulestable">
                  <td class="modrulestable">
                    <center>
                      <strong>Allowed</strong>
                    </center>
                    <p> </p>
                    <p> </p>
                    <p> </p>
                    <p> </p>
                    Affinity Antiemote Ashitacast(Not to be used for actions
                    based on what a mob does etc) Aspect Autojoin Barfiller
                    Battlemod Blumon Blusets Cfhblock Chamcham Changecall
                    Chatmon Checker Clock Craftmon Dashcam Dats Debuff Deeps
                    Drawdistance Dressme Duration Enternity ExpMon FFXIvision
                    FFXIVbar Filterless Filters Findall Find Giltracker Gearlock
                    Greed Hardwaremouse Ibar Ime Imguistyle Instantah Itemwatch
                    Kparser Links Logs Macrofix Mountmuzzle PartyBuffs Pbar
                    Petinfo Recast RollTracker Scoreboard Sexchange
                    Shorthand(Never for claiming) Singlerace Skillchain Status
                    Statustimers Stfu Watchexp Xiview
                  </td>
                  <td class="modrulestable">
                    <center>
                      <strong>Allowed</strong>
                    </center>
                    <p> </p>
                    <p> </p>
                    AutoInvite AutoJoin AzureSets Barfiller Battlemod Binder
                    Blist BLUAlert BluGuide Cancel Chars Chatmon Clock Config
                    ConsoleBG DelayMeNot Digger Distance DistancePlus DressUp
                    EnemyBar Enternity FindAll FishingCrashFix GameTime
                    Gearswap(Not to be used for actions based on what a mob does
                    etc) Highlight IME InfoBar InfoReplacer InstaLS
                    LatentChecker Linker Logger OhShi MacroChanger Nostrum PetTP
                    Plugin Manager Pouches Respond Rhombus RollTracker
                    Scoreboard SetBGM Shortcuts(Never for claiming) Skillchain
                    SpeedChecker SpellCheck SSOrganiser Stopwatch Text Tickle
                    Timers Timestamp TParty Translate TreasurePool Update
                    Weathermon WinControl XIVBar ZoneTimer
                    <p> </p>
                  </td>
                </tr>
                <tr class="modrulestable">
                  <td class="modrulestable">
                    <p></p>
                    <p> </p>
                    <p> </p>
                    <p> </p>
                    <center>
                      <strong>Disallowed</strong>
                    </center>
                    <p> </p>
                    Ahgo Allmaps Bellhop Crafty Gateway Filterscan Ja0wait
                    Lootwhore Lotomatic Mapdot Minimap Multisend No - ckback
                    Nomad Onevent Paranormal Peekaboo Repeat Repeater Servo
                    Skeletonkey Synplicity Watchdog Zoom
                    <p> </p>* Note Fillmode - Allowed unless you use it for
                    pulling things through the floor or wall you couldn't
                    normally target etc.
                    <p> </p>
                    <p> </p>
                  </td>
                  <td class="modrulestable">
                    <center>
                      <strong>Disallowed</strong>
                    </center>
                    <p> </p>
                    AEcho AnnounceTarget AnsweringMachine AutoControl AutoExec
                    AutoRA Cellhelp Chatporter Craft DynamisHelper Eval FastCS
                    FFXIDB Itemizer Ja0wait JobChange MobCompass ObiAway
                    Organizer Run Send STNA SubTarget Targetinfo Treasury Yush
                    <p> </p>
                    <p> </p>
                    <p> </p>
                    <p> </p>
                    <p> </p>* Note Wireframe - Allowed unless you use it for
                    pulling things through the floor / wall you couldn't
                    normally target etc.
                  </td>
                </tr>
              </table>
            </Card.Text>
            <small>5/22/20</small>
          </InfoDisplay>
        </Col>
      </Row>

      <Row className="my-3">
        <Col>
          <InfoDisplay title="Yell Rules">
            <ol>
              {yells.map((t, i) => (
                <li key={`term_${i}`}> {t} </li>
              ))}
            </ol>
            <small>5/22/20</small>
          </InfoDisplay>
        </Col>
      </Row>

      <Row className="my-3">
        <Col>
          <InfoDisplay title="Discord Rules">
            <ol>
              {discord.map((t, i) => (
                <li key={`term_${i}`}> {t} </li>
              ))}
            </ol>
            <small>5/22/20</small>
          </InfoDisplay>
        </Col>
      </Row>

      <Row className="my-3">
        <Col>
          <InfoDisplay title="Punishment List">
            <p></p>

            <table class="punishtable">
              <tr class="punishtable">
                Using Bots to include Fish Botting and Claim Botting = Banned
              </tr>
              <tr class="punishtable">Pos Hacking / Speed Hacking = Banned</tr>
              <tr class="punishtable">
                Harassment = 2 Week Suspension > 1 Month Suspension > > 3 Month
                Suspension > Banned
              </tr>
              <tr class="punishtable">
                Bootloader Violations = Warning > 1 Month Suspension > 3 Month
                Suspension > Banned
              </tr>
              <tr class="punishtable">
                Navmesh Abuse = Move them off the wall > Repeated Abuse(3 times)
                = Warning > 2 Week Suspension > 1 Month Suspension
              </tr>
              <tr class="punishtable">
                MPK = 2 Week Suspension > 1 Month Suspension > 3 Month
                Suspension > Banned(If it falls under the lines of harassment
                due to the dialogue exchanged between players follow Harassment
                punishment lines)
              </tr>
              <tr class="punishtable">RMT = Banned(Seller and Buyer)</tr>
              <tr class="punishtable">
                Too many characters online = Warning > 2 Week Suspension > 2
                Month Suspension > Banned
              </tr>
              <tr class="punishtable">
                Holding Mobs = 2 Week Suspension > 1 Month Suspension > 3 Month
                Suspension > Banned(This includes EXP mobs, mobs that others are
                farming and NMs.TBD by the GM handling the ticket)
              </tr>
              <tr class="punishtable">
                Market Manipulation with Alts = Warning > 2 Month Suspension >
                Banned
              </tr>
              <tr class="punishtable">
                Gardening Violations = Warning > 1 Month Suspension > 3 Month
                Suspension > Banned(Also empty out all their pots)
              </tr>
              <tr class="punishtable">
                Exploits that are similar to Duping or reselling exploits =
                Banned
              </tr>
              <tr class="punishtable">
                Character Names that break the rule = Warning with forced name
                change(If they change it to something inappropriate again, we
                will assign them a random name)
              </tr>
            </table>

            <p> </p>
            <small>5/22/20</small>
            <p> </p>
          </InfoDisplay>
        </Col>
      </Row>
    </Container>
  );
};
Rules.propTypes = {
  list: PropTypes.shape({
    allowed: PropTypes.arrayOf(PropTypes.string),
    disallowed: PropTypes.arrayOf(PropTypes.string),
    discord: PropTypes.arrayOf(PropTypes.string),
    rules: PropTypes.arrayOf(PropTypes.string),
    terms: PropTypes.arrayOf(PropTypes.string),
    yells: PropTypes.arrayOf(PropTypes.string),
  }),
};
Rules.defaultProps = {
  list: {
    allowed: [],
    disallowed: [],
    discord: [],
    rules: [],
    terms: [],
    yells: [],
  },
};
export default Rules;
