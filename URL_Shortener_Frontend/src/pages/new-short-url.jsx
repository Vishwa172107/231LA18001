import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from "../utils/api.js";
import { PlusCircle } from 'react-bootstrap-icons';

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

    // Start with one empty form entry
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
        <div className="container">
            <form onSubmit={handleSubmit}>
                {formData.map((entry, index) => (
                    <div key={index} className="url-form">
                        {Object.entries(formStructure).map(([key, config]) => (
                            <div key={key} className="form_group">
                                <label>{config.label}</label>
                                <input
                                    type={config.type}
                                    placeholder={config.placeholder}
                                    value={entry[key] || ""}
                                    onChange={(e) => handleChange(e, index, key)}
                                    required={config.required}
                                    pattern={config.pattern}
                                    title={config.title}
                                />
                            </div>
                        ))}
                        <hr />
                    </div>
                ))}

                {formData.length < 5 && (
                    <PlusCircle
                        size={30}
                        color="blue"
                        onClick={addNewForm}
                        style={{ cursor: 'pointer' }}
                    />
                )}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
