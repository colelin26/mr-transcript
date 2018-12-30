export const SETUP_SORT = 'SETUP_SORT';
export const SELECT_ITEM = 'SELECT_ITEM';
export const SELECT_ALL = 'SELECT_ALL';

export const SORTING_ORDERS = {
  ASC: 'asc',
  DESC: 'desc'
};

export const createSortHandler = orderBy => ({
  type: SETUP_SORT,
  orderBy
});

export const onSelectAllClick = () => ({
  type: SELECT_ALL
});

export const handleSelectItem = id => ({
  type: SELECT_ITEM,
  id
});
