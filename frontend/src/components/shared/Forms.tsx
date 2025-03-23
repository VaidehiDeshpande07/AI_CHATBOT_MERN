import React, { useState } from "react";


const Forms: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        feedback: "",
        stockItem: "",
        quantity: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitted Data:", formData);
    };

    return (
        <div className="page-container">
            <h2 className="heading">Forms Section</h2>
            <form className="form-container card" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Your Name" onChange={handleChange} />
                <input type="email" name="email" placeholder="Your Email" onChange={handleChange} />
                <textarea name="feedback" placeholder="Feedback" onChange={handleChange}></textarea>
                <input type="text" name="stockItem" placeholder="Stock Item Name" onChange={handleChange} />
                <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} />
                <button type="submit" className="btn">Submit</button>
            </form>
        </div>
    );
};

export default Forms;




<style>
{`
  .form-container {
    width: 60%;
    margin: 50px auto;
    padding: 40px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }

  .form-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #444;
    text-align: center;
    margin-bottom: 25px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-label {
    font-size: 1.5rem;
    font-weight: bold;
    display: block;
    margin-bottom: 10px;
  }

  .form-input {
    width: 100%;
    padding: 15px;
    font-size: 1.2rem;
    border: 2px solid #007bff;
    border-radius: 8px;
    outline: none;
    transition: 0.3s;
  }

  .form-input:focus {
    border-color: #0056b3;
    box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
  }

  .form-button {
    width: 100%;
    padding: 15px;
    font-size: 1.5rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.3s;
  }

  .form-button:hover {
    background: #0056b3;
  }
`}
</style>

