/**
 * Bootstrap button block edit component.
 *
 * @package rundizstrap-companion
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
        ...(tagName === 'a' && Number.isInteger(linkTabIndex) ? { tabIndex: linkTabIndex } : {}),
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
        { label: __('Default', 'rundizstrap-companion'), value: '' },
        { label: 'application/x-www-form-urlencoded', value: 'application/x-www-form-urlencoded' },
        { label: 'multipart/form-data', value: 'multipart/form-data' },
        { label: 'text/plain', value: 'text/plain' },
    ];

    const formMethodOptions = [
        { label: __('Default', 'rundizstrap-companion'), value: '' },
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
                            {__('Please add an href value when using <a>.', 'rundizstrap-companion')}
                        </Notice>
                    </div>
                )}
                {!hasBtnClass && (
                    <div style={{ padding: '0 16px', marginBottom: '16px' }}>
                        <Notice status="warning" isDismissible={false}>
                            {__('Please ensure the CSS class list contains the Bootstrap class \"btn\".', 'rundizstrap-companion')}
                        </Notice>
                    </div>
                )}

                <ToolsPanel
                    label={__('Button Settings', 'rundizstrap-companion')}
                    resetAll={() => setAttributes({
                        tagName: 'button',
                        textHtml: '',
                    })}
                >
                    <ToolsPanelItem
                        hasValue={() => tagName !== 'button'}
                        label={__('Tag Name', 'rundizstrap-companion')}
                        onDeselect={() => setAttributes({ tagName: 'button' })}
                        isShownByDefault
                    >
                        <SelectControl
                            label={__('Tag Name', 'rundizstrap-companion')}
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
                        label={__('Button text/HTML', 'rundizstrap-companion')}
                        onDeselect={() => setAttributes({ textHtml: '' })}
                        isShownByDefault
                    >
                        <TextControl
                            label={__('Button text/HTML', 'rundizstrap-companion')}
                            value={textHtml}
                            onChange={(value) => setAttributes({ textHtml: value })}
                            help={__('You can use text or HTML, e.g. <i class=\"bi bi-save\"></i> Save', 'rundizstrap-companion')}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>

                {tagName === 'a' && (
                    <ToolsPanel
                        label={__('Link Attributes', 'rundizstrap-companion')}
                        resetAll={() => setAttributes({
                            href: '',
                            linkRole: '',
                            linkTabIndex: undefined,
                        })}
                    >
                        <ToolsPanelItem
                            hasValue={() => href !== ''}
                            label={_x('Href', 'HTML attribute', 'rundizstrap-companion')}
                            onDeselect={() => setAttributes({ href: '' })}
                            isShownByDefault
                        >
                            <TextControl
                                label={_x('Href', 'HTML attribute', 'rundizstrap-companion')}
                                value={href}
                                onChange={(value) => setAttributes({ href: value })}
                                help={__('Required when using <a>.', 'rundizstrap-companion')}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => linkRole !== ''}
                            label={_x('Role', 'HTML attribute', 'rundizstrap-companion')}
                            onDeselect={() => setAttributes({ linkRole: '' })}
                            isShownByDefault
                        >
                            <TextControl
                                label={_x('Role', 'HTML attribute', 'rundizstrap-companion')}
                                value={linkRole}
                                onChange={(value) => setAttributes({ linkRole: value })}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => Number.isInteger(linkTabIndex)}
                            label={__('Tab index', 'rundizstrap-companion')}
                            onDeselect={() => setAttributes({ linkTabIndex: undefined })}
                            isShownByDefault
                        >
                            <TextControl
                                type="number"
                                label={__('Tab index', 'rundizstrap-companion')}
                                value={Number.isInteger(linkTabIndex) ? linkTabIndex : ''}
                                onChange={(value) => {
                                    if (value === '') {
                                        setAttributes({ linkTabIndex: undefined });
                                        return;
                                    }

                                    const parsedValue = Number(value);
                                    if (Number.isInteger(parsedValue)) {
                                        setAttributes({ linkTabIndex: parsedValue });
                                    }
                                }}
                            />
                        </ToolsPanelItem>
                    </ToolsPanel>
                )}

                {tagName === 'button' && (
                    <ToolsPanel
                        label={__('Button Attributes', 'rundizstrap-companion')}
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
                            label={_x('Autofocus', 'HTML attribute', 'rundizstrap-companion')}
                            onDeselect={() => setAttributes({ autofocus: false })}
                            isShownByDefault
                        >
                            <ToggleControl
                                checked={autofocus}
                                label={_x('Autofocus', 'HTML attribute', 'rundizstrap-companion')}
                                onChange={(value) => setAttributes({ autofocus: value })}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => disabled}
                            label={_x('Disabled', 'HTML attribute', 'rundizstrap-companion')}
                            onDeselect={() => setAttributes({ disabled: false })}
                            isShownByDefault
                        >
                            <ToggleControl
                                checked={disabled}
                                label={_x('Disabled', 'HTML attribute', 'rundizstrap-companion')}
                                onChange={(value) => setAttributes({ disabled: value })}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => form !== ''}
                            label={__('Form ID', 'rundizstrap-companion')}
                            onDeselect={() => setAttributes({ form: '' })}
                            isShownByDefault
                        >
                            <TextControl
                                label={__('Form ID', 'rundizstrap-companion')}
                                value={form}
                                onChange={(value) => setAttributes({ form: value })}
                                help={
                                    <>
                                        { __('ID of the form this button is associated with.', 'rundizstrap-companion') }{' '}
                                        <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button">
                                            { __('Learn more', 'rundizstrap-companion') }
                                        </ExternalLink>
                                    </>
                                }
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => formenctype !== ''}
                            label={__('Form enctype', 'rundizstrap-companion')}
                            onDeselect={() => setAttributes({ formenctype: '' })}
                            isShownByDefault
                        >
                            <SelectControl
                                label={__('Form enctype', 'rundizstrap-companion')}
                                value={formenctype}
                                options={formEncTypeOptions}
                                onChange={(value) => setAttributes({ formenctype: value })}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => formmethod !== ''}
                            label={__('Form method', 'rundizstrap-companion')}
                            onDeselect={() => setAttributes({ formmethod: '' })}
                            isShownByDefault
                        >
                            <SelectControl
                                label={__('Form method', 'rundizstrap-companion')}
                                value={formmethod}
                                options={formMethodOptions}
                                onChange={(value) => setAttributes({ formmethod: value })}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => formnovalidate}
                            label={__('Form novalidate', 'rundizstrap-companion')}
                            onDeselect={() => setAttributes({ formnovalidate: false })}
                            isShownByDefault
                        >
                            <ToggleControl
                                checked={formnovalidate}
                                label={__('Form novalidate', 'rundizstrap-companion')}
                                onChange={(value) => setAttributes({ formnovalidate: value })}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => formtarget !== ''}
                            label={__('Form target', 'rundizstrap-companion')}
                            onDeselect={() => setAttributes({ formtarget: '' })}
                            isShownByDefault
                        >
                            <TextControl
                                label={__('Form target', 'rundizstrap-companion')}
                                value={formtarget}
                                onChange={(value) => setAttributes({ formtarget: value })}
                                help={__('Target for form submission, e.g. _blank.', 'rundizstrap-companion')}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => name !== ''}
                            label={_x('Name', 'Button name', 'rundizstrap-companion')}
                            onDeselect={() => setAttributes({ name: '' })}
                            isShownByDefault
                        >
                            <TextControl
                                label={_x('Name', 'Button name', 'rundizstrap-companion')}
                                value={name}
                                onChange={(value) => setAttributes({ name: value })}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => type !== 'button'}
                            label={_x('Type', 'Button type', 'rundizstrap-companion')}
                            onDeselect={() => setAttributes({ type: 'button' })}
                            isShownByDefault
                        >
                            <SelectControl
                                label={_x('Type', 'Button type', 'rundizstrap-companion')}
                                value={type}
                                options={typeOptions}
                                onChange={(value) => setAttributes({ type: value })}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => value !== ''}
                            label={__('Value', 'rundizstrap-companion')}
                            onDeselect={() => setAttributes({ value: '' })}
                            isShownByDefault
                        >
                            <TextControl
                                label={__('Value', 'rundizstrap-companion')}
                                value={value}
                                onChange={(value) => setAttributes({ value: value })}
                            />
                        </ToolsPanelItem>
                    </ToolsPanel>
                )}

                <ToolsPanel
                    label={__('Data and Aria Attributes', 'rundizstrap-companion')}
                    resetAll={() => setAttributes({
                        dataAttributes: {},
                        ariaAttributes: {},
                    })}
                >
                    <ToolsPanelItem
                        hasValue={() => !isObjectEmpty(dataAttributes)}
                        label={__('Data attributes', 'rundizstrap-companion')}
                        onDeselect={() => setAttributes({ dataAttributes: {} })}
                        isShownByDefault
                    >
                        <KeyValueControl
                            label={__('Data attributes', 'rundizstrap-companion') + ' '}
                            value={dataAttributes}
                            onChange={(value) => setAttributes({ dataAttributes: value })}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() => !isObjectEmpty(ariaAttributes)}
                        label={__('Aria attributes', 'rundizstrap-companion')}
                        onDeselect={() => setAttributes({ ariaAttributes: {} })}
                        isShownByDefault
                    >
                        <KeyValueControl
                            label={__('Aria attributes', 'rundizstrap-companion') + ' '}
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
