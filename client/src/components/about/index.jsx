import React from 'react';
import InfoDisplay from '../InfoDisplay';
import Contributing from './contributing';

export default () => {
  return (
    <>
      <InfoDisplay
        title={
          "What's Different between Eden, other private servers, and retail?"
        }
      >
        <p>
          Eden was created in part to recreate the era experience as close as
          possible. We define era as anything that happened before the Wings of
          the Goddess release on November 20th, 2007. While FFXI is still a
          great game today, it is vastly different than it was in 2007. We don't
          aim to take the place of retail today, and we encourage you to
          subscribe to it, if nothing else to finish the amazing storyline.
        </p>
        <p>
          Many past players of FFXI long for the days of a cooperative
          environment where "quality of life" was an afterthought. Because there
          is no classic solution from SquareEnix, Eden was created to fill that
          desire. Our vision is to recreate the 2007 era experience as closely
          as possible with as very few deviations as possible.
        </p>
        <p>
          While all private servers have some deviation from era retail, we
          believe that the other private servers that we have encountered are
          full of customizations and/or are just too far from era accuracy. We
          also have a large volunteer staff of about 30 people that help us keep
          Eden running smooth.
        </p>
      </InfoDisplay>

      <InfoDisplay title="How has Eden deviated from retail?">
        <p>
          There are a small handful of deviations from this though and that's
          what is going to be highlighed below.
        </p>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Eden Implementation</th>
              <th>Retail Era Implementation</th>
              <th>Reasoning</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PUP has a B- in h2h rating</td>
              <td>PUP has a C+ in h2h rating</td>
              <td>balancing</td>
            </tr>
            <tr>
              <td>Astral Ring obtained from Castle Oztroja coffer</td>
              <td>Astral Ring obtained from BCNM</td>
              <td>economy</td>
            </tr>
            <tr>
              <td>
                The auction house has unlimited listings and items expire after
                365 real life days
              </td>
              <td>
                The auction house is limited to 7 listings and items expire
                after 3 real life days
              </td>
              <td>economy</td>
            </tr>
            <tr>
              <td>
                Beastmen pet exp scales with the number of players in party and
                spheroids award vastly reduced exp
              </td>
              <td>
                Beastmen pet exp does not scale with the number of players in
                party and spheroids award an unknown amount of exp
              </td>
              <td>balancing</td>
            </tr>
            <tr>
              <td>
                Wardrobe 1 is awarded upon attaining Rank 3 and Wardrobe 2 upon
                attaining Rank 6
              </td>
              <td>Wardrobe 1 and Wardrobe 2 did not exist</td>
              <td>economy</td>
            </tr>
            <tr>
              <td>Some Ores/Logs/Hides/Beastman armor et. cetera stack</td>
              <td>
                Some Ores/Logs/Hides/Beastman armor et. cetera did not stack
              </td>
              <td>economy</td>
            </tr>
            <tr>
              <td>Current retail fishing mini-game</td>
              <td>Era retail fishing mini-game</td>
              <td>technical limitations / cheat prevention</td>
            </tr>
            <tr>
              <td>
                Original difficulty CoP missions and original item flags (ex.
                rare/ex animas)
              </td>
              <td>Era difficulty CoP missions and era item flags</td>
              <td>teamwork</td>
            </tr>
            <tr>
              <td>
                Mobs that link automatically dirty exp to person that linked
              </td>
              <td>
                Mobs did not dirty exp until an action was performed on them
              </td>
              <td>teamwork</td>
            </tr>
            <tr>
              <td>
                Some mobs do not reset their window when the server is reset
                (list to be provided later)
              </td>
              <td>
                Some mobs windows would reset when a server was reset or crashed
              </td>
              <td>economy</td>
            </tr>
            <tr>
              <td>
                Alkyoneus, Pallas, Sozu Rogberry and Ullikummi are lottery pops
              </td>
              <td>
                Alkyoneus, Pallas, Sozu Rogberry and Ullikummi are forced pops
              </td>
              <td>economy</td>
            </tr>
            <tr>
              <td>High profile mobs drop the non rare/ex versions of items</td>
              <td>
                High profile mobs drop rare/ex items of the BCNM equvilent
              </td>
              <td>economy</td>
            </tr>
            <tr>
              <td>Level Sync</td>
              <td>No Level Sync</td>
              <td>teamwork</td>
            </tr>
            <tr>
              <td>Mythic Weapons (currently unavailable)</td>
              <td>Mythic weapons did not exist</td>
              <td>toau content</td>
            </tr>
          </tbody>
        </table>
      </InfoDisplay>

      <InfoDisplay title="How can I help?">
        <p>
          There are several ways to help. You can fill out bug reports, report
          players who are cheating by using the in-game ticketing system,
          volunteer as a staff member, contribute code, et. cetera. If you'd
          like to contribute code, we could really use all the help we can get!
          Below I've drafted up how to set up your own private server here and
          create a basic BCNM.
        </p>
      </InfoDisplay>

      <Contributing />
    </>
  );
};
