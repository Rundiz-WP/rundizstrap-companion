/**
 * Bootstrap navbar toggler button block edit component.
 * 
 * @package bbfse-plugin
 * @since 0.0.1
 */


import { __ } from '@wordpress/i18n';

import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

import {
    TextControl,
    __experimentalToolsPanel as ToolsPanel,
    __experimentalToolsPanelItem as ToolsPanelItem
} from '@wordpress/components';

import KeyValueControl from '../../assets/js/blocks/shared/keyValueControl.js';

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
