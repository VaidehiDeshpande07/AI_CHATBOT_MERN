import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";


const data = [
    { name: "Q1", Sales: 4000, Expenses: 2400 },
    { name: "Q2", Sales: 3000, Expenses: 1398 },
    { name: "Q3", Sales: 2000, Expenses: 9800 },
    { name: "Q4", Sales: 2780, Expenses: 3908 }
];

const Graphs: React.FC = () => {
    return (
        <div className="page-container">
            <h2 className="heading">ERP Data Visualization</h2>
            <div className="card">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <XAxis dataKey="name" stroke="white" />
                        <YAxis stroke="white" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Sales" fill="#00C49F" />
                        <Bar dataKey="Expenses" fill="#FFBB28" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Graphs;


<style>
{`
  .graph-container {
    width: 90%;
    height: 600px;
    margin: 50px auto;
    padding: 30px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  }

  .graph-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
  }

  .recharts-wrapper {
    width: 100%;
    height: 100%;
  }
`}
</style>

