/**
 * Bootstrap navbar toggler button block edit component.
 * 
 * @package bbfse-plugin
 * @since 0.0.1
 */


import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    Button,
    __experimentalToolsPanel as ToolsPanel,
    __experimentalToolsPanelItem as ToolsPanelItem
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

/**
 * Key-Value input control.
 */
const KeyValueControl = ({ label, value, onChange }) => {
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

export default function Edit({ attributes, setAttributes }) {
    const {
        dataAttributes,
        ariaAttributes,
        iconClassName,
        iconDataAttributes,
        iconAriaAttributes
    } = attributes;

    const blockProps = useBlockProps({
        className: 'navbar-toggler',
        type: 'button'
    });

    // Helper to check if objects are empty
    const isObjectEmpty = (obj) => Object.keys(obj || {}).length === 0;

    return (
        <>
            <InspectorControls>
                <ToolsPanel
                    label={__('Button Settings', 'bbfse-plugin')}
                    resetAll={() => setAttributes({
                        dataAttributes: {},
                        ariaAttributes: {}
                    })}
                >
                    <ToolsPanelItem
                        hasValue={() => !isObjectEmpty(dataAttributes)}
                        label={__('Data attributes', 'bbfse-plugin')}
                        onDeselect={() => setAttributes({ dataAttributes: {} })}
                        isShownByDefault
                    >
                        <KeyValueControl
                            label={__('Data attributes', 'bbfse-plugin') + ' '}
                            value={dataAttributes}
                            onChange={(value) => setAttributes({ dataAttributes: value })}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !isObjectEmpty(ariaAttributes)}
                        label={__('Aria attributes', 'bbfse-plugin')}
                        onDeselect={() => setAttributes({ ariaAttributes: {} })}
                        isShownByDefault
                    >
                        <KeyValueControl
                            label={__('Aria attributes', 'bbfse-plugin') + ' '}
                            value={ariaAttributes}
                            onChange={(value) => setAttributes({ ariaAttributes: value })}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>

                <ToolsPanel
                    label={__('Icon Settings', 'bbfse-plugin')}
                    resetAll={() => setAttributes({
                        iconClassName: '',
                        iconDataAttributes: {},
                        iconAriaAttributes: {}
                    })}
                >
                    <ToolsPanelItem
                        hasValue={() => iconClassName !== ''}
                        label={__('Icon Additional Class(es)', 'bbfse-plugin')}
                        onDeselect={() => setAttributes({ iconClassName: '' })}
                        isShownByDefault
                    >
                        <TextControl
                            label={__('Icon Additional Class(es)', 'bbfse-plugin')}
                            value={iconClassName}
                            onChange={(value) => setAttributes({ iconClassName: value })}
                            help={__('Add additional classes to the icon span.', 'bbfse-plugin')}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !isObjectEmpty(iconDataAttributes)}
                        label={__('Icon data attributes', 'bbfse-plugin')}
                        onDeselect={() => setAttributes({ iconDataAttributes: {} })}
                        isShownByDefault
                    >
                        <KeyValueControl
                            label={__('Icon data attributes', 'bbfse-plugin') + ' '}
                            value={iconDataAttributes}
                            onChange={(value) => setAttributes({ iconDataAttributes: value })}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !isObjectEmpty(iconAriaAttributes)}
                        label={__('Icon aria attributes', 'bbfse-plugin')}
                        onDeselect={() => setAttributes({ iconAriaAttributes: {} })}
                        isShownByDefault
                    >
                        <KeyValueControl
                            label={__('Icon aria attributes', 'bbfse-plugin') + ' '}
                            value={iconAriaAttributes}
                            onChange={(value) => setAttributes({ iconAriaAttributes: value })}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
            </InspectorControls>

            <button {...blockProps}>
                <span className={`navbar-toggler-icon ${iconClassName || ''}`.trim()}></span>
            </button>
        </>
    );
}
