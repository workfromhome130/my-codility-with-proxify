import React, { useState } from "react";

const MyTabComponent = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = React.Children.map(children, (child, index) => {
    const title = child.props.title;
    return (
      <button
        key={`tab-${index}`}
        isActive={activeIndex === index}
        onClick={() => setActiveIndex(index)}
        className={activeIndex === index ? "btn-active" : "btn"}
        disabled={activeIndex === index}
      >
        {title}
      </button>
    );
  });

  const view = React.Children.map(children, (child, index) => {
    const content = child.props.children;
    return <div className="views"> {content} </div>;
  });

  return (
    <div className="tabs">
      {tabs}
      {view[activeIndex]}
    </div>
  );
};

export default MyTabComponent;
