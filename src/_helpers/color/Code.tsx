import React from 'react';

const Code = ({ value }: { value: string }) => {
  return (
    <div>
      <textarea
        readOnly
        value={value}
        rows={10}
        cols={50}
        style={{
          fontFamily: 'monospace',
          border: '1px solid #ccc',
          padding: '10px',
        }}
        placeholder="Enter your code here..."
      />
    </div>
  );
};

export default Code;
