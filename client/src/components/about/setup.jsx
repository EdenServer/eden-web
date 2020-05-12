import React from 'react';
import { Card } from 'semantic-ui-react';
import { block1 } from './text';

export default () => (
  <div>
    <h4>Software Requirements</h4>
    <p>
      This section is written for people that are new to software development on
      64-bit Windows. If you already have this or alternative software you can
      skip ahead to the next section--otherwise download and install the
      following software:
    </p>
    <Card.Group>
      <div className="card">
        <div className="content">
          <div className="header">Git for Windows</div>
          <div className="description">
            You can use all default options except pick "Checkout as-is, commit
            Unix-style endings" when you get to that option.
          </div>
        </div>
        <div className="extra content">
          <div className="ui two buttons">
            <a
              className="ui blue button"
              href="https://github.com/git-for-windows/git/releases/download/v2.22.0.windows.1/Git-2.22.0-64-bit.exe"
              rel="noopener noreferrer"
              target="_blank"
            >
              Download
            </a>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="content">
          <div className="header">MySQL 5.7</div>
          <div className="description">
            <ul>
              <li>For the server type choose "Server Only"</li>
              <li>
                On the next page, if there are missing dependencies press
                "Execute"
              </li>
              <li>You can use default options for everything else</li>
              <li>
                Use all lowercase letters "root" without quotations for your
                password
              </li>
            </ul>
          </div>
        </div>
        <div className="extra content">
          <div className="ui two buttons">
            <a
              className="ui blue button"
              href="https://dev.mysql.com/downloads/file/?id=487685"
              rel="noopener noreferrer"
              target="_blank"
            >
              Download
            </a>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="content">
          <div className="header">Visual Studio 2019 Community</div>
          <div className="description">
            In the Workloads tab scroll down to the Windows section and check
            the Desktop Development with C++ box. Then click install.
          </div>
        </div>
        <div className="extra content">
          <div className="ui two buttons">
            <a
              className="ui blue button"
              href="https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=Community&rel=16&rid=30012"
              rel="noopener noreferrer"
              target="_blank"
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </Card.Group>

    <h4>Setup</h4>
    <p>
      Follow the instructions here exactly. Do not skip ahead or miss a step if
      you are unsure what you are doing.
    </p>
    <ul>
      <li>
        Restart your computer. You should have already installed all of the
        required software by this point. If you don't restart your PC at this
        stage the following steps will likely have no effect or fail.
      </li>
      <li>
        <p>
          Open notepad and copy the following script into it. Save it as
          install.bat and then run it as adminstrator by right clicking it.
        </p>
        <p>
          <i>
            Notes: Make sure that you select "All Files" as the save as type.
            Otherwise you will save it as a text document and the script will
            not work.
          </i>
        </p>
        <p>
          <i>
            This assumes you installed to your C: drive. It also assumes that
            you used the password "root" for your MySQL username.
          </i>
        </p>
        <pre className="gm_code-block">{block1}</pre>
      </li>
      <li>
        Navigate to the project folder that was just created, open the win32
        folder then open darkstar.sln in Visual Studio
      </li>
      <li>
        You will probably get a notice saying Retarget Projects. Accept the
        default options to upgrade the targets. If you don't get this prompt or
        accidentally close it you can Retarget each project in the Solution
        Explorer.
      </li>
      <li>
        On the menu at the top of the screen click Build and then click the
        Build Solution button. This will take several minutes and you will be
        able to see the progress in your output window.
      </li>
      <li>
        Ensure that when the build is complete it says "========== Build: 3
        succeeded, 0 failed, 0 up-to-date, 0 skipped ==========". You can view
        the output by selecting the View menu and then clicking on Output
      </li>
      <li>
        Run the Play on Eden shortcut that came with your normal Eden
        installation.
      </li>
      <li>
        Press the + button at the bottom to create a new configuration. If it
        doesn't show options to edit it then right click the new configuration
        and then click Edit Configuration
      </li>
      <li>
        Set the window configurations to the same that you have on normal Eden
        and then click the boot tab. Only edit the following in the boot tab:
      </li>
      <li>
        <b>Configuration name:</b> Developer
      </li>
      <li>
        <b>File:</b> .\\ffxi-bootmod\\pol.exe
      </li>
      <li>
        <b>Command:</b> --server 127.0.0.1 --user dev --pass dev
      </li>
    </ul>

    <h4>Running the server</h4>
    <p>
      The technical part is over. Now you just need to run the servers and boot
      up Ashita.
    </p>
    <ul>
      <li>
        Navigate to your code directory again and run the following three
        programs: DSConnect-server, DSGame-server and DSSearch-server.
      </li>
      <li>
        DSGame-server will take the longest to boot. It is not uncommon for it
        to take 6 minutes or longer to load. It will be ready to log-in when it
        says "The map-server is ready to work".
      </li>
      <li>
        Run the Play on Eden shortcut and then click on the Developer
        configuration to connect to your local development server.
      </li>
      <li>
        You may get stuck on downloading data when you first log-in. In this
        case just reboot the three servers and load Ashita again.
      </li>
    </ul>
  </div>
);
