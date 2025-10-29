import React, { useMemo, useState } from "react";
import "./SegmentModal.css"; 

const ALL_OPTIONS = [
  { label: "First Name", value: "first_name", type: "user" },
  { label: "Last Name", value: "last_name", type: "user" },
  { label: "Gender", value: "gender", type: "user" },
  { label: "Age", value: "age", type: "user" },
  { label: "Account Name", value: "account_name", type: "group" },
  { label: "City", value: "city", type: "group" },
  { label: "State", value: "state", type: "group" },
];

export default function SegmentModal({ onClose }) {
  const [segmentName, setSegmentName] = useState("");
  const [pendingOption, setPendingOption] = useState("");
  const [addedSchemas, setAddedSchemas] = useState([]);

  const selectedValues = useMemo(
    () => addedSchemas.map((s) => s.value).filter(Boolean),
    [addedSchemas]
  );

  const availableForMain = ALL_OPTIONS.filter(
    (opt) => !selectedValues.includes(opt.value)
  );

  const labelFor = (value) => ALL_OPTIONS.find((o) => o.value === value)?.label || "";
  const typeFor = (value) => ALL_OPTIONS.find((o) => o.value === value)?.type || "user";

  const handleAddNewSchema = () => {
    if (!pendingOption) return;
    const id = Date.now() + Math.random();
    setAddedSchemas((prev) => [...prev, { id, value: pendingOption }]);
    setPendingOption("");
  };

  const handleChangeSchemaValue = (id, newValue) => {
    setAddedSchemas((prev) =>
      prev.map((s) => (s.id === id ? { ...s, value: newValue } : s))
    );
  };

  const handleRemoveSchema = (id) => {
    setAddedSchemas((prev) => prev.filter((s) => s.id !== id));
  };

  const optionsForDropdown = (id) => {
    const otherSelected = addedSchemas
      .filter((s) => s.id !== id)
      .map((s) => s.value);
    return ALL_OPTIONS.filter((opt) => !otherSelected.includes(opt.value));
  };

  const handleSaveSegment = async () => {
    const payload = {
      segment_name: segmentName,
      schema: addedSchemas.map((s) => ({
        [s.value]: labelFor(s.value),
      })),
    };
    console.log("Payload to send:", payload);
    try {
      const res = await fetch("http://localhost:4000/api/save-segment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        alert("Segment saved successfully!");
        onClose();
      } else {
        alert("Error saving segment");
      }
    } catch (e) {
      console.error(e);
      alert("Network error");
    }
  };

  return (
    <div className="drawer-overlay">
      <div className="drawer">
        <div className="drawer-header">
          <button className="back-btn" onClick={onClose}>
            ←
          </button>
          <h2>Saving Segment</h2>
        </div>

        <div className="drawer-body">
          <label className="field">
            <div className="field-label">Enter the Name of the Segment</div>
            <input
              type="text"
              placeholder="Name of the segment"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
            />
          </label>

          <p className="info-text">
            To save your segment, you need to add the schemas to build the query
          </p>

          <div className="legend">
            <span className="dot user"></span> User Traits
            <span className="dot group" style={{ marginLeft: "1rem" }}></span>{" "}
            Group Traits
          </div>

          <div className="schema-section">
            {addedSchemas.map((item) => (
              <div className="schema-row" key={item.id}>
                <span
                  className={`dot ${
                    typeFor(item.value) === "group" ? "group" : "user"
                  }`}
                ></span>
                <select
                  value={item.value}
                  onChange={(e) =>
                    handleChangeSchemaValue(item.id, e.target.value)
                  }
                >
                  <option value="">Select schema</option>
                  {optionsForDropdown(item.id).map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveSchema(item.id)}
                >
                  –
                </button>
              </div>
            ))}

            <div className="schema-row add-new">
              <span className="dot"></span>
              <select
                value={pendingOption}
                onChange={(e) => setPendingOption(e.target.value)}
              >
                <option value="">Add schema to segment</option>
                {availableForMain.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <button
                className="remove-btn"
                onClick={() => setPendingOption("")}
                disabled={!pendingOption}
              >
                –
              </button>
            </div>

            <button
              className="add-link"
              disabled={!pendingOption}
              onClick={handleAddNewSchema}
            >
              + Add new schema
            </button>
          </div>
        </div>

        <div className="drawer-footer">
          <button className="save-btn" onClick={handleSaveSegment}>
            Save the Segment
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
