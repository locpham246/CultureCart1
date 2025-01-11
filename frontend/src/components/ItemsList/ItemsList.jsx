import React, { useState, useEffect } from "react";
import "./ItemsList.scss";
import item1 from "../../assets/images/item1.png";
import item2 from "../../assets/images/item2.png";
import item3 from "../../assets/images/item3.png";
import item4 from "../../assets/images/item4.png";
import item5 from "../../assets/images/item5.png";
import item6 from "../../assets/images/item6.png";
import item7 from "../../assets/images/item7.png";
import item8 from "../../assets/images/item8.png";
import item9 from "../../assets/images/item9.png";
import item10 from "../../assets/images/item10.png";
import item11 from "../../assets/images/item11.png";

const Collection = ({
  items = [],
  itemsPerPage = 6,
  gridColumns = 6,
  title = "Search Results",
  showArrows = true,
  customStyles = {},
  searchQuery = "",  
}) => {
  const allItems = items.length > 0 ? items : [
    { src: item1, name: "Shin Noodles", price: "$12.99" },
    { src: item2, name: "Mama la Beef Pho Broth Concentrate", price: "$8.50" },
    { src: item3, name: "Do Ghazal Pure Ceylon Tea", price: "$5.00" },
    { src: item4, name: "Halva Pistachio Cortas", price: "$7.99" },
    { src: item5, name: "Priya Wheat Rawa Banku Mix Flour", price: "$3.49" },
    { src: item6, name: "Shin Light Noodles", price: "$11.00" },
    { src: item7, name: "Sweet and Sour Tamarind", price: "$4.99" },
    { src: item8, name: "Chakki Atta Whole Wheat Flour", price: "$6.25" },
    { src: item9, name: "Ziyad Brothers Ziyad Halva", price: "$9.80" },
    { src: item10, name: "Haldiram's Karachi Halwa", price: "$10.99" },
    { src: item11, name: "Daawat - Extra Long Basmati Rice", price: "$15.99" },
  ];

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const randomizedItems = shuffleArray(allItems);

  const [displayedItems, setDisplayedItems] = useState(randomizedItems.slice(0, itemsPerPage));
  const [remainingItems, setRemainingItems] = useState(randomizedItems.slice(itemsPerPage));
  const [historyStack, setHistoryStack] = useState([]);

  useEffect(() => {
    const filteredItems = allItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDisplayedItems(filteredItems.slice(0, itemsPerPage));
    setRemainingItems(filteredItems.slice(itemsPerPage));
  }, [searchQuery]); 

  const shiftLeft = () => {
    if (historyStack.length === 0) return;
    const restoredItem = historyStack[historyStack.length - 1];
    const removedItem = displayedItems[0];
    setDisplayedItems([...displayedItems.slice(1), restoredItem]);
    setRemainingItems((prev) => [removedItem, ...prev]);
    setHistoryStack((prev) => prev.slice(0, -1));
  };

  const shiftRight = () => {
    if (remainingItems.length === 0) return;
    const newItem = remainingItems[0];
    const updatedRemaining = remainingItems.slice(1);
    const removedItem = displayedItems[displayedItems.length - 1];
    setDisplayedItems([newItem, ...displayedItems.slice(0, -1)]);
    setRemainingItems([...updatedRemaining, removedItem]);
    setHistoryStack((prev) => [...prev, removedItem]);
  };

  return (
    <div className="collection searchCollection" style={customStyles}>
      {title && <h1>{title}</h1>}
      <div className="arrowContainer" style={{ display: showArrows ? "flex" : "none" }}>
        <button className="arrow left" onClick={shiftLeft}>&#10094;</button>
        <div className="collectionCard" style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}>
          {displayedItems.map((item, index) => (
            <div className="collectionItem searchItem" key={index}>
              <div className="collectionImg">
                <img src={item.src} alt={item.name} />
              </div>
              <p className="itemName">{item.name}</p>
              <p className="itemPrice">{item.price}</p>
            </div>
          ))}
        </div>
        <button className="arrow right" onClick={shiftRight}>&#10095;</button>
      </div>
    </div>
  );
};

export default Collection;
