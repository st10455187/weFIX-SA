import React, { createContext, useState } from 'react';

export const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const [reports, setReports] = useState([]); // ✅ empty array

  const addReport = (newReport) => {
    setReports((prevReports) => [newReport, ...prevReports]);
  };

  return (
    <ReportContext.Provider value={{ reports, addReport }}>
      {children}
    </ReportContext.Provider>
  );
};
