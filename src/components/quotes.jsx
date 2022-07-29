import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";

const Quotes = ({ list, loaded, quote, quotesList, handleClick }) => { 
  //Paginations
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(quotesList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(quotesList.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, quotesList]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % quotesList.length;
    setItemOffset(newOffset);
  };

  if (list) {
    return loaded ? (
      <React.Fragment>
        <div className="quotesByAuthor">
          <h3>{quote.author}</h3>
          <div className="authorQuotes">
            {currentItems.map((quote) => (
              <p key={quote._id}>{`"${quote.content}"`}</p>
            ))}
          </div>
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="active"
          disabledLinkClassName="disabled"
        />
      </React.Fragment>
    ) : (
      <div className="spinner">
        <Spinner animation="border" />
        <p>Loading please wait...</p>
      </div>
    );
  } else {
    return loaded ? (
      <div className="quotes">
        <p>{`"${quote.content}"`}</p>
        <div onClick={handleClick} className="infos">
          <div className="infoName">
            <h3>{quote.author}</h3>
            <h4>{quote.tags[0]}</h4>
          </div>
          <i className="fa-solid fa-arrow-right-long"></i>
        </div>
      </div>
    ) : (
      <div className="spinner">
        <Spinner animation="border" />
        <p>Loading please wait...</p>
      </div>
    );
  }
};

export default Quotes;
