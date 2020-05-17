import React from 'react';
import { Dropdown, Pagination } from 'semantic-ui-react';

const options = [
  { text: '10', value: 10 },
  { text: '50', value: 50 },
  { text: '100', value: 100 },
  { text: '250', value: 250 },
];

export default ({
  extra,
  results = 0,
  perPageDefault = 10,
  changePage = () => {},
}) => {
  if (results === 0) {
    return null;
  }

  const [perPage, setPerPage] = React.useState(perPageDefault);
  const [activePage, setActivePage] = React.useState(1);
  const totalPages = Math.ceil(results / perPage);

  const updatePerPage = (_e, { value }) => {
    setPerPage(value);
    changePage({ limit: value, offset: (activePage - 1) * value, ...extra });
  };

  const updateActivePage = (_e, { activePage }) => {
    setActivePage(activePage);
    changePage({
      limit: perPage,
      offset: (activePage - 1) * perPage,
      ...extra,
    });
  };

  return (
    <>
      <Pagination
        size="mini"
        firstItem={null}
        lastItem={null}
        ellipsisItem={null}
        secondary
        totalPages={totalPages}
        activePage={activePage}
        onPageChange={updateActivePage}
      />
      <div className="eden_pagination-dropdown">
        Displaying{' '}
        <Dropdown
          inline
          options={options}
          onChange={updatePerPage}
          defaultValue={perPage}
        />{' '}
        results per page
      </div>
    </>
  );
};
