import React, { useState } from 'react';
import t from '../slides/pddg.pdf'

const PdfViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <iframe src={t} width="100%" height="500px" />
    </div>
  );
};

export default PdfViewer;
