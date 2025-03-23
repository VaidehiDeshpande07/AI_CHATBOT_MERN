import React, { useState } from "react";
import "./cssForGraphFormTabs.css";

const Tabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState("Sales");

    const tabContent: { [key: string]: string } = {
        Sales: "Sales data and reports go here.",
        Finance: "Financial overview, transactions, and analytics.",
        HR: "Employee management, payroll, and HR policies.",
        Inventory: "Stock levels, product availability, and orders."
    };

    return (
        <div className="page-container">
            <h2 className="heading">ERP Modules</h2>
            <div className="tabs-container">
                {Object.keys(tabContent).map((tab) => (
                    <button
                        key={tab}
                        className={`tab-button ${activeTab === tab ? "active" : ""}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="tab-content card">{tabContent[activeTab]}</div>
        </div>
    );
};

export default Tabs;



