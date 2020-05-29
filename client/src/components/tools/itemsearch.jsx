import React from 'react';
import { Segment, Input, List, Image } from 'semantic-ui-react';
import images from '../../images';
import Pagination from '../pagination';
import Item from './item';
import apiUtil from '../../apiUtil';

import './item/itemStyles.css';
import { navigate } from '@reach/router';

const Itemsearch = ({ history, itemname, itemstack }) => {
  const [search, setSearch] = React.useState(itemname || '');
  const [results, setResults] = React.useState([]);
  const [item, setItem] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [initial, setInitial] = React.useState(false);

  const handleSearch = e => {
    if (e.key === 'Escape') {
      setSearch(itemname || '');
    } else if (e.key === 'Enter' && search) {
      setLoading(true);
      fetchItems({ search, limit: 10, offset: 0 });
    }
  };

  const fetchItems = ({ search = itemname, limit, offset }) => {
    apiUtil.get(
      {
        url: `api/v1/items?search=${search}&limit=${limit}&offset=${offset}`,
        json: true,
      },
      (error, json) => {
        if (json.total === 1) {
          fetchItem(json.items[0].key);
        } else {
          setInitial(true);
          setTotal(json.total);
          setResults(json.items);
          setLoading(false);
          setItem(null);
        }
      }
    );
  };

  const fetchItem = (item, stack = false) => {
    if (!item) return;

    setLoading(true);
    apiUtil.get({ url: `api/v1/items/${item}`, json: true }, (error, data) => {
      navigate(`/tools?item=${encodeURIComponent(data.key)}&stack=${stack}`);
      setTotal(0);
      setResults([]);
      setItem(data);
      setSearch(data.name);
      setLoading(false);
    });
  };

  const fetchMemoizedItem = React.useCallback(fetchItem);

  React.useEffect(() => {
    const getStack = itemstack !== null ? itemstack : false;
    if (itemname) fetchMemoizedItem(encodeURIComponent(itemname), getStack);
  }, [itemname, itemstack]);

  return (
    <Segment className="gm_tools-container">
      <Input
        fluid
        placeholder="Search..."
        loading={loading}
        value={search}
        onKeyUp={handleSearch}
        onChange={e => setSearch(e.target.value)}
      />
      {item ? (
        <Item item={item} stack={itemstack} />
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
                onClick={() => fetchItem(result.key)}
              >
                <Image src={images.item(result.id)} />
                {result.name}
              </List.Item>
            ))}
          </List>
        </>
      )}
      {!item && results.length === 0 && (
        <Segment>
          {initial
            ? `No results for "${search}".`
            : 'Begin searching an item by typing in the search box above.'}
        </Segment>
      )}
    </Segment>
  );
};

export default Itemsearch;
