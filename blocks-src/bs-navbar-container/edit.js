/**
 * Bootstrap navbar container block edit component.
 * 
 * @package bbfse-plugin
 * @since 0.0.1
 */


import { __ } from '@wordpress/i18n';

import { useBlockProps, InnerBlocks, InspectorControls, useInnerBlocksProps } from '@wordpress/block-editor';

import {
    SelectControl,
    TextControl,
    Button,
    Icon,
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
        tagName,
        dataAttributes,
        ariaAttributes,
        containerTagName,
        containerClassName,
        containerDataAttributes,
        containerAriaAttributes
    } = attributes;

    const blockProps = useBlockProps({
        className: 'navbar'
    });

    const innerBlocksProps = useInnerBlocksProps({
        className: containerClassName
    });

    const TagName = tagName;
    const ContainerTagName = containerTagName;

    // Helper to check if objects are empty
    const isObjectEmpty = (obj) => Object.keys(obj || {}).length === 0;

    return (
        <>
            <InspectorControls>
                <ToolsPanel
                    label={__('Navbar Settings', 'bbfse-plugin')}
                    resetAll={() => setAttributes({
                        tagName: 'nav',
                        dataAttributes: {},
                        ariaAttributes: {}
                    })}
                >
                    <ToolsPanelItem
                        hasValue={() => tagName !== 'nav'}
                        label={__('Tag Name', 'bbfse-plugin')}
                        onDeselect={() => setAttributes({ tagName: 'nav' })}
                        isShownByDefault
                    >
                        <SelectControl
                            label={__('Tag Name', 'bbfse-plugin')}
                            value={tagName}
                            options={[
                                { label: 'nav', value: 'nav' },
                                { label: 'div', value: 'div' },
                                { label: 'header', value: 'header' },
                            ]}
                            onChange={(value) => setAttributes({ tagName: value })}
                        />
                    </ToolsPanelItem>

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
                    label={__('Container Settings', 'bbfse-plugin')}
                    resetAll={() => setAttributes({
                        containerTagName: 'div',
                        containerClassName: 'container-fluid',
                        containerDataAttributes: {},
                        containerAriaAttributes: {}
                    })}
                >
                    <ToolsPanelItem
                        hasValue={() => containerTagName !== 'div'}
                        label={__('Container Tag Name', 'bbfse-plugin')}
                        onDeselect={() => setAttributes({ containerTagName: 'div' })}
                        isShownByDefault
                    >
                        <SelectControl
                            label={__('Container Tag Name', 'bbfse-plugin')}
                            value={containerTagName}
                            options={[
                                { label: 'div', value: 'div' },
                                { label: 'section', value: 'section' },
                            ]}
                            onChange={(value) => setAttributes({ containerTagName: value })}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => containerClassName !== 'container-fluid'}
                        label={__('Container Class', 'bbfse-plugin')}
                        onDeselect={() => setAttributes({ containerClassName: 'container-fluid' })}
                        isShownByDefault
                    >
                        <TextControl
                            label={__('Container Class', 'bbfse-plugin')}
                            value={containerClassName}
                            onChange={(value) => setAttributes({ containerClassName: value })}
                            help={__('Default is container-fluid. You can change to container, container-lg, etc.', 'bbfse-plugin')}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !isObjectEmpty(containerDataAttributes)}
                        label={__('Container data attributes', 'bbfse-plugin')}
                        onDeselect={() => setAttributes({ containerDataAttributes: {} })}
                        isShownByDefault
                    >
                        <KeyValueControl
                            label={__('Container data attributes', 'bbfse-plugin') + ' '}
                            value={containerDataAttributes}
                            onChange={(value) => setAttributes({ containerDataAttributes: value })}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !isObjectEmpty(containerAriaAttributes)}
                        label={__('Container aria attributes', 'bbfse-plugin')}
                        onDeselect={() => setAttributes({ containerAriaAttributes: {} })}
                        isShownByDefault
                    >
                        <KeyValueControl
                            label={__('Container aria attributes', 'bbfse-plugin') + ' '}
                            value={containerAriaAttributes}
                            onChange={(value) => setAttributes({ containerAriaAttributes: value })}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
            </InspectorControls>

            <TagName {...blockProps}>
                <ContainerTagName {...innerBlocksProps} />
            </TagName>
        </>
    );
}
