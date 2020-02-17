import React,{ useState, useEffect } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const range = (from, to, step = 1) => {
    let i = from;
    const range = [];
  
    while (i <= to) {
      range.push(i);
      i += step;
    }
  
    return range;
};

export default ({totalRecords, pageLimit, pageNeighbours, onPageChanged, currentPage}) => {
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
      setTotalPages(Math.ceil(totalRecords / pageLimit));
    }, [currentPage, totalRecords]);
  
    const fetchPageNumbers = () => {
        const totalNumbers = pageNeighbours * 2 + 3;
        const totalBlocks = totalNumbers + 2;
    
        if (totalPages > totalBlocks) {
          const startPage = Math.max(2, currentPage - pageNeighbours);
          const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
    
          let pages = range(startPage, endPage);
    
          const hasLeftSpill = startPage > 2;
          const hasRightSpill = totalPages - endPage > 1;
          const spillOffset = totalNumbers - (pages.length + 1);
    
          switch (true) {
            case hasLeftSpill && !hasRightSpill: {
              const extraPages = range(startPage - spillOffset, startPage - 1);
              pages = [ ...extraPages, ...pages];
              break;
            }
            case hasLeftSpill && hasRightSpill:
            default: {
              pages = [...pages];
              break;
            }
          }
          return [1, ...pages, totalPages];
        }
        return range(1, totalPages);
    };
  
    const pages = fetchPageNumbers() || [];
    return (
        <Pagination aria-label="Page navigation">
            <PaginationItem disabled={currentPage <= 1}>
                <PaginationLink onClick={e => onPageChanged(e, currentPage - 1)} aria-label="Previous" previous />
            </PaginationItem>
            {pages.map((page, index) => {
            return (
                <PaginationItem active={currentPage === page} key={`pagi${index}`}>
                    <PaginationLink onClick={e => onPageChanged(e, page)}>
                        {page}
                        </PaginationLink>
                    </PaginationItem>
                );
            })}
            <PaginationItem disabled={currentPage >= totalPages}>
                <PaginationLink onClick={e => onPageChanged(e, currentPage + 1)} aria-label="Next" next />
            </PaginationItem>
        </Pagination>
    )
}