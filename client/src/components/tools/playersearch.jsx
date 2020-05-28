import React from "react";
import { Segment, Input, List, Image } from "semantic-ui-react";

import { navigate } from "@reach/router";
import Pagination from "../pagination";
import Player from "./player";
import apiUtil from "../../apiUtil";
import images from "../../images";

const Playersearch = ({ history, charname }) => {
  const [search, setSearch] = React.useState(charname || "");
  const [results, setResults] = React.useState([]);
  const [player, setPlayer] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [initial, setInitial] = React.useState(false);

  const handleSearch = (e) => {
    if (e.key === "Escape") {
      setSearch(charname || "");
    } else if (e.key === "Enter" && search) {
      setLoading(true);
      fetchPlayers({ search, limit: 10, offset: 0 });
    }
  };

  const fetchPlayers = ({ search = charname, limit, offset }) => {
    apiUtil.get(
      {
        url: `api/v1/chars?search=${search}&online=false&limit=${limit}&offset=${offset}`,
        json: true,
      },
      (error, json) => {
        if (json.total === 1) {
          fetchPlayer(json.chars[0].charname);
        } else {
          setInitial(true);
          setTotal(json.total);
          setResults(json.chars);
          setLoading(false);
          setPlayer(null);
        }
      }
    );
  };

  const fetchPlayer = (player) => {
    if (!player) return;

    setLoading(true);
    apiUtil.get(
      {
        url: `api/v1/chars/${player}`,
        json: true,
      },
      (error, data) => {
        navigate(`/tools?player=${player}`);
        setTotal(0);
        setResults([]);
        setPlayer(data);
        setSearch(data.name);
        setLoading(false);
      }
    );
  };

  const fetchMemoizedPlayer = React.useCallback(fetchPlayer);

  React.useEffect(() => {
    if (charname) fetchMemoizedPlayer(charname);
  }, [charname]);

  return (
    <Segment className="gm_tools-container">
      <Input
        fluid
        placeholder="Search..."
        loading={loading}
        value={search}
        onKeyUp={handleSearch}
        onChange={(e) => setSearch(e.target.value)}
      />
      {player ? (
        <Player player={player} />
      ) : (
        <>
          <Pagination
            results={total}
            changePage={fetchPlayers}
            extra={{ search }}
          />
          <List>
            {results.map((result, i) => (
              <List.Item
                as={Segment}
                key={`result_${i}`}
                className="gm_charsearch_row"
                onClick={() => fetchPlayer(result.charname)}
              >
                <Image
                  className="gm_online-avatar gm_image-spacer"
                  size="mini"
                  src={images.avatar(result.avatar)}
                />
                {result.charname}
              </List.Item>
            ))}
          </List>
        </>
      )}
      {!player && results.length === 0 && (
        <Segment>
          {initial
            ? `No results for "${search}".`
            : "Begin searching for a player by typing in the search box above."}
        </Segment>
      )}
    </Segment>
  );
};

export default Playersearch;
