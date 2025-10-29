import React, { useState } from 'react';
import SegmentModal from './SegmentModal.js';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="app-container">
      <h1>Segment Builder</h1>
      <button className="save-segment-btn" onClick={() => setIsOpen(true)}>
        Save segment
      </button>

      {isOpen && (
        <SegmentModal
          onClose={() => setIsOpen(false)}
        />
      )}

      <footer style={{ marginTop: 40 }}>
        <small>Reference: CustomerLabs React instructions.</small>
      </footer>
    </div>
  );
}
