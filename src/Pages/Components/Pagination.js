import React from "react";
import { Pagination, PaginationItem } from "@mui/material";

const PaginationComponent = (props) => {
  const { currentPage, lastVisiblePage, handlePagination } = props;

  return (
    <Pagination
      sx={{
        position:"fixed",
        bottom:"20px",
        left:"20px",
        bgcolor:"white",
        p:2,
        }}
      page={currentPage}
      count={lastVisiblePage}
      renderItem={(item) => (
        <PaginationItem {...item} onClick={(e) => handlePagination(e, item)} />
      )}
    />
  );
};

export default PaginationComponent;
