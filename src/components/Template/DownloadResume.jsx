import React from 'react';
import PropTypes from 'prop-types';

const { BASE_URL } = import.meta.env;

// The PDF lives in public/Mikhil_Wankhede_Resume.pdf - replace that file to update it.
export const RESUME_PDF = `${BASE_URL}Mikhil_Wankhede_Resume.pdf`;

const DownloadResume = ({ className, children }) => (
  <a className={className} href={RESUME_PDF} download="Mikhil_Wankhede_Resume.pdf">
    {children}
  </a>
);

DownloadResume.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

DownloadResume.defaultProps = {
  className: 'btn btn-ghost',
  children: 'Download resume (PDF)',
};

export default DownloadResume;
