/**
 * Bootstrap navbar responsive wrapper block edit component.
 * 
 * @package bbfse-plugin
 * @since 0.0.1
 * @author Vee W.
 */

import { sprintf, __ } from '@wordpress/i18n';

import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';

import {
    PanelBody,
    SelectControl,
    TextControl,
    __experimentalToolsPanel as ToolsPanel,
    __experimentalToolsPanelItem as ToolsPanelItem
} from '@wordpress/components';

import KeyValueControl from '../../assets/js/blocks/shared/keyValueControl.js';

export default function Edit({ attributes, setAttributes }) {
    const {
        wrapperStyle,
        dataAttributes,
        ariaAttributes,
        // offcanvas settings --------
        offcanvasHeaderClassName,
        offcanvasHeaderTitleIDName,
        offcanvasHeaderTitleClassName,
        offcanvasHeaderTitleText,
        // offcanvas header close button ---------
        offcanvasHeaderCloseBtnClassName,
        offcanvasHeaderCloseBtnDataAttributes,
        offcanvasHeaderCloseBtnAriaAttributes,
        // offcanvas body ----------
        offcanvasBodyClassName,
    } = attributes;

    const wrapperDefaultStyle = 'collapse';
    const offcanvasHeaderDefaultClassName = 'offcanvas-header';
    const offcanvasHeaderTitleDefaultIDName = '';
    const offcanvasHeaderTitleDefaultClassName = 'offcanvas-title';
    const offcanvasHeaderTitleDefaultText = '';
    const offcanvasHeaderCloseBtnDefaultClassName = '';
    const offcanvasBodyDefaultClassName = 'offcanvas-body';

    // Dynamically build class names based on wrapperStyle
    const getWrapperClasses = () => {
        if (wrapperStyle === 'offcanvas') {
            return 'offcanvas offcanvas-end';
        }
        // default = collapse
        return 'collapse navbar-collapse';
    };// keep it for example.

    // Additional props only for offcanvas
    const extraProps = wrapperStyle === 'offcanvas' 
        ? { tabIndex: '-1' } 
        : {};

    const blockProps = useBlockProps({
        //className: getWrapperClasses(),// do not show styles on preview otherwise it can't edit the navigation menu inside it.
        className: 'navbar-collapse',
        ...extraProps,
    });

    // Helper to check if objects are empty
    const isObjectEmpty = (obj) => Object.keys(obj || {}).length === 0;

    return (
        <>
            <InspectorControls>
                {/* PanelBody provides the collapsible toggle */}
                <PanelBody 
                    title={__('Navbar responsive wrapper Settings', 'bbfse-plugin')} 
                    initialOpen={ true }
                >
                    {/* ToolsPanel provides the reset functionality */}
                    <ToolsPanel
                        label={__('Navbar responsive wrapper', 'bbfse-plugin')}
                        resetAll={() => setAttributes({
                            wrapperStyle: wrapperDefaultStyle,
                            dataAttributes: {},
                            ariaAttributes: {}
                        })}
                        style={{paddingLeft: '0px', paddingRight: '0px'}}
                    >
                        <div style={{color: 'rgb(117,117,117)', fontSize: '12px', gridColumn: '1 / -1', padding: '0px'}}>
                            <p>
                                {__('Please note that the preview will not display with styles so that editing can work.', 'bbfse-plugin')}
                            </p>
                        </div>
                        <ToolsPanelItem
                            hasValue={() => wrapperStyle !== wrapperDefaultStyle}
                            label={__('Wrapper style', 'bbfse-plugin')}
                            onDeselect={() => setAttributes({ wrapperStyle: wrapperDefaultStyle })}
                            isShownByDefault
                        >
                            <SelectControl
                                label={__('Wrapper style', 'bbfse-plugin')}
                                value={wrapperStyle}
                                options={[
                                    { label: 'collapse', value: 'collapse' },
                                    { label: 'offcanvas', value: 'offcanvas' },
                                ]}
                                onChange={(value) => setAttributes({ wrapperStyle: value })}
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
                </PanelBody>
                {('offcanvas' === wrapperStyle) && (
                    <>
                        <PanelBody 
                            title={__('Offcanvas Settings', 'bbfse-plugin')} 
                        >
                            <ToolsPanel
                                label={__('Navbar responsive offcanvas', 'bbfse-plugin')}
                                resetAll={() => setAttributes({
                                    offcanvasHeaderClassName: offcanvasHeaderDefaultClassName,
                                    offcanvasHeaderTitleIDName: offcanvasHeaderTitleDefaultIDName,
                                    offcanvasHeaderTitleClassName: offcanvasHeaderTitleDefaultClassName,
                                    offcanvasHeaderTitleText: offcanvasHeaderTitleDefaultText,
                                    offcanvasHeaderCloseBtnClassName: offcanvasHeaderCloseBtnDefaultClassName,
                                    offcanvasHeaderCloseBtnDataAttributes: {},
                                    offcanvasHeaderCloseBtnAriaAttributes: {},
                                    offcanvasBodyClassName: offcanvasBodyDefaultClassName,
                                })}
                            >
                                <ToolsPanelItem
                                    hasValue={() => offcanvasHeaderClassName !== offcanvasHeaderDefaultClassName}
                                    label={__('Offcanvas header Class', 'bbfse-plugin')}
                                    onDeselect={() => setAttributes({ offcanvasHeaderClassName: offcanvasHeaderDefaultClassName })}
                                    isShownByDefault
                                >
                                    <TextControl
                                        label={__('Offcanvas header Class', 'bbfse-plugin')}
                                        value={offcanvasHeaderClassName}
                                        onChange={(value) => setAttributes({ offcanvasHeaderClassName: value })}
                                        help={sprintf(
                                            /* translators: %1$s the offcanvas default class name. */
                                            __('Default is %1$s.', 'bbfse-plugin'),
                                            offcanvasHeaderDefaultClassName
                                        )}
                                    />
                                </ToolsPanelItem>
                                <ToolsPanelItem
                                    hasValue={() => offcanvasHeaderTitleIDName !== offcanvasHeaderTitleDefaultIDName}
                                    label={__('Offcanvas header title ID', 'bbfse-plugin')}
                                    onDeselect={() => setAttributes({ offcanvasHeaderTitleIDName: offcanvasHeaderTitleDefaultIDName })}
                                    isShownByDefault
                                >
                                    <TextControl
                                        label={__('Offcanvas header title ID', 'bbfse-plugin')}
                                        value={offcanvasHeaderTitleIDName}
                                        onChange={(value) => {
                                            // Real-time sanitization on every keystroke
                                            let sanitized = value
                                                .replace(/\s+/g, '-') // replace any spaces with single dash
                                                .replace(/[^a-z0-9_-]/g, ''); // remove all invalid chars (keep only a-z, 0-9, -, _)

                                            // Optional: ensure it starts with a letter, -, or _ (HTML5 allows digit start, but stricter is safer)
                                            // if (sanitized && !/^[a-z_-]/.test(sanitized)) {
                                            //     sanitized = sanitized.replace(/^[^a-z_-]+/, '');
                                            // }

                                            setAttributes({ offcanvasHeaderTitleIDName: sanitized });
                                        }}
                                        help={__('HTML id attribute on offcanvas header title', 'bbfse-plugin')}
                                    />
                                </ToolsPanelItem>
                                <ToolsPanelItem
                                    hasValue={() => offcanvasHeaderTitleClassName !== offcanvasHeaderTitleDefaultClassName}
                                    label={__('Offcanvas header title Class', 'bbfse-plugin')}
                                    onDeselect={() => setAttributes({ offcanvasHeaderTitleClassName: offcanvasHeaderTitleDefaultClassName })}
                                    isShownByDefault
                                >
                                    <TextControl
                                        label={__('Offcanvas header title Class', 'bbfse-plugin')}
                                        value={offcanvasHeaderTitleClassName}
                                        onChange={(value) => setAttributes({ offcanvasHeaderTitleClassName: value })}
                                        help={sprintf(
                                            __('Default is %1$s.', 'bbfse-plugin'),
                                            offcanvasHeaderTitleDefaultClassName
                                        )}
                                    />
                                </ToolsPanelItem>
                                <ToolsPanelItem
                                    hasValue={() => offcanvasHeaderTitleText !== offcanvasHeaderTitleDefaultText}
                                    label={__('Offcanvas header title text', 'bbfse-plugin')}
                                    onDeselect={() => setAttributes({ offcanvasHeaderTitleText: offcanvasHeaderTitleDefaultText })}
                                    isShownByDefault
                                >
                                    <TextControl
                                        label={__('Offcanvas header title text', 'bbfse-plugin')}
                                        value={offcanvasHeaderTitleText}
                                        onChange={(value) => setAttributes({ offcanvasHeaderTitleText: value })}
                                        help={__('You can use text or HTML. This will be display inside offcanvas title.', 'bbfse-plugin')}
                                    />
                                </ToolsPanelItem>
                                <ToolsPanelItem
                                    hasValue={() => offcanvasHeaderCloseBtnClassName !== offcanvasHeaderCloseBtnDefaultClassName}
                                    label={__('Close button additional Class', 'bbfse-plugin')}
                                    onDeselect={() => setAttributes({ offcanvasHeaderCloseBtnClassName: offcanvasHeaderCloseBtnDefaultClassName })}
                                    isShownByDefault
                                >
                                    <TextControl
                                        label={__('Close button additional Class', 'bbfse-plugin')}
                                        value={offcanvasHeaderCloseBtnClassName}
                                        onChange={(value) => setAttributes({ offcanvasHeaderCloseBtnClassName: value })}
                                        help={__('This will be additional class next to main close button class.', 'bbfse-plugin')}
                                    />
                                </ToolsPanelItem>
                                <ToolsPanelItem
                                    hasValue={() => !isObjectEmpty(offcanvasHeaderCloseBtnDataAttributes)}
                                    label={__('Close button data attributes', 'bbfse-plugin')}
                                    onDeselect={() => setAttributes({ offcanvasHeaderCloseBtnDataAttributes: {} })}
                                    isShownByDefault
                                >
                                    <KeyValueControl
                                        label={__('Close button data attributes', 'bbfse-plugin') + ' '}
                                        value={offcanvasHeaderCloseBtnDataAttributes}
                                        onChange={(value) => setAttributes({ offcanvasHeaderCloseBtnDataAttributes: value })}
                                    />
                                </ToolsPanelItem>
                                <ToolsPanelItem
                                    hasValue={() => !isObjectEmpty(offcanvasHeaderCloseBtnAriaAttributes)}
                                    label={__('Close button aria attributes', 'bbfse-plugin')}
                                    onDeselect={() => setAttributes({ offcanvasHeaderCloseBtnAriaAttributes: {} })}
                                    isShownByDefault
                                >
                                    <KeyValueControl
                                        label={__('Close button aria attributes', 'bbfse-plugin') + ' '}
                                        value={offcanvasHeaderCloseBtnAriaAttributes}
                                        onChange={(value) => setAttributes({ offcanvasHeaderCloseBtnAriaAttributes: value })}
                                    />
                                </ToolsPanelItem>
                                <ToolsPanelItem
                                    hasValue={() => offcanvasBodyClassName !== offcanvasBodyDefaultClassName}
                                    label={__('Offcanvas body Class', 'bbfse-plugin')}
                                    onDeselect={() => setAttributes({ offcanvasBodyClassName: offcanvasBodyDefaultClassName })}
                                    isShownByDefault
                                >
                                    <TextControl
                                        label={__('Offcanvas body Class', 'bbfse-plugin')}
                                        value={offcanvasBodyClassName}
                                        onChange={(value) => setAttributes({ offcanvasBodyClassName: value })}
                                        help={sprintf(
                                            __('Default is %1$s.', 'bbfse-plugin'),
                                            offcanvasBodyDefaultClassName
                                        )}
                                    />
                                </ToolsPanelItem>
                            </ToolsPanel>
                        </PanelBody>
                    </>
                )}
            </InspectorControls>

            <div {...blockProps}>
                <InnerBlocks />
            </div>
        </>
    );
}
