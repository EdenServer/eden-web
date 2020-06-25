import { navigate, useMatch } from '@reach/router';
import React from 'react';
import { Image, Input, List, Segment } from 'semantic-ui-react';
import apiUtil from '../../apiUtil';
import images from '../../images';
import Pagination from '../pagination';
import Item from './item';
import './item/itemStyles.css';

const Itemsearch = ({ history }) => {
  const params = new URLSearchParams(history.location.search);
  const searchParam = params.get('search');
  const itemname = useMatch(':itemname')?.itemname;

  const [search, setSearch] = React.useState(searchParam || '');
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [initial, setInitial] = React.useState(false);
  const [lastSearch, setLastSearch] = React.useState(null);

  const handleSearch = e => {
    if (e.key === 'Escape') {
      setSearch(itemname || search || '');
    } else if (e.key === 'Enter' && search) {
      navigate(`/tools/item?search=${search}`);
    }
  };

  const chooseResult = result => {
    setSearch(result.name);
    navigate(`/tools/item/${result.key}`);
  };

  const fetchItems = ({ search, limit, offset }) => {
    setLastSearch(search);
    apiUtil.get(
      {
        url: `/api/v1/items?search=${search}&limit=${limit}&offset=${offset}`,
        json: true,
      },
      (error, json) => {
        if (json.total === 1) {
          chooseResult(json.items[0]);
        } else {
          setInitial(true);
          setTotal(json.total);
          setResults(json.items);
          setLoading(false);
        }
      }
    );
  };

  const searchInput = React.useRef(null);
  React.useEffect(() => {
    if (!itemname) {
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
        fetchItems({ search: searchParam, limit: 10, offset: 0 });
      }
    }
  }, [itemname, searchParam]);

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
      {itemname ? (
        <Item itemname={itemname} history={history} setLoading={setLoading} />
      ) : (
        <>
          <Pagination
            results={total}
            changePage={fetchItems}
            extra={{ search }}
          />
          <List>
            {results.map((result, i) => (
              <List.Item
                as={Segment}
                key={`result_${i}`}
                className="gm_itemsearch_row gm_image-spacer"
                onClick={() => chooseResult(result)}
              >
                <Image src={images.item(result.id)} />
                {result.name}
              </List.Item>
            ))}
          </List>
        </>
      )}
      {!itemname && results.length === 0 && (
        <Segment>
          {initial
            ? `No results for "${searchParam}".`
            : 'Begin searching an item by typing in the search box above.'}
        </Segment>
      )}
    </Segment>
  );
};

export default Itemsearch;
