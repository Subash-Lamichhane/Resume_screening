
import React, { useState } from 'react';

const categories = [
  'Java Developer',
  'Testing',
  'DevOps Engineer',
  'Python Developer',
  'Web Designing',
  'HR',
  'Hadoop',
  'Blockchain',
  'ETL Developer',
  'Operations Manager',
  'Data Science',
  'Sales',
  'Mechanical Engineer',
  'Arts',
  'Database',
  'Electrical Engineering',
  'Health and Fitness',
  'PMO',
  'Business Analyst',
  'DotNet Developer',
  'Automation Testing',
  'Network Security Engineer',
  'SAP Developer',
  'Civil Engineer',
  'Advocate',
];

const CategorySelector = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onSelectCategory(category); // Pass selected category to parent
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100">
      <h1 className="text-xl font-bold mb-4">Select Job Category</h1>
      <select
        className="border border-gray-300 rounded-md p-2"
        value={selectedCategory}
        onChange={handleChange}
      >
        <option value="">Select job category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      {/* {selectedCategory && (
        <p className="mt-4 text-lg">
          You selected: <span className="font-semibold">{selectedCategory}</span>
        </p>
      )} */}
    </div>
  );
};

export default CategorySelector;
