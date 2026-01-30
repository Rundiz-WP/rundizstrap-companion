/**
 * Bootstrap navbar container block edit component.
 * 
 * @package bbfse-plugin
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

import KeyValueControl from '../../assets/js/blocks/shared/keyValueControl.js';

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
