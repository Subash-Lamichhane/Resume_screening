import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ResumeResultsTable = ({ results }) => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const toggleRow = (fileName) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(fileName)) {
      newExpanded.delete(fileName);
    } else {
      newExpanded.add(fileName);
    }
    setExpandedRows(newExpanded);
  };

  const calculateAverage = (fileData) => {
    return ((
      parseFloat(fileData.cosine_similarity_score) +
      parseFloat(fileData.skills_score) +
      parseFloat(fileData.degree_score) +
      parseFloat(fileData.exp_score)
    ) / 4).toFixed(2);
  };

  return (
    <div className="results-section mt-6 bg-white shadow-lg p-6 rounded-lg max-w-7xl mx-auto overflow-x-auto mb-12">
      <h2 className="text-2xl font-bold text-center mb-4">Resume Results</h2>
      <table className="w-full min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overall Score</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description Match</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skill Score</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Degree Score</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience Score</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Object.entries(results).map(([fileName, fileData]) => (
            <React.Fragment key={fileName}>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{fileName}</td>
                {fileData.error ? (
                  <td colSpan={4} className="px-6 py-4">
                    <div className="text-red-600">Error: {fileData.error}</div>
                  </td>
                ) : (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {calculateAverage(fileData)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {fileData.cosine_similarity_score}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {fileData.skills_score}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {fileData.degree_score}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {fileData.exp_score}
                    </td>
                  </>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button
                    onClick={() => toggleRow(fileName)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {expandedRows.has(fileName) ? (
                      <>
                        Hide Summary
                        <ChevronUp className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Show Summary
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>
                </td>
              </tr>
              {expandedRows.has(fileName) && !fileData.error && (
                <tr className="bg-gray-50">
                  <td colSpan={6} className="px-6 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Skills</h3>
                        <p className="text-gray-600">{fileData.info.SKILLS.join(', ')}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Soft Skills</h3>
                        <p className="text-gray-600">
                          {fileData.info["SoftSkills"].length > 0
                            ? fileData.info["SoftSkills"].join(', ')
                            : "Not found"}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Degree</h3>
                        <p className="text-gray-600">
                          {fileData.info.Degree.length > 0
                            ? fileData.info.Degree.join(', ')
                            : "Not found"}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Education</h3>
                        <p className="text-gray-600">
                          {fileData.info.Major.length > 0
                            ? fileData.info.Major.join(', ')
                            : "Not found"}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Experience</h3>
                        <p className="text-gray-600">
                          {fileData.info.Exp_Year
                            ? fileData.info.Exp_Year+ " Years"
                            : "Not found"}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResumeResultsTable;