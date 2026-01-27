/**
 * Bootstrap button block edit component.
 *
 * @package bbfse-plugin
 * @since 0.0.1
 */

import { __, _x } from '@wordpress/i18n';

import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

import {
    ExternalLink,
    TextControl,
    ToggleControl,
    SelectControl,
    Notice,
    Button,
    __experimentalToolsPanel as ToolsPanel,
    __experimentalToolsPanelItem as ToolsPanelItem
} from '@wordpress/components';

import { useEffect, useState } from '@wordpress/element';

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

/**
 * Helper to convert attribute objects to props with prefixes.
 *
 * @param {Object} attributes Key-value pairs.
 * @param {string} prefix Prefix like 'data-' or 'aria-'.
 * @returns {Object} Props object.
 */
const attributesToProps = (attributes, prefix) => {
    const props = {};
    if (attributes) {
        Object.entries(attributes).forEach(([key, value]) => {
            if (key) {
                props[`${prefix}${key}`] = value;
            }
        });
    }
    return props;
};

export default function Edit({ attributes, setAttributes }) {
    const {
        tagName,
        textHtml,
        href,
        linkRole,
        linkTabIndex,
        dataAttributes,
        ariaAttributes,
        autofocus,
        disabled,
        form,
        formenctype,
        formmethod,
        formnovalidate,
        formtarget,
        name,
        type,
        value,
        className,
    } = attributes;

    useEffect(() => {
        if (className === undefined) {
            setAttributes({ className: 'btn' });
        }
    }, [className, setAttributes]);

    const TagName = tagName === 'a' ? 'a' : 'button';

    const hasBtnClass = (className || '')
        .split(/\s+/)
        .filter(Boolean)
        .some((item) => item.toLowerCase() === 'btn');

    const isObjectEmpty = (obj) => Object.keys(obj || {}).length === 0;

    const dataProps = attributesToProps(dataAttributes, 'data-');
    const ariaProps = attributesToProps(ariaAttributes, 'aria-');

    const blockProps = useBlockProps({
        ...dataProps,
        ...ariaProps,
        ...(tagName === 'a' && href ? { href } : {}),
        ...(tagName === 'a' && linkRole ? { role: linkRole } : {}),
        ...(tagName === 'a' && linkTabIndex ? { tabIndex: linkTabIndex } : {}),
        ...(tagName === 'a' ? { onClick: (event) => event.preventDefault() } : {}),
        ...(tagName === 'button' && autofocus ? { autoFocus: true } : {}),
        ...(tagName === 'button' && disabled ? { disabled: true } : {}),
        ...(tagName === 'button' && form ? { form } : {}),
        ...(tagName === 'button' && formenctype ? { formEncType: formenctype } : {}),
        ...(tagName === 'button' && formmethod ? { formMethod: formmethod } : {}),
        ...(tagName === 'button' && formnovalidate ? { formNoValidate: true } : {}),
        ...(tagName === 'button' && formtarget ? { formTarget: formtarget } : {}),
        ...(tagName === 'button' && name ? { name } : {}),
        ...(tagName === 'button' && type ? { type } : {}),
        ...(tagName === 'button' && value ? { value } : {}),
    });

    const formEncTypeOptions = [
        { label: __('Default', 'bbfse-plugin'), value: '' },
        { label: 'application/x-www-form-urlencoded', value: 'application/x-www-form-urlencoded' },
        { label: 'multipart/form-data', value: 'multipart/form-data' },
        { label: 'text/plain', value: 'text/plain' },
    ];

    const formMethodOptions = [
        { label: __('Default', 'bbfse-plugin'), value: '' },
        { label: 'get', value: 'get' },
        { label: 'post', value: 'post' },
        { label: 'dialog', value: 'dialog' },
    ];

    const typeOptions = [
        { label: 'button', value: 'button' },
        { label: 'submit', value: 'submit' },
        { label: 'reset', value: 'reset' },
    ];

    return (
        <>
            <InspectorControls>
                {tagName === 'a' && !href && (
                    <div style={{ padding: '0 16px', marginBottom: '16px' }}>
                        <Notice status="warning" isDismissible={false}>
                            {__('Please add an href value when using <a>.', 'bbfse-plugin')}
                        </Notice>
                    </div>
                )}
                {!hasBtnClass && (
                    <div style={{ padding: '0 16px', marginBottom: '16px' }}>
                        <Notice status="warning" isDismissible={false}>
                            {__('Please ensure the CSS class list contains the Bootstrap class \"btn\".', 'bbfse-plugin')}
                        </Notice>
                    </div>
                )}

                <ToolsPanel
                    label={__('Button Settings', 'bbfse-plugin')}
                    resetAll={() => setAttributes({
                        tagName: 'button',
                        textHtml: '',
                    })}
                >
                    <ToolsPanelItem
                        hasValue={() => tagName !== 'button'}
                        label={__('Tag Name', 'bbfse-plugin')}
                        onDeselect={() => setAttributes({ tagName: 'button' })}
                        isShownByDefault
                    >
                        <SelectControl
                            label={__('Tag Name', 'bbfse-plugin')}
                            value={tagName}
                            options={[
                                { label: '<button>', value: 'button' },
                                { label: '<a>', value: 'a' },
                            ]}
                            onChange={(value) => setAttributes({ tagName: value })}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() => textHtml !== ''}
                        label={__('Button text/HTML', 'bbfse-plugin')}
                        onDeselect={() => setAttributes({ textHtml: '' })}
                        isShownByDefault
                    >
                        <TextControl
                            label={__('Button text/HTML', 'bbfse-plugin')}
                            value={textHtml}
                            onChange={(value) => setAttributes({ textHtml: value })}
                            help={__('You can use text or HTML, e.g. <i class=\"bi bi-save\"></i> Save', 'bbfse-plugin')}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>

                {tagName === 'a' && (
                    <ToolsPanel
                        label={__('Link Attributes', 'bbfse-plugin')}
                        resetAll={() => setAttributes({
                            href: '',
                            linkRole: '',
                            linkTabIndex: '',
                        })}
                    >
                        <ToolsPanelItem
                            hasValue={() => href !== ''}
                            label={_x('Href', 'HTML attribute', 'bbfse-plugin')}
                            onDeselect={() => setAttributes({ href: '' })}
                            isShownByDefault
                        >
                            <TextControl
                                label={_x('Href', 'HTML attribute', 'bbfse-plugin')}
                                value={href}
                                onChange={(value) => setAttributes({ href: value })}
                                help={__('Required when using <a>.', 'bbfse-plugin')}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => linkRole !== ''}
                            label={_x('Role', 'HTML attribute', 'bbfse-plugin')}
                            onDeselect={() => setAttributes({ linkRole: '' })}
                            isShownByDefault
                        >
                            <TextControl
                                label={_x('Role', 'HTML attribute', 'bbfse-plugin')}
                                value={linkRole}
                                onChange={(value) => setAttributes({ linkRole: value })}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => linkTabIndex !== ''}
                            label={__('Tab index', 'bbfse-plugin')}
                            onDeselect={() => setAttributes({ linkTabIndex: '' })}
                            isShownByDefault
                        >
                            <TextControl
                                label={__('Tab index', 'bbfse-plugin')}
                                value={linkTabIndex}
                                onChange={(value) => setAttributes({ linkTabIndex: value })}
                            />
                        </ToolsPanelItem>
                    </ToolsPanel>
                )}

                {tagName === 'button' && (
                    <ToolsPanel
                        label={__('Button Attributes', 'bbfse-plugin')}
                        resetAll={() => setAttributes({
                            autofocus: false,
                            disabled: false,
                            form: '',
                            formenctype: '',
                            formmethod: '',
                            formnovalidate: false,
                            formtarget: '',
                            name: '',
                            type: 'button',
                            value: '',
                        })}
                    >
                        <ToolsPanelItem
                            hasValue={() => autofocus}
                            label={_x('Autofocus', 'HTML attribute', 'bbfse-plugin')}
                            onDeselect={() => setAttributes({ autofocus: false })}
                            isShownByDefault
                        >
                            <ToggleControl
                                checked={autofocus}
                                label={_x('Autofocus', 'HTML attribute', 'bbfse-plugin')}
                                onChange={(value) => setAttributes({ autofocus: value })}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => disabled}
                            label={_x('Disabled', 'HTML attribute', 'bbfse-plugin')}
                            onDeselect={() => setAttributes({ disabled: false })}
                            isShownByDefault
                        >
                            <ToggleControl
                                checked={disabled}
                                label={_x('Disabled', 'HTML attribute', 'bbfse-plugin')}
                                onChange={(value) => setAttributes({ disabled: value })}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => form !== ''}
                            label={__('Form ID', 'bbfse-plugin')}
                            onDeselect={() => setAttributes({ form: '' })}
                            isShownByDefault
                        >
                            <TextControl
                                label={__('Form ID', 'bbfse-plugin')}
                                value={form}
                                onChange={(value) => setAttributes({ form: value })}
                                help={
                                    <>
                                        { __('ID of the form this button is associated with.', 'bbfse-plugin') }{' '}
                                        <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button">
                                            { __('Learn more', 'bbfse-plugin') }
                                        </ExternalLink>
                                    </>
                                }
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => formenctype !== ''}
                            label={__('Form enctype', 'bbfse-plugin')}
                            onDeselect={() => setAttributes({ formenctype: '' })}
                            isShownByDefault
                        >
                            <SelectControl
                                label={__('Form enctype', 'bbfse-plugin')}
                                value={formenctype}
                                options={formEncTypeOptions}
                                onChange={(value) => setAttributes({ formenctype: value })}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => formmethod !== ''}
                            label={__('Form method', 'bbfse-plugin')}
                            onDeselect={() => setAttributes({ formmethod: '' })}
                            isShownByDefault
                        >
                            <SelectControl
                                label={__('Form method', 'bbfse-plugin')}
                                value={formmethod}
                                options={formMethodOptions}
                                onChange={(value) => setAttributes({ formmethod: value })}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => formnovalidate}
                            label={__('Form novalidate', 'bbfse-plugin')}
                            onDeselect={() => setAttributes({ formnovalidate: false })}
                            isShownByDefault
                        >
                            <ToggleControl
                                checked={formnovalidate}
                                label={__('Form novalidate', 'bbfse-plugin')}
                                onChange={(value) => setAttributes({ formnovalidate: value })}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => formtarget !== ''}
                            label={__('Form target', 'bbfse-plugin')}
                            onDeselect={() => setAttributes({ formtarget: '' })}
                            isShownByDefault
                        >
                            <TextControl
                                label={__('Form target', 'bbfse-plugin')}
                                value={formtarget}
                                onChange={(value) => setAttributes({ formtarget: value })}
                                help={__('Target for form submission, e.g. _blank.', 'bbfse-plugin')}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => name !== ''}
                            label={_x('Name', 'Button name', 'bbfse-plugin')}
                            onDeselect={() => setAttributes({ name: '' })}
                            isShownByDefault
                        >
                            <TextControl
                                label={_x('Name', 'Button name', 'bbfse-plugin')}
                                value={name}
                                onChange={(value) => setAttributes({ name: value })}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => type !== 'button'}
                            label={_x('Type', 'Button type', 'bbfse-plugin')}
                            onDeselect={() => setAttributes({ type: 'button' })}
                            isShownByDefault
                        >
                            <SelectControl
                                label={_x('Type', 'Button type', 'bbfse-plugin')}
                                value={type}
                                options={typeOptions}
                                onChange={(value) => setAttributes({ type: value })}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => value !== ''}
                            label={__('Value', 'bbfse-plugin')}
                            onDeselect={() => setAttributes({ value: '' })}
                            isShownByDefault
                        >
                            <TextControl
                                label={__('Value', 'bbfse-plugin')}
                                value={value}
                                onChange={(value) => setAttributes({ value: value })}
                            />
                        </ToolsPanelItem>
                    </ToolsPanel>
                )}

                <ToolsPanel
                    label={__('Data and Aria Attributes', 'bbfse-plugin')}
                    resetAll={() => setAttributes({
                        dataAttributes: {},
                        ariaAttributes: {},
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
            </InspectorControls>

            {textHtml ? (
                <TagName {...blockProps} dangerouslySetInnerHTML={{ __html: textHtml }} />
            ) : (
                <TagName {...blockProps} />
            )}
        </>
    );
}
