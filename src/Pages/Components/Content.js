import { Pagination, PaginationItem } from '@mui/material';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const Content = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);
    
    return (
      <Pagination
        page={page}
        count={10}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/inbox${item.page === 1 ? '' : `?page=${item.page}`}`}
            {...item}
          />
        )}
      />
    );
}

export default Content
