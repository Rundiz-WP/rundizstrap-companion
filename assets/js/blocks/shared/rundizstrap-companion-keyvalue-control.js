/**
 * Key value controls for common use in blocks.
 * 
 * @package rundizstrap-companion
 * @since 0.0.1
 */


import { __ } from '@wordpress/i18n';

import {
    TextControl,
    Button,
} from '@wordpress/components';

import { useEffect, useState } from '@wordpress/element';

import {
    rundizstrap_companion_sanitizeAttributeKey,
    rundizstrap_companion_sanitizeAttributeValue,
} from './rundizstrap-companion-attributes.js';


/**
 * Key-Value input control.
 * 
 * @since 0.0.1
 * @param {Object} props Component props.
 * @param {string} props.label The label text.
 * @param {object} props.value Key-value object.
 * @param {object} props.onChange The onchange callback.
 * @param {string} props.prefix attribute prefix. For example: `aria-`, `data-`.
 */
export default function RundizStrapCompanionKeyValueCtrl ({ label, value, onChange, prefix = '' }) {
    // Ensure value is an object
    const attributes = value || {};
    const [localAttributes, setLocalAttributes] = useState([]);

    useEffect(() => {
        // Convert object to array for editing
        const attrsArray = Object.entries(attributes).map(([key, val]) => ({ key, val }));
        setLocalAttributes(attrsArray);
    }, [value]);

    const toSanitizedAttributesObject = (items) => items.reduce((obj, item) => {
        const sanitizedKey = rundizstrap_companion_sanitizeAttributeKey(item.key, prefix);

        if (!sanitizedKey) {
            return obj;
        }

        obj[sanitizedKey] = rundizstrap_companion_sanitizeAttributeValue(item.val);

        return obj;
    }, {});

    const commitAttributes = (items) => {
        // Check duplicate keys using sanitized format to prevent collisions.
        const keys = items
            .map((attr) => rundizstrap_companion_sanitizeAttributeKey(attr.key, prefix))
            .filter((key) => key !== '');
        const hasDuplicates = keys.some((key, i) => keys.indexOf(key) !== i);

        if (!hasDuplicates) {
            onChange(toSanitizedAttributesObject(items));
        }
    };

    const updateAttribute = (index, field, newValue) => {
        const newAttributes = [...localAttributes];
        newAttributes[index][field] = newValue;
        setLocalAttributes(newAttributes);
    };

    const addAttribute = () => {
        const newAttributes = [...localAttributes, { key: '', val: '' }];
        setLocalAttributes(newAttributes);
    };

    const removeAttribute = (index) => {
        const newAttributes = localAttributes.filter((_, i) => i !== index);
        setLocalAttributes(newAttributes);
        onChange(toSanitizedAttributesObject(newAttributes));
    };

    return (
        <div className="components-base-control">
            <label className="components-base-control__label">{label}</label>
            {localAttributes.map((attr, index) => (
                <div key={index} style={{ display: 'flex', marginBottom: '5px', gap: '5px' }}>
                    <TextControl
                        placeholder={__('Key', 'rundizstrap-companion')}
                        value={attr.key}
                        onChange={(val) => updateAttribute(index, 'key', val)}
                        onBlur={() => commitAttributes(localAttributes)}
                    />
                    <TextControl
                        placeholder={__('Value', 'rundizstrap-companion')}
                        value={attr.val}
                        onChange={(val) => updateAttribute(index, 'val', val)}
                        onBlur={() => commitAttributes(localAttributes)}
                    />
                    <Button
                        size="small"
                        isDestructive
                        variant="secondary"
                        icon="trash"
                        onClick={() => removeAttribute(index)}
                        label={__('Remove', 'rundizstrap-companion')}
                    />
                </div>
            ))}
            <Button variant="secondary" onClick={addAttribute} size="small">
                {__('Add attribute', 'rundizstrap-companion')}
            </Button>
        </div>
    );
};// RundizStrapCompanionKeyValueCtrl
