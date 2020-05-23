import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import InfoDisplay from './InfoDisplay';
import { Container, Row, Col } from 'react-bootstrap';

const Rules = ({ list }) => {
  const { terms, rules, disallowed, allowed, yells, discord } = list;

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <InfoDisplay title="Terms and Conditions">
            <ol>
              {terms.map((t, i) => (
                <li key={`term_${i}`}>{t}</li>
              ))}
            </ol><p></p><small>5/22/20</small><p></p>
          </InfoDisplay>
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <InfoDisplay title="Formal Rules">
            <Card.Text>
              Listed here is a list of formal rules. It will be expanded upon and
              modified in the future so please stay as current as realistically
      possible with them. If you see someone breaking the rules,{' '}
              <b>
                <u>please do not report them in public forums like Discord</u>
              </b>
      . Either let them know they should stop, or call a GM using the in
      game Help Desk. Staff takes these reports seriously and we follow up
      on each one, but we do not want anybody shamed publicly for things
      they are simply suspected of. Once staff concludes if they are
      cheating or not, we will take appropriate action.
    </Card.Text>
            <Card.Text>
              Regarding behavior: we don&apos;t have an all inclusive code of
              conduct manual for you to read so use common sense. If you are doing
              something that would have gotten you banned or in trouble on retail,
              it is more than likely against the rules here too. If you are doing
              inappropriate things that you wouldn&apos;t do to your friends--I
              would think twice about that too. Finally, if a GM asks you to stop a
              behavior--saying &quot;it isn&apos;t in the rules&quot; is not a valid
              excuse for ignoring the GM.
    </Card.Text>
            <Card.Text>
              We give our GMs the responsibility to uphold rules in the essence of
              fair play as well as to ensure that other&apos;s play experience is
              not effected negatively, not all rules will be listed as some must be
              handled on a case by case basis, Our GM staff upholds communication
              between themselves in order to ensure a consistency in policy and has
      measures to ensure that this does not get abused,{' '}
              <b>
                ALL GM requests must be upheld and if something is found to be wrong
                with a certain request it will be dealt with accordingly. In the
                event you feel a GM&apos;s judgement was off you may contact a
                council member via webform on the website tools
      </b>
            </Card.Text>
            <ol>
              {rules.map((t, i) => (
                <li key={`term_${i}`}>{t}</li>
              ))}
            </ol>
          </InfoDisplay>
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <InfoDisplay title="Rule Violation Punishments">
            <Card.Text>
              <p></p>
    Punishment List  <p></p>
              <li> Using Bots to include Fish Botting and Claim Botting = Banned</li>
              <li>  Pos Hacking/Speed Hacking = Banned</li>
              <li> Harassment = 2 Week Suspension > 1 Month Suspension > > 3 Month Suspension > Banned</li>
              <li>  Bootloader Violations = Warning > 1 Month Suspension > 3 Month Suspension > Banned</li>
              <li> Navmesh Abuse = Move them off the wall > Repeated Abuse (3 times) = Warning > 2 Week Suspension > 1 Month Suspension</li>
              <li> MPK = 2 Week Suspension > 1 Month Suspension > 3 Month Suspension > Banned (If it falls under the lines of harassment due to the dialogue exchanged between players follow Harassment punishment lines)</li>
              <li> RMT = Banned (Seller and Buyer)</li>
              <li> Too many characters online = Warning > 2 Week Suspension > 2 Month Suspension > Banned</li>
              <li> Holding Mobs = 2 Week Suspension > 1 Month Suspension  > 3 Month Suspension > Banned (This includes EXP mobs, mobs that others are farming and NMs.  TBD by the GM handling the ticket)</li>
              <li> Market Manipulation with Alts = Warning > 2 Month Suspension > Banned</li>
              <li> Gardening Violations = Warning > 1 Month Suspension > 3 Month Suspension > Banned (Also empty out all their pots)</li>
              <li> Exploits that are similar to Duping or reselling exploits = Banned</li>
              <li> Character Names that break the rule = Warning with forced name change (If they change it to something inappropriate again, we will assign them a random name)</li>
              <li>  Holding Darters with no intention to kill: Warning > 2 Week > 1 Month > 3 Month </li>
              <li>  Repeated false reports regarding darters: Warning > 1 Week > 2 Week > 1 Month</li>
              <p></p> </Card.Text>
          </InfoDisplay>
        </Col>
      </Row>

      <Row className="my-3">
        <Col>
          <InfoDisplay title="Modification Rules:">
            <Card.Text>
              <p>A list of allowed plugins and other third-party software.</p>
              <p></p>
              <table>

                <tr><center><strong>Allowed/Disallowed Ashita Plugins</strong></center>

                  <td><center><strong>Allowed/Disallowed Windower Plugin</strong></center></td>

                </tr>
                <tr><td><strong>Allowed</strong>
                  <p> </p>  <p> </p> <p> </p>  <p> </p>
        Affinity
          Antiemote
          Ashitacast (Not to be used for actions based on what a mob does etc)
          Aspect
          Autojoin
          Barfiller
          Battlemod
          Blumon
          Blusets
          Cfhblock
          Chamcham
          Changecall
          Chatmon
          Checker
          Clock
          Craftmon
          Dashcam
          Dats
          Debuff
          Deeps
          Drawdistance
          Dressme
          Duration
          Enternity
          ExpMon
          FFXIvision
          FFXIVbar
          Filterless
          Filters
          Findall
          Find
          Giltracker
          Gearlock
          Greed
          Hardwaremouse
          Ibar
          Ime
          Imguistyle
          Instantah
          Itemwatch
          Kparser
          Links
          Logs
          Macrofix
          Mountmuzzle
          PartyBuffs
          Pbar
          Petinfo
          Recast
          RollTracker
          Scoreboard
          Sexchange
          Shorthand (Never for claiming)
          Singlerace
          Skillchain
          Status
          Statustimers
          Stfu
          Watchexp
          Xiview</td>
                  <td><strong>Allowed</strong><p> </p><p> </p>
              AutoInvite
              AutoJoin
              AzureSets
              Barfiller
              Battlemod
              Binder
              Blist
              BLUAlert
              BluGuide
              Cancel
              Chars
              Chatmon
              Clock
              Config
              ConsoleBG
              DelayMeNot
              Digger
              Distance
              DistancePlus
              DressUp
              EnemyBar
              Enternity
              FindAll
              FishingCrashFix
              GameTime
              Gearswap (Not to be used for actions based on what a mob does etc)
              Highlight
              IME
              InfoBar
              InfoReplacer
              InstaLS
              LatentChecker
              Linker
              Logger
              OhShi
              MacroChanger
              Nostrum
              PetTP
              Plugin Manager
              Pouches
              Respond
              Rhombus
              RollTracker
              Scoreboard
              SetBGM
              Shortcuts (Never for claiming)
              Skillchain
              SpeedChecker
              SpellCheck
              SSOrganiser
              Stopwatch
              Text
              Tickle
              Timers
              Timestamp
              TParty
              Translate
              TreasurePool
              Update
              Weathermon
              WinControl
              XIVBar
              ZoneTimer<p></p>
                  </td>
                </tr><tr><td><p> </p>  <p> </p> <p> </p>  <p> </p><strong> Disallowed:</strong><p> </p>
        Ahgo
        Allmaps
        Bellhop
        Crafty
        Gateway
        Filterscan
        Ja0wait
        Lootwhore
        Lotomatic
        Mapdot
        Minimap
        Multisend
        No-ckback
        Nomad
        Onevent
        Paranormal
        Peekaboo
        Repeat
        Repeater
        Servo
        Skeletonkey
        Synplicity
        Watchdog
        Zoom
        <p></p>
        *Notes
        Fillmode - Allowed unless you use it for pulling things through the floor/wall you couldn't normally target etc.
        <p></p>
                  <p></p></td>
                  <td><strong> Disallowed:</strong><p> </p>

            AEcho
            AnnounceTarget
            AnsweringMachine
            AutoControl
            AutoExec
            AutoRA
            Cellhelp
            Chatporter
            Craft
            DynamisHelper
            Eval
            FastCS
            FFXIDB
            Itemizer
            Ja0wait
            JobChange
            MobCompass
            ObiAway
            Organizer
            Run
            Send
            STNA
            SubTarget
            Targetinfo
            Treasury
            Yush
        <p></p><p> </p>  <p> </p> <p> </p>  <p> </p>
        *Note
        Wireframe - Allowed unless you use it for pulling things through the floor/wall you couldn't normally target etc.
        </td>
                </tr></table>
            </Card.Text>
          </InfoDisplay>
        </Col>
      </Row>

      <Row className="my-3">
        <Col>
          <InfoDisplay title="Yell Rules">
            <ol>{yells.map((t, i) => <li key={`term_${i}`}>{t}</li>)}</ol>

          </InfoDisplay>
        </Col>
      </Row>

      <Row className="my-3">
        <Col>
          <InfoDisplay title="Discord Rules">

            <p></p>
            <p>1) Please be respectful to each other.  Consider this phrase when typing, treat others as you would want to be treated.  You wouldn't want someone yelling at you or belittling you so you don't need to do it to another person.</p>
            <p></p>
            <p>2) Please keep the cursing at a minimum.   Some people prefer not to read constant cursing.  We know sometimes a word or two will slip out in the heat of the moment and that is ok but if it becomes a habit we will go to you in private about it.</p>
            <p></p>
            <p>3) Do not post nudity of any kind.</p>
            <p></p>
            <p>4) Do not give out any personal information in public. If you must send it do so via a PM. There are too many people that will take advantage of this personal information.</p>
            <p></p>
            <p>5) Most importantly we want you all to have fun while you use our discord.  We know you won't agree with everything we implement and that is ok.  We do ask that you follow our rules.  If you feel you won't be able to then we kindly thank you for using our discord and ask you to move on to somewhere else to chat.</p>
            <p></p>
            <li>These rules may be adjusted at any time</li>
            <p></p>
            <li>Any attempt evading a mute will result in an immediate ban.</li>
            <p></p>
            <li>It is at the moderators discretion if a player has crossed the line.  If a Staff or Moderator asks a player to do something, that player needs to follow the request.  If they feel this request is not appropriate, contact Shoruto with a screenshot of the request.</li>
            <p></p>
            <li>If a player feels a Staff is talking inappropriately to another player, contact Shoruto or Juul with a screenshot of the inappropriate chat.</li>
            <p></p>
            <li>To make our Discord the best possible it takes a community effort. Our moderators won't be able to see everything so if a player happens to see someone breaking one of our rules or has crossed the line somewhere else, please let a moderator know in a private message with a screenshot of the chat that you feel broke the rule.</li>
            <p></p>
            <p>Moderators:</p>
            <p>     Aiko (Also the head GM so please contact one of the other moderators first)</p>
            <p>     Juul</p>
            <p>     Shoruto</p>
            <p></p>
          </InfoDisplay>
        </Col>
      </Row>



      <Row className="my-3">
        <Col>
          <InfoDisplay title="Punishment List">
            <p></p>
            <li> Using Bots to include Fish Botting and Claim Botting = Banned</li>
            <li>  Pos Hacking/Speed Hacking = Banned</li>
            <li> Harassment = 2 Week Suspension > 1 Month Suspension > > 3 Month Suspension > Banned</li>
            <li>  Bootloader Violations = Warning > 1 Month Suspension > 3 Month Suspension > Banned</li>
            <li> Navmesh Abuse = Move them off the wall > Repeated Abuse (3 times) = Warning > 2 Week Suspension > 1 Month Suspension</li>
            <li> MPK = 2 Week Suspension > 1 Month Suspension > 3 Month Suspension > Banned (If it falls under the lines of harassment due to the dialogue exchanged between players follow Harassment punishment lines)</li>
            <li> RMT = Banned (Seller and Buyer)</li>
            <li> Too many characters online = Warning > 2 Week Suspension > 2 Month Suspension > Banned</li>
            <li> Holding Mobs = 2 Week Suspension > 1 Month Suspension  > 3 Month Suspension > Banned (This includes EXP mobs, mobs that others are farming and NMs.  TBD by the GM handling the ticket)</li>
            <li> Market Manipulation with Alts = Warning > 2 Month Suspension > Banned</li>
            <li> Gardening Violations = Warning > 1 Month Suspension > 3 Month Suspension > Banned (Also empty out all their pots)</li>
            <li> Exploits that are similar to Duping or reselling exploits = Banned</li>
            <li> Character Names that break the rule = Warning with forced name change (If they change it to something inappropriate again, we will assign them a random name)</li>
            <p></p>
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
