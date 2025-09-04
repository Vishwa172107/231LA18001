import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from "../utils/api.js";
import { PlusCircle } from 'react-bootstrap-icons';
import '../styles/NewShortUrl.css';

export const NewShortUrl = () => {
    const formStructure = {
        originalUrl: {
            label: 'Original URL',
            placeholder: 'Original URL',
            type: 'url',
            required: true,
            pattern: '^https?:\\/\\/[\\w.-]+(?:\\.[\\w.-]+)+[/#?]?.*$',
            title: 'Enter a valid URL starting with http:// or https://'
        },
        customAlias: {
            label: 'Custom Alias',
            placeholder: 'Custom Alias (optional)',
            type: 'text',
            required: false,
            pattern: '^[a-zA-Z0-9_-]{3,30}$',
            title: 'Alias must be 3–30 characters: letters, numbers, hyphen, underscore only'
        },
        expirationTime: {
            label: 'Expiration Time',
            placeholder: 'Expiration Time (in minutes)',
            type: 'number',
            required: false,
            pattern: '^[1-9][0-9]*$',
            title: 'Must be a positive number (in minutes)'
        }
    };

    const [formData, setFormData] = useState([{}]);
    const navigate = useNavigate();

    const handleChange = (e, index, key) => {
        const { value } = e.target;
        const updatedFormData = [...formData];
        updatedFormData[index] = {
            ...updatedFormData[index],
            [key]: value
        };
        setFormData(updatedFormData);
    };

    const addNewForm = () => {
        setFormData([...formData, {}]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = api.ShortenerURL;
        axios.post(url, formData)
            .then(response => {
                navigate("/shortened-result", { state: { newUrls: response.data.urls } });
            })
            .catch(error => {
                console.error('There was an error shortening the URL!', error);
            });
    };

    return (
        <div className="shortener-container">
            <form className="shortener-form" onSubmit={handleSubmit}>
                {formData.map((entry, index) => (
                    <div key={index} className="shortener-form-block">
                        {Object.entries(formStructure).map(([key, config]) => (
                            <div key={key} className="form-group">
                                <label className="form-label">{config.label}</label>
                                <input
                                    type={config.type}
                                    className="form-input"
                                    placeholder={config.placeholder}
                                    value={entry[key] || ""}
                                    onChange={(e) => handleChange(e, index, key)}
                                    required={config.required}
                                    pattern={config.pattern}
                                    title={config.title}
                                />
                            </div>
                        ))}
                        <hr className="divider" />
                    </div>
                ))}

                {formData.length < 5 && (
                    <div className="add-form-btn">
                        <PlusCircle
                            size={30}
                            color="blue"
                            onClick={addNewForm}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                )}

                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
};
