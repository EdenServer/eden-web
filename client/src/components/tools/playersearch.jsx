import React from 'react';
import { Segment, Input, List, Image } from 'semantic-ui-react';

import { navigate, useMatch } from '@reach/router';
import Pagination from '../pagination';
import Player from './player';
import apiUtil from '../../apiUtil';
import images from '../../images';

const Playersearch = ({ history }) => {
  const params = new URLSearchParams(history.location.search);
  const searchParam = params.get('search');
  const charname = useMatch(':charname')?.charname;

  const [search, setSearch] = React.useState(charname || searchParam || '');
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [initial, setInitial] = React.useState(false);

  const [lastSearch, setLastSearch] = React.useState(null);

  const handleSearch = e => {
    if (e.key === 'Escape') {
      setSearch(charname || search || '');
    } else if (e.key === 'Enter' && search) {
      navigate(`/tools/player?search=${search}`);
    }
  };

  const chooseResult = result => {
    setSearch(result.charname);
    navigate(`/tools/player/${result.charname}`);
  };

  const fetchPlayers = ({ search = charname, limit, offset }) => {
    setLastSearch(search);
    apiUtil.get(
      {
        url: `/api/v1/chars?search=${search}&online=false&limit=${limit}&offset=${offset}`,
        json: true,
      },
      (error, json) => {
        if (json.total === 1) {
          chooseResult(json.chars[0]);
        } else {
          setInitial(true);
          setTotal(json.total);
          setResults(json.chars);
          setLoading(false);
        }
      }
    );
  };

  const searchInput = React.useRef(null);
  React.useEffect(() => {
    if (!charname) {
      setSearch(searchParam || '');
      searchInput.current.focus();

      if (searchParam === null) {
        // Reset search if no search param given
        setInitial(false);
        setTotal(0);
        setResults([]);
        setLastSearch(null);
      } else if (searchParam !== lastSearch) {
        // Search if the current search param isn't the last searched
        fetchPlayers({ search: searchParam, limit: 10, offset: 0 });
      }
    }
  }, [charname, searchParam]);

  return (
    <Segment className="gm_tools-container">
      <Input
        fluid
        placeholder="Search..."
        loading={loading}
        value={search}
        ref={searchInput}
        onKeyUp={handleSearch}
        onChange={e => setSearch(e.target.value)}
      />
      {charname ? (
        <Player
          charname={charname}
          history={history}
          setLoading={setLoading}
          setSearch={setSearch}
        />
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
                onClick={() => chooseResult(result)}
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
      {!charname && results.length === 0 && (
        <Segment>
          {initial
            ? `No results for "${searchParam}".`
            : 'Begin searching for a player by typing in the search box above.'}
        </Segment>
      )}
    </Segment>
  );
};

export default Playersearch;
