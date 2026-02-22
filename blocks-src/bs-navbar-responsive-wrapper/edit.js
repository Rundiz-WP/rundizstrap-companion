/**
 * Bootstrap navbar responsive wrapper block edit component.
 * 
 * @package rundizstrap-companion
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

import RundizStrapCompanionKeyValueCtrl from '../../assets/js/blocks/shared/rundizstrap-companion-keyvalue-control.js';

import {
    rundizstrap_companion_sanitize_html_class,
    rundizstrap_companion_sanitize_html_class_list,
} from '../../assets/js/blocks/shared/rundizstrap-companion-sanitize.js';


export default function Edit({ attributes, setAttributes }) {
    const {
        wrapperStyle,
        dataAttributes,
        ariaAttributes,
        // offcanvas settings --------
        offcanvasHeaderClassName,
        offcanvasHeaderTitleIDName,
        offcanvasHeaderTitleClassName,
        offcanvasHeaderTitleHtml,
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
    const offcanvasHeaderTitleDefaultHtml = '';
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
    const sanitizeClassList = (value, keepTrailingSpace = false) =>
        rundizstrap_companion_sanitize_html_class_list(String(value || ''), keepTrailingSpace);
    const sanitizeTitleId = (value) =>
        rundizstrap_companion_sanitize_html_class(String(value || ''));

    return (
        <>
            <InspectorControls>
                {/* PanelBody provides the collapsible toggle */}
                <PanelBody 
                    title={__('Navbar responsive wrapper Settings', 'rundizstrap-companion')} 
                    initialOpen={ true }
                >
                    {/* ToolsPanel provides the reset functionality */}
                    <ToolsPanel
                        label={__('Navbar responsive wrapper', 'rundizstrap-companion')}
                        resetAll={() => setAttributes({
                            wrapperStyle: wrapperDefaultStyle,
                            dataAttributes: {},
                            ariaAttributes: {}
                        })}
                        style={{paddingLeft: '0px', paddingRight: '0px'}}
                    >
                        <div style={{color: 'rgb(117,117,117)', fontSize: '12px', gridColumn: '1 / -1', padding: '0px'}}>
                            <p>
                                {__('Please note that the preview will not display with styles so that editing can work.', 'rundizstrap-companion')}
                            </p>
                        </div>
                        <ToolsPanelItem
                            hasValue={() => wrapperStyle !== wrapperDefaultStyle}
                            label={__('Wrapper style', 'rundizstrap-companion')}
                            onDeselect={() => setAttributes({ wrapperStyle: wrapperDefaultStyle })}
                            isShownByDefault
                        >
                            <SelectControl
                                label={__('Wrapper style', 'rundizstrap-companion')}
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
                            label={__('Data attributes', 'rundizstrap-companion')}
                            onDeselect={() => setAttributes({ dataAttributes: {} })}
                            isShownByDefault
                        >
                            <RundizStrapCompanionKeyValueCtrl
                                label={__('Data attributes', 'rundizstrap-companion') + ' '}
                                value={dataAttributes}
                                onChange={(value) => setAttributes({ dataAttributes: value })}
                                prefix="data-"
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => !isObjectEmpty(ariaAttributes)}
                            label={__('Aria attributes', 'rundizstrap-companion')}
                            onDeselect={() => setAttributes({ ariaAttributes: {} })}
                            isShownByDefault
                        >
                            <RundizStrapCompanionKeyValueCtrl
                                label={__('Aria attributes', 'rundizstrap-companion') + ' '}
                                value={ariaAttributes}
                                onChange={(value) => setAttributes({ ariaAttributes: value })}
                                prefix="aria-"
                            />
                        </ToolsPanelItem>
                    </ToolsPanel>
                </PanelBody>
                {('offcanvas' === wrapperStyle) && (
                    <>
                        <PanelBody 
                            title={__('Offcanvas Settings', 'rundizstrap-companion')} 
                        >
                            <ToolsPanel
                                label={__('Navbar responsive offcanvas', 'rundizstrap-companion')}
                                resetAll={() => setAttributes({
                                    offcanvasHeaderClassName: offcanvasHeaderDefaultClassName,
                                    offcanvasHeaderTitleIDName: offcanvasHeaderTitleDefaultIDName,
                                    offcanvasHeaderTitleClassName: offcanvasHeaderTitleDefaultClassName,
                                    offcanvasHeaderTitleHtml: offcanvasHeaderTitleDefaultHtml,
                                    offcanvasHeaderCloseBtnClassName: offcanvasHeaderCloseBtnDefaultClassName,
                                    offcanvasHeaderCloseBtnDataAttributes: {},
                                    offcanvasHeaderCloseBtnAriaAttributes: {},
                                    offcanvasBodyClassName: offcanvasBodyDefaultClassName,
                                })}
                            >
                                <ToolsPanelItem
                                    hasValue={() => offcanvasHeaderClassName !== offcanvasHeaderDefaultClassName}
                                    label={__('Offcanvas header Class', 'rundizstrap-companion')}
                                    onDeselect={() => setAttributes({ offcanvasHeaderClassName: offcanvasHeaderDefaultClassName })}
                                    isShownByDefault
                                >
                                    <TextControl
                                        label={__('Offcanvas header Class', 'rundizstrap-companion')}
                                        value={offcanvasHeaderClassName}
                                        onChange={(value) => setAttributes({ offcanvasHeaderClassName: sanitizeClassList(value, true) })}
                                        onBlur={() => setAttributes({ offcanvasHeaderClassName: sanitizeClassList(offcanvasHeaderClassName) })}
                                        help={sprintf(
                                            /* translators: %1$s the offcanvas default class name. */
                                            __('Default is %1$s.', 'rundizstrap-companion'),
                                            offcanvasHeaderDefaultClassName
                                        )}
                                    />
                                </ToolsPanelItem>
                                <ToolsPanelItem
                                    hasValue={() => offcanvasHeaderTitleIDName !== offcanvasHeaderTitleDefaultIDName}
                                    label={__('Offcanvas header title ID', 'rundizstrap-companion')}
                                    onDeselect={() => setAttributes({ offcanvasHeaderTitleIDName: offcanvasHeaderTitleDefaultIDName })}
                                    isShownByDefault
                                >
                                    <TextControl
                                        label={__('Offcanvas header title ID', 'rundizstrap-companion')}
                                        value={offcanvasHeaderTitleIDName}
                                        onChange={(value) => setAttributes({ offcanvasHeaderTitleIDName: sanitizeTitleId(value) })}
                                        help={__('HTML id attribute on offcanvas header title', 'rundizstrap-companion')}
                                    />
                                </ToolsPanelItem>
                                <ToolsPanelItem
                                    hasValue={() => offcanvasHeaderTitleClassName !== offcanvasHeaderTitleDefaultClassName}
                                    label={__('Offcanvas header title Class', 'rundizstrap-companion')}
                                    onDeselect={() => setAttributes({ offcanvasHeaderTitleClassName: offcanvasHeaderTitleDefaultClassName })}
                                    isShownByDefault
                                >
                                    <TextControl
                                        label={__('Offcanvas header title Class', 'rundizstrap-companion')}
                                        value={offcanvasHeaderTitleClassName}
                                        onChange={(value) => setAttributes({ offcanvasHeaderTitleClassName: sanitizeClassList(value, true) })}
                                        onBlur={() => setAttributes({ offcanvasHeaderTitleClassName: sanitizeClassList(offcanvasHeaderTitleClassName) })}
                                        help={sprintf(
                                            __('Default is %1$s.', 'rundizstrap-companion'),
                                            offcanvasHeaderTitleDefaultClassName
                                        )}
                                    />
                                </ToolsPanelItem>
                                <ToolsPanelItem
                                    hasValue={() => offcanvasHeaderTitleHtml !== offcanvasHeaderTitleDefaultHtml}
                                    label={__('Offcanvas header title text', 'rundizstrap-companion')}
                                    onDeselect={() => setAttributes({ offcanvasHeaderTitleHtml: offcanvasHeaderTitleDefaultHtml })}
                                    isShownByDefault
                                >
                                    <TextControl
                                        label={__('Offcanvas header title text', 'rundizstrap-companion')}
                                        value={offcanvasHeaderTitleHtml}
                                        onChange={(value) => setAttributes({ offcanvasHeaderTitleHtml: value })}
                                        help={__('You can use text or HTML. This will be display inside offcanvas title.', 'rundizstrap-companion')}
                                    />
                                </ToolsPanelItem>
                                <ToolsPanelItem
                                    hasValue={() => offcanvasHeaderCloseBtnClassName !== offcanvasHeaderCloseBtnDefaultClassName}
                                    label={__('Close button additional Class', 'rundizstrap-companion')}
                                    onDeselect={() => setAttributes({ offcanvasHeaderCloseBtnClassName: offcanvasHeaderCloseBtnDefaultClassName })}
                                    isShownByDefault
                                >
                                    <TextControl
                                        label={__('Close button additional Class', 'rundizstrap-companion')}
                                        value={offcanvasHeaderCloseBtnClassName}
                                        onChange={(value) => setAttributes({ offcanvasHeaderCloseBtnClassName: sanitizeClassList(value, true) })}
                                        onBlur={() => setAttributes({ offcanvasHeaderCloseBtnClassName: sanitizeClassList(offcanvasHeaderCloseBtnClassName) })}
                                        help={__('This will be additional class next to main close button class.', 'rundizstrap-companion')}
                                    />
                                </ToolsPanelItem>
                                <ToolsPanelItem
                                    hasValue={() => !isObjectEmpty(offcanvasHeaderCloseBtnDataAttributes)}
                                    label={__('Close button data attributes', 'rundizstrap-companion')}
                                    onDeselect={() => setAttributes({ offcanvasHeaderCloseBtnDataAttributes: {} })}
                                    isShownByDefault
                                >
                                    <RundizStrapCompanionKeyValueCtrl
                                        label={__('Close button data attributes', 'rundizstrap-companion') + ' '}
                                        value={offcanvasHeaderCloseBtnDataAttributes}
                                        onChange={(value) => setAttributes({ offcanvasHeaderCloseBtnDataAttributes: value })}
                                        prefix="data-"
                                    />
                                </ToolsPanelItem>
                                <ToolsPanelItem
                                    hasValue={() => !isObjectEmpty(offcanvasHeaderCloseBtnAriaAttributes)}
                                    label={__('Close button aria attributes', 'rundizstrap-companion')}
                                    onDeselect={() => setAttributes({ offcanvasHeaderCloseBtnAriaAttributes: {} })}
                                    isShownByDefault
                                >
                                    <RundizStrapCompanionKeyValueCtrl
                                        label={__('Close button aria attributes', 'rundizstrap-companion') + ' '}
                                        value={offcanvasHeaderCloseBtnAriaAttributes}
                                        onChange={(value) => setAttributes({ offcanvasHeaderCloseBtnAriaAttributes: value })}
                                        prefix="aria-"
                                    />
                                </ToolsPanelItem>
                                <ToolsPanelItem
                                    hasValue={() => offcanvasBodyClassName !== offcanvasBodyDefaultClassName}
                                    label={__('Offcanvas body Class', 'rundizstrap-companion')}
                                    onDeselect={() => setAttributes({ offcanvasBodyClassName: offcanvasBodyDefaultClassName })}
                                    isShownByDefault
                                >
                                    <TextControl
                                        label={__('Offcanvas body Class', 'rundizstrap-companion')}
                                        value={offcanvasBodyClassName}
                                        onChange={(value) => setAttributes({ offcanvasBodyClassName: sanitizeClassList(value, true) })}
                                        onBlur={() => setAttributes({ offcanvasBodyClassName: sanitizeClassList(offcanvasBodyClassName) })}
                                        help={sprintf(
                                            __('Default is %1$s.', 'rundizstrap-companion'),
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
}// Edit
