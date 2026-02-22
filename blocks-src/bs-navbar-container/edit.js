/**
 * Bootstrap navbar container block edit component.
 * 
 * @package rundizstrap-companion
 * @since 0.0.1
 */


import { __ } from '@wordpress/i18n';

import { useBlockProps, InspectorControls, useInnerBlocksProps } from '@wordpress/block-editor';

import {
    SelectControl,
    TextControl,
    __experimentalToolsPanel as ToolsPanel,
    __experimentalToolsPanelItem as ToolsPanelItem
} from '@wordpress/components';

import RundizStrapCompanionKeyValueCtrl from '../../assets/js/blocks/shared/rundizstrap-companion-keyvalue-control.js';

import rundizstrap_companion_attribute_to_props from '../../assets/js/blocks/shared/rundizstrap-companion-attributes.js';

import { rundizstrap_companion_sanitize_html_class_list } from '../../assets/js/blocks/shared/rundizstrap-companion-sanitize.js';

import {
    rundizstrap_companion_blockLevelTagNameOptions,
    rundizstrap_companion_sanitizeTagName
} from '../../assets/js/blocks/shared/rundizstrap-companion-tag-block-level.js';


const DEFAULT_TAG_NAME = 'nav';

const DEFAULT_CONTAINER_TAG_NAME = 'div';

const BLOCK_LEVEL_TAG_NAME_OPTIONS = rundizstrap_companion_blockLevelTagNameOptions.map((item) => ({
    label: '<' + item + '>',
    value: item,
}));


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

    const SanitizedTagName = rundizstrap_companion_sanitizeTagName(tagName, DEFAULT_TAG_NAME);
    const SanitizedContainerTagName = rundizstrap_companion_sanitizeTagName(containerTagName, DEFAULT_CONTAINER_TAG_NAME);
    const sanitizedContainerClassName = rundizstrap_companion_sanitize_html_class_list(containerClassName || '');

    const blockProps = useBlockProps({
        className: 'navbar',
        ...rundizstrap_companion_attribute_to_props(dataAttributes, 'data-'),
        ...rundizstrap_companion_attribute_to_props(ariaAttributes, 'aria-'),
    });

    const innerBlocksProps = useInnerBlocksProps({
        className: sanitizedContainerClassName,
        ...rundizstrap_companion_attribute_to_props(containerDataAttributes, 'data-'),
        ...rundizstrap_companion_attribute_to_props(containerAriaAttributes, 'aria-'),
    });

    // Helper to check if objects are empty
    const isObjectEmpty = (obj) => Object.keys(obj || {}).length === 0;

    return (
        <>
            <InspectorControls>
                <ToolsPanel
                    label={__('Navbar Settings', 'rundizstrap-companion')}
                    resetAll={() => setAttributes({
                        tagName: DEFAULT_TAG_NAME,
                        dataAttributes: {},
                        ariaAttributes: {}
                    })}
                >
                    <ToolsPanelItem
                        hasValue={() => tagName !== DEFAULT_TAG_NAME}
                        label={__('Tag Name', 'rundizstrap-companion')}
                        onDeselect={() => setAttributes({ tagName: DEFAULT_TAG_NAME })}
                        isShownByDefault
                    >
                        <SelectControl
                            label={__('Tag Name', 'rundizstrap-companion')}
                            value={SanitizedTagName}
                            options={BLOCK_LEVEL_TAG_NAME_OPTIONS}
                            onChange={(value) => setAttributes({ tagName: rundizstrap_companion_sanitizeTagName(value, DEFAULT_TAG_NAME) })}
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

                <ToolsPanel
                    label={__('Container Settings', 'rundizstrap-companion')}
                    resetAll={() => setAttributes({
                        containerTagName: DEFAULT_CONTAINER_TAG_NAME,
                        containerClassName: 'container-fluid',
                        containerDataAttributes: {},
                        containerAriaAttributes: {}
                    })}
                >
                    <ToolsPanelItem
                        hasValue={() => containerTagName !== DEFAULT_CONTAINER_TAG_NAME}
                        label={__('Container Tag Name', 'rundizstrap-companion')}
                        onDeselect={() => setAttributes({ containerTagName: DEFAULT_CONTAINER_TAG_NAME })}
                        isShownByDefault
                    >
                        <SelectControl
                            label={__('Container Tag Name', 'rundizstrap-companion')}
                            value={SanitizedContainerTagName}
                            options={BLOCK_LEVEL_TAG_NAME_OPTIONS}
                            onChange={(value) => setAttributes({ containerTagName: rundizstrap_companion_sanitizeTagName(value, DEFAULT_CONTAINER_TAG_NAME) })}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => containerClassName !== 'container-fluid'}
                        label={__('Container Class', 'rundizstrap-companion')}
                        onDeselect={() => setAttributes({ containerClassName: 'container-fluid' })}
                        isShownByDefault
                    >
                        <TextControl
                            label={__('Container Class', 'rundizstrap-companion')}
                            value={containerClassName}
                            onChange={(value) => setAttributes({ containerClassName: rundizstrap_companion_sanitize_html_class_list(value, true) })}
                            onBlur={() => setAttributes({ containerClassName: rundizstrap_companion_sanitize_html_class_list(containerClassName || '') })}
                            help={__('Default is container-fluid. You can change to container, container-lg, etc.', 'rundizstrap-companion')}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !isObjectEmpty(containerDataAttributes)}
                        label={__('Container data attributes', 'rundizstrap-companion')}
                        onDeselect={() => setAttributes({ containerDataAttributes: {} })}
                        isShownByDefault
                    >
                        <RundizStrapCompanionKeyValueCtrl
                            label={__('Container data attributes', 'rundizstrap-companion') + ' '}
                            value={containerDataAttributes}
                            onChange={(value) => setAttributes({ containerDataAttributes: value })}
                            prefix="data-"
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !isObjectEmpty(containerAriaAttributes)}
                        label={__('Container aria attributes', 'rundizstrap-companion')}
                        onDeselect={() => setAttributes({ containerAriaAttributes: {} })}
                        isShownByDefault
                    >
                        <RundizStrapCompanionKeyValueCtrl
                            label={__('Container aria attributes', 'rundizstrap-companion') + ' '}
                            value={containerAriaAttributes}
                            onChange={(value) => setAttributes({ containerAriaAttributes: value })}
                            prefix="aria-"
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
            </InspectorControls>

            <SanitizedTagName {...blockProps}>
                <SanitizedContainerTagName {...innerBlocksProps} />
            </SanitizedTagName>
        </>
    );
}// Edit
