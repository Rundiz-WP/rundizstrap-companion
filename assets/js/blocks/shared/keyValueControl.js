/**
 * Key value controls for common use in blocks.
 * 
 * @package bbfse-plugin
 * @since 0.0.1
 */


import { __ } from '@wordpress/i18n';

import {
    TextControl,
    Button,
} from '@wordpress/components';

import { useEffect, useState } from '@wordpress/element';

/**
 * Key-Value input control.
 */
export default function KeyValueControl ({ label, value, onChange }) {
    // Ensure value is an object
    const attributes = value || {};
    const [localAttributes, setLocalAttributes] = useState([]);

    useEffect(() => {
        // Convert object to array for editing
        const attrsArray = Object.entries(attributes).map(([key, val]) => ({ key, val }));
        setLocalAttributes(attrsArray);
    }, [value]);

    const updateAttribute = (index, field, newValue) => {
        const newAttributes = [...localAttributes];
        newAttributes[index][field] = newValue;
        setLocalAttributes(newAttributes);

        // Check for duplicate keys
        const keys = newAttributes.map(attr => attr.key);
        const hasDuplicates = keys.some((key, i) => keys.indexOf(key) !== i);

        if (!hasDuplicates) {
            const attrObject = newAttributes.reduce((obj, item) => {
                if (item.key) obj[item.key] = item.val;
                return obj;
            }, {});
            onChange(attrObject);
        }
    };

    const addAttribute = () => {
        const newAttributes = [...localAttributes, { key: '', val: '' }];
        setLocalAttributes(newAttributes);
    };

    const removeAttribute = (index) => {
        const newAttributes = localAttributes.filter((_, i) => i !== index);
        setLocalAttributes(newAttributes);
        const attrObject = newAttributes.reduce((obj, item) => {
            if (item.key) obj[item.key] = item.val;
            return obj;
        }, {});
        onChange(attrObject);
    };

    return (
        <div className="components-base-control">
            <label className="components-base-control__label">{label}</label>
            {localAttributes.map((attr, index) => (
                <div key={index} style={{ display: 'flex', marginBottom: '5px', gap: '5px' }}>
                    <TextControl
                        placeholder={__('Key', 'bbfse-plugin')}
                        value={attr.key}
                        onChange={(val) => updateAttribute(index, 'key', val)}
                    />
                    <TextControl
                        placeholder={__('Value', 'bbfse-plugin')}
                        value={attr.val}
                        onChange={(val) => updateAttribute(index, 'val', val)}
                    />
                    <Button
                        isSmall
                        isDestructive
                        variant="secondary"
                        icon="trash"
                        onClick={() => removeAttribute(index)}
                        label={__('Remove', 'bbfse-plugin')}
                    />
                </div>
            ))}
            <Button variant="secondary" onClick={addAttribute} isSmall>
                {__('Add attribute', 'bbfse-plugin')}
            </Button>
        </div>
    );
};
