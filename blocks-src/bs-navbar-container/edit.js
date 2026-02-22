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
                    label={__('Navbar Settings', 'rundizstrap-companion')}
                    resetAll={() => setAttributes({
                        tagName: 'nav',
                        dataAttributes: {},
                        ariaAttributes: {}
                    })}
                >
                    <ToolsPanelItem
                        hasValue={() => tagName !== 'nav'}
                        label={__('Tag Name', 'rundizstrap-companion')}
                        onDeselect={() => setAttributes({ tagName: 'nav' })}
                        isShownByDefault
                    >
                        <SelectControl
                            label={__('Tag Name', 'rundizstrap-companion')}
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
                        label={__('Data attributes', 'rundizstrap-companion')}
                        onDeselect={() => setAttributes({ dataAttributes: {} })}
                        isShownByDefault
                    >
                        <RundizStrapCompanionKeyValueCtrl
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
                        <RundizStrapCompanionKeyValueCtrl
                            label={__('Aria attributes', 'rundizstrap-companion') + ' '}
                            value={ariaAttributes}
                            onChange={(value) => setAttributes({ ariaAttributes: value })}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>

                <ToolsPanel
                    label={__('Container Settings', 'rundizstrap-companion')}
                    resetAll={() => setAttributes({
                        containerTagName: 'div',
                        containerClassName: 'container-fluid',
                        containerDataAttributes: {},
                        containerAriaAttributes: {}
                    })}
                >
                    <ToolsPanelItem
                        hasValue={() => containerTagName !== 'div'}
                        label={__('Container Tag Name', 'rundizstrap-companion')}
                        onDeselect={() => setAttributes({ containerTagName: 'div' })}
                        isShownByDefault
                    >
                        <SelectControl
                            label={__('Container Tag Name', 'rundizstrap-companion')}
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
                        label={__('Container Class', 'rundizstrap-companion')}
                        onDeselect={() => setAttributes({ containerClassName: 'container-fluid' })}
                        isShownByDefault
                    >
                        <TextControl
                            label={__('Container Class', 'rundizstrap-companion')}
                            value={containerClassName}
                            onChange={(value) => setAttributes({ containerClassName: value })}
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
