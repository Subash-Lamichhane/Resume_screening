import React from 'react';

const PredictionResults = ({ output, required_category }) => {
  if (!output) return null;

  // Parse the JSON output
  const results = JSON.parse(output);
  console.log(results)
  // Map results to include only relevant information, then sort by the required category probability
  const sortedResults = Object.entries(results)
    .map(([fileName, data]) => {
      const probabilities = JSON.parse(data.category_probabilities.replace(/'/g, '"'));
      return {
        fileName,
        predictedCategory: data.predicted_category,
        probabilities,
        requiredCategoryProbability: probabilities[required_category] || 0,
      };
    })
    .sort((a, b) => b.requiredCategoryProbability - a.requiredCategoryProbability);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg text-black max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ranked Results for {required_category} category</h2>
      {/* <h2>Required Category: {required_category}</h2> */}

      {sortedResults.map(({ fileName, predictedCategory, probabilities, requiredCategoryProbability }) => (
        <div key={fileName} className="mb-8">
          {/* File Name */}
          <h3 className="text-xl font-bold text-gray-700">{fileName}</h3>

          {/* Predicted Category */}
          <div className="bg-blue-50 p-4 rounded-md my-4">
            <h4 className="text-lg font-semibold text-blue-700">Actual Predicted Category:</h4>
            <p className="text-2xl font-medium text-blue-800">{predictedCategory}</p>
          </div>

          {/* Required Category Probability */}
          <div className="bg-green-50 p-4 rounded-md my-4">
            <h4 className="text-lg font-semibold text-green-700">Match Probability:</h4>
            <p className="text-xl font-medium text-green-800">
              {(requiredCategoryProbability * 100).toFixed(2)}%
            </p>
          </div>

          {/* Category Probabilities */}
          {/* <div className="bg-gray-100 p-4 rounded-md">
            <h4 className="text-lg font-bold text-gray-700 mb-2">Category Probabilities:</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(probabilities).map(([category, probability]) => (
                <div key={category} className="flex justify-between">
                  <span className="text-gray-600">{category}</span>
                  <span className="text-gray-900 font-medium">
                    {(probability * 100).toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </div> */}

        </div>
      ))}

      {sortedResults.length === 0 && (
        <p className="text-gray-500">No resumes found.</p>
      )}
    </div>
  );
};

export default PredictionResults;