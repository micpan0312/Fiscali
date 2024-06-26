import React, { useState, useEffect, useRef } from "react";
import { Img, Text, Heading, Button, SelectBox } from "../../components";
import "./index.css";

interface CellComponentProps {
  initialValue: string;
  onChange: (value: string) => void;
  category: string;
}

const CellComponent: React.FC<CellComponentProps> = ({
  initialValue,
  onChange,
  category,
}) => {
  // const CellComponent: React.FC<CellComponentProps> = ({ initialValue }) => {
  const [value, setValue] = useState<string>(initialValue);
  const textareaRef = useRef(null);

  // useEffect(() => {
  //   setValue(initialValue);
  // }, [value]);

  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to allow shrinking
      textareaRef.current.style.height = "auto";
      // Set height to the scrollHeight plus some extra space for padding/border
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    setValue(initialValue);
  }, [value, initialValue]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Text as="p" className="flex items-center !font-normal bg-white-A700">
      <div className="textarea-container">
        <textarea
          ref={textareaRef}
          className="text-left resize-none overflow-hidden"
          value={value}
          onChange={handleChange}
          style={{
            width: "100%",
            // boxSizing: 'border-box',
            minHeight: "auto",
            lineHeight: "1.1",
            padding: "1px",
            display: "flex",
            alignItems: "center", // Vertically center text
            // justifyContent: 'flex-start',
            verticalAlign: "middle",
          }}
        />
      </div>
    </Text>
  );
};

export default CellComponent;
