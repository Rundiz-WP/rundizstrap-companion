/**
 * Bootstrap button block edit component.
 *
 * @package bbfse-plug
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
    __experimentalToolsPanel as ToolsPanel,
    __experimentalToolsPanelItem as ToolsPanelItem
} from '@wordpress/components';

import { useEffect } from '@wordpress/element';

import KeyValueControl from '../../assets/js/blocks/shared/keyValueControl.js';

import attributesToProps from '../../assets/js/blocks/shared/attributesToProps.js';

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
        { label: __('Default', 'bbfse-plug'), value: '' },
        { label: 'application/x-www-form-urlencoded', value: 'application/x-www-form-urlencoded' },
        { label: 'multipart/form-data', value: 'multipart/form-data' },
        { label: 'text/plain', value: 'text/plain' },
    ];

    const formMethodOptions = [
        { label: __('Default', 'bbfse-plug'), value: '' },
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
                            {__('Please add an href value when using <a>.', 'bbfse-plug')}
                        </Notice>
                    </div>
                )}
                {!hasBtnClass && (
                    <div style={{ padding: '0 16px', marginBottom: '16px' }}>
                        <Notice status="warning" isDismissible={false}>
                            {__('Please ensure the CSS class list contains the Bootstrap class \"btn\".', 'bbfse-plug')}
                        </Notice>
                    </div>
                )}

                <ToolsPanel
                    label={__('Button Settings', 'bbfse-plug')}
                    resetAll={() => setAttributes({
                        tagName: 'button',
                        textHtml: '',
                    })}
                >
                    <ToolsPanelItem
                        hasValue={() => tagName !== 'button'}
                        label={__('Tag Name', 'bbfse-plug')}
                        onDeselect={() => setAttributes({ tagName: 'button' })}
                        isShownByDefault
                    >
                        <SelectControl
                            label={__('Tag Name', 'bbfse-plug')}
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
                        label={__('Button text/HTML', 'bbfse-plug')}
                        onDeselect={() => setAttributes({ textHtml: '' })}
                        isShownByDefault
                    >
                        <TextControl
                            label={__('Button text/HTML', 'bbfse-plug')}
                            value={textHtml}
                            onChange={(value) => setAttributes({ textHtml: value })}
                            help={__('You can use text or HTML, e.g. <i class=\"bi bi-save\"></i> Save', 'bbfse-plug')}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>

                {tagName === 'a' && (
                    <ToolsPanel
                        label={__('Link Attributes', 'bbfse-plug')}
                        resetAll={() => setAttributes({
                            href: '',
                            linkRole: '',
                            linkTabIndex: '',
                        })}
                    >
                        <ToolsPanelItem
                            hasValue={() => href !== ''}
                            label={_x('Href', 'HTML attribute', 'bbfse-plug')}
                            onDeselect={() => setAttributes({ href: '' })}
                            isShownByDefault
                        >
                            <TextControl
                                label={_x('Href', 'HTML attribute', 'bbfse-plug')}
                                value={href}
                                onChange={(value) => setAttributes({ href: value })}
                                help={__('Required when using <a>.', 'bbfse-plug')}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => linkRole !== ''}
                            label={_x('Role', 'HTML attribute', 'bbfse-plug')}
                            onDeselect={() => setAttributes({ linkRole: '' })}
                            isShownByDefault
                        >
                            <TextControl
                                label={_x('Role', 'HTML attribute', 'bbfse-plug')}
                                value={linkRole}
                                onChange={(value) => setAttributes({ linkRole: value })}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => linkTabIndex !== ''}
                            label={__('Tab index', 'bbfse-plug')}
                            onDeselect={() => setAttributes({ linkTabIndex: '' })}
                            isShownByDefault
                        >
                            <TextControl
                                label={__('Tab index', 'bbfse-plug')}
                                value={linkTabIndex}
                                onChange={(value) => setAttributes({ linkTabIndex: value })}
                            />
                        </ToolsPanelItem>
                    </ToolsPanel>
                )}

                {tagName === 'button' && (
                    <ToolsPanel
                        label={__('Button Attributes', 'bbfse-plug')}
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
                            label={_x('Autofocus', 'HTML attribute', 'bbfse-plug')}
                            onDeselect={() => setAttributes({ autofocus: false })}
                            isShownByDefault
                        >
                            <ToggleControl
                                checked={autofocus}
                                label={_x('Autofocus', 'HTML attribute', 'bbfse-plug')}
                                onChange={(value) => setAttributes({ autofocus: value })}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => disabled}
                            label={_x('Disabled', 'HTML attribute', 'bbfse-plug')}
                            onDeselect={() => setAttributes({ disabled: false })}
                            isShownByDefault
                        >
                            <ToggleControl
                                checked={disabled}
                                label={_x('Disabled', 'HTML attribute', 'bbfse-plug')}
                                onChange={(value) => setAttributes({ disabled: value })}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => form !== ''}
                            label={__('Form ID', 'bbfse-plug')}
                            onDeselect={() => setAttributes({ form: '' })}
                            isShownByDefault
                        >
                            <TextControl
                                label={__('Form ID', 'bbfse-plug')}
                                value={form}
                                onChange={(value) => setAttributes({ form: value })}
                                help={
                                    <>
                                        { __('ID of the form this button is associated with.', 'bbfse-plug') }{' '}
                                        <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button">
                                            { __('Learn more', 'bbfse-plug') }
                                        </ExternalLink>
                                    </>
                                }
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => formenctype !== ''}
                            label={__('Form enctype', 'bbfse-plug')}
                            onDeselect={() => setAttributes({ formenctype: '' })}
                            isShownByDefault
                        >
                            <SelectControl
                                label={__('Form enctype', 'bbfse-plug')}
                                value={formenctype}
                                options={formEncTypeOptions}
                                onChange={(value) => setAttributes({ formenctype: value })}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => formmethod !== ''}
                            label={__('Form method', 'bbfse-plug')}
                            onDeselect={() => setAttributes({ formmethod: '' })}
                            isShownByDefault
                        >
                            <SelectControl
                                label={__('Form method', 'bbfse-plug')}
                                value={formmethod}
                                options={formMethodOptions}
                                onChange={(value) => setAttributes({ formmethod: value })}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => formnovalidate}
                            label={__('Form novalidate', 'bbfse-plug')}
                            onDeselect={() => setAttributes({ formnovalidate: false })}
                            isShownByDefault
                        >
                            <ToggleControl
                                checked={formnovalidate}
                                label={__('Form novalidate', 'bbfse-plug')}
                                onChange={(value) => setAttributes({ formnovalidate: value })}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => formtarget !== ''}
                            label={__('Form target', 'bbfse-plug')}
                            onDeselect={() => setAttributes({ formtarget: '' })}
                            isShownByDefault
                        >
                            <TextControl
                                label={__('Form target', 'bbfse-plug')}
                                value={formtarget}
                                onChange={(value) => setAttributes({ formtarget: value })}
                                help={__('Target for form submission, e.g. _blank.', 'bbfse-plug')}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => name !== ''}
                            label={_x('Name', 'Button name', 'bbfse-plug')}
                            onDeselect={() => setAttributes({ name: '' })}
                            isShownByDefault
                        >
                            <TextControl
                                label={_x('Name', 'Button name', 'bbfse-plug')}
                                value={name}
                                onChange={(value) => setAttributes({ name: value })}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => type !== 'button'}
                            label={_x('Type', 'Button type', 'bbfse-plug')}
                            onDeselect={() => setAttributes({ type: 'button' })}
                            isShownByDefault
                        >
                            <SelectControl
                                label={_x('Type', 'Button type', 'bbfse-plug')}
                                value={type}
                                options={typeOptions}
                                onChange={(value) => setAttributes({ type: value })}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => value !== ''}
                            label={__('Value', 'bbfse-plug')}
                            onDeselect={() => setAttributes({ value: '' })}
                            isShownByDefault
                        >
                            <TextControl
                                label={__('Value', 'bbfse-plug')}
                                value={value}
                                onChange={(value) => setAttributes({ value: value })}
                            />
                        </ToolsPanelItem>
                    </ToolsPanel>
                )}

                <ToolsPanel
                    label={__('Data and Aria Attributes', 'bbfse-plug')}
                    resetAll={() => setAttributes({
                        dataAttributes: {},
                        ariaAttributes: {},
                    })}
                >
                    <ToolsPanelItem
                        hasValue={() => !isObjectEmpty(dataAttributes)}
                        label={__('Data attributes', 'bbfse-plug')}
                        onDeselect={() => setAttributes({ dataAttributes: {} })}
                        isShownByDefault
                    >
                        <KeyValueControl
                            label={__('Data attributes', 'bbfse-plug') + ' '}
                            value={dataAttributes}
                            onChange={(value) => setAttributes({ dataAttributes: value })}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() => !isObjectEmpty(ariaAttributes)}
                        label={__('Aria attributes', 'bbfse-plug')}
                        onDeselect={() => setAttributes({ ariaAttributes: {} })}
                        isShownByDefault
                    >
                        <KeyValueControl
                            label={__('Aria attributes', 'bbfse-plug') + ' '}
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
