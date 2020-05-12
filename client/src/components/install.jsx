import React from 'react';
import { Segment, Container, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default ({ info }) => (
  <Segment className="gm_install">
    <Container textAlign='justified'>
      <h3>Account Registration</h3>
      <p>
        You&apos;ll need the install guide linked below to get Eden setup
        to play. But you&apos;ll also need to register an account on the
          website. You can do that via the{' '}
        <Link to="/tools?user=register">tools page</Link>. If you get stuck on the setup process anywhere, the <a href="https://discord.gg/MWtDws8">Eden Discord</a> has an active #tech-support channel that would be happy to help you get things running.
        </p>
      <Divider />

      <h3>Helpful Install Links</h3>
      <p>!Under Construction!</p><p> Copied from the <a href="https://discord.gg/MWtDws8">Eden Discord</a></p>
      <p>
        NOTE: Per the Installation Guide below, if you're a new player you need the Eden Installer ABD the Bootloader Download links. Eden doesn't run off of retail files, so it's highly suggested to use the Eden Installer to avoid mismatched in game information.
          <p></p>     <p></p>     <p>
          <a href="https://bit.ly/EdenInstallGuide" rel="noopener noreferrer" target="_blank"> Installation Guide - https://bit.ly/EdenInstallGuide </a>
        </p>

      </p><p>
        <a href="https://bit.ly/34Xr227" rel="noopener noreferrer" target="_blank">Eden Installer - https://bit.ly/34Xr227</a>

      </p><p>
        <a href="https://bit.ly/355DqNs" rel="noopener noreferrer" target="_blank"> Backup Eden Installer - https://bit.ly/355DqNs</a>
      </p> <p>
        <a href="https://bit.ly/edenxiloader " rel="noopener noreferrer" target="_blank"> Bootloader Download - https://bit.ly/edenxiloader</a>
      </p> <p>
        <a href="https://bit.ly/3dhwQqV " rel="noopener noreferrer" target="_blank"> Japanese Installation Guide - https://bit.ly/3dhwQqV</a>
      </p> <p>
        <a href="https://bit.ly/2wqgcVm " rel="noopener noreferrer" target="_blank"> Troubleshooting Guide - https://bit.ly/2wqgcVm</a>
      </p> <p>
        <a href="https://bit.ly/38hH4Uo " rel="noopener noreferrer" target="_blank"> Bug-Reporting - https://bit.ly/38hH4Uo</a>
                    '
                    '             </p><p><strong>Common Issues</strong>
      </p><p>
        <a href="https://bit.ly/32QMSU4 " rel="noopener noreferrer" target="_blank">Login Problems - https://bit.ly/32QMSU4</a>
      </p><p>
        <a href="https://bit.ly/3co3d6U " rel="noopener noreferrer" target="_blank">FFXI Error Codes - https://bit.ly/3co3d6U</a>
      </p> <p>
        <a href="https://bit.ly/2Iaezh5 " rel="noopener noreferrer" target="_blank">In-game Issues - https://bit.ly/2Iaezh5</a>
      </p><p>
        <a href="https://bit.ly/2TAT1j3 " rel="noopener noreferrer" target="_blank">Quest/Mission Issues -  https://bit.ly/2TAT1j3</a>

      </p><p><strong>Discord Resources</strong>
      </p> <p>
        <a href="https://bit.ly/FFOSwitchMon " rel="noopener noreferrer" target="_blank">FOSwitchMon - https://bit.ly/FFOSwitchMon</a>
      </p> <p>
        <a href="https://bit.ly/2W92twS " rel="noopener noreferrer" target="_blank">Running two installs - https://bit.ly/2W92twS</a>
      </p>  <p>
        <a href="https://bit.ly/38Wxw1H " rel="noopener noreferrer" target="_blank">Era Accurate .dat Changes - https://bit.ly/38Wxw1H</a>
      </p> <p>Having issues connecting (3101, 3001, 0033, stuck on "Downloading Data", etc)? Grab this .bat file and run as admin. If you're wary of files, I get that. Download it, right-click and select "Edit", open with Notepad and you can see everything that it does.
        </p>   If this doesn't fix your issue, a <strong>computer restart</strong> is your next best bet.

        <p></p> <p></p>
      <Divider />

      <h3> Additional Troubleshooting and Getting Started Tips</h3>
      <p></p>
      <li>Having issues connecting (3101, 3001, 0033, stuck on "Downloading Data", etc)? Grab <a href="https://cdn.discordapp.com/attachments/496834102666723339/606667670867148811/NetworkFix.bat"> this .bat file</a> and run as admin. If you're wary of files, I get that. Download it, right-click and select "Edit", open with Notepad and you can see everything that it does.

If this doesn't fix your issue, a computer restart is your next best bet.</li>
      <p></p>
      <li> If you are controlling multiple characters with one controller and don't know how to turn this option off, navigate to your Playonline folder --> SquareEnix --> FINAL FANTASY XI --> ToolsUS. Open FFXiPadConfig.exe and turn of the option in the upper right section labeled "Enable gamepad when game is inactive."</li>
      <p></p>
      <li>If you're having issues with your video card stuttering every so often you can try installing the dx9 proxy. It comes with the installer. Navigate to your Ashita directory and look for a folder named ffxi_d3d8to9_proxy_v1.0.0.2-by_atom0s. Follow the readme in there and it should resolve your issues.</li>
      <p></p>
      <li> Q: I'm trying to play on a private server, when I log into the launcher, it just says sending data then closing..?</li>
        A: If you are on Windows 10, this means you are probably missing DirectPlay.See this post on how to fix that: https://goo.gl/uxSJBY
        <p></p>
      <li>If you are having trouble logging in and your password is greater than 16 characters, remove characters from the end until the length is 16, and then try to login.If your password is less than 6 characters long, and you have an email associated with your account, let me know and we can reset it.If no associated email, you can wait until our website comes up so you can change it through account management or send me a private message and we can work it out.</li>
      < p ></p >

      <li>Request a GM in game: Help Desk > Help Desk > I can't move > Other > I would like to call a GM  </li>   <p></p>
      < Divider />

      <h3>HOW TO RUN 2 FFXI INSTALLS</h3>

      <p></p>
      <p>Big thanks to @Devi Ltti#5459 (Discord)  for a much better .bat that doesn't require editting file paths!    </p>
      <p>
        <p>NOTE1: Switching from one private server to another only requires steps 1-4. If you're switching between Retail and Eden AND installed Retail BEFORE using the Eden installer, follow steps 1-5.    </p>
        <p>NOTE2: In the text below, I will refer to your other FFXI install as "OtherInstall". Eden will simply be called "Eden".    </p>
        <p></p>
        <p>1) Install Eden using the installer (See #install-support-links ) to a location other than where you have OtherInstall located.    </p>
        <p>2) Download the .bat file attached to this post and place 1 copy of it in your OtherInstall location, and 1 copy in your Eden install location. Specifically, it needs to go into the \PlayOnline\SquareEnix\ folder for each install.    </p>
        <p>3) If you want to play on Eden, simply run the .bat (AS ADMINISTRATOR) in your Eden install location. If you want to switch to OtherInstall, run the .bat that's in your OtherInstall location.    </p>
        <p>4) Make sure to re-target which loader you want by editting the profile that you use. Simply click the red button with the 3 white dots to the right of the "File:" line and navigate to where the loader is for OtherInstall. Make sure to select "All files" to the right of "File Name:" so you can see the loader.    </p>
        <p>5) (SEE NOTE1) If you installed Retail BEFORE using the Eden installer, once you switch BACK to retail you'll have to update via Retail's PlayOnline. This will only happen once. From then on you'll be able to switch back and forth as usual.    </p>
      </p>
      <p><a href="https://cdn.discordapp.com/attachments/496834102666723339/706766555345584128/Switch.bat"> Switch.bat Download </a></p>
      <Divider />

      <h3>Coming back / migrating from another private server</h3>
      <p>
        You will need to download <a href={info.bootloader} rel="noopener noreferrer" target="_blank">our modified bootloader</a>. You may want to visit our tech-support channel on <a href={info.discord} rel="noopener noreferrer" target="_blank">our Discord server</a> if you're having trouble.
            </p>
      <ul>
        <li>You can run the bootloader by itself to play on Eden but I suggest to use Ashita.</li>
        <li>We do not officially support Windower, but you may find some help getting it set up in our tech-support channel.</li>
        <li>Move <b>edenxi.exe</b> to your Ashita <b>ffxi-bootmod</b> directory. The default folder for this is <b>~\\Program Files (x86)\PlayOnline\Ashita\ffxi-bootmod</b></li>
        <li>DO NOT rename <b>edenxi.exe</b> or it will not work</li>
        <li>Open your Ashita configuration but right clicking a profile and then clicking "Edit configuration"</li>
        <li>In the File section you will see something like <b>.\\ffxi-bootmod\\pol.exe</b>. Ensure that this is changed to <b>.\\ffxi-bootmod\\edenxi.exe</b></li>
        <li>Command should include <b>--server play.edenxi.com --hairpin</b> and may optionally include <b>--user MYUSERNAME --pass MYPASSWORD</b> arguments so that you can automatically login.</li>
      </ul>
    </Container >
  </Segment >
);