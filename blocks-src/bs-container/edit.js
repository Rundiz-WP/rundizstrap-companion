/**
 * Bootstrap container block edit component.
 * 
 * @package bbfse-plug
 * @since 0.0.1
 * @author Vee W.
 */


import { __ } from '@wordpress/i18n';

import {
    InnerBlocks,
    useBlockProps,
    InspectorControls,
    useInnerBlocksProps,
    store as blockEditorStore,
} from '@wordpress/block-editor';

import {
    Notice,
    SelectControl,
    __experimentalToolsPanel as ToolsPanel,
    __experimentalToolsPanelItem as ToolsPanelItem
} from '@wordpress/components';

import { useRef, useEffect } from '@wordpress/element';

import { useSelect } from '@wordpress/data';

import KeyValueControl from '../../assets/js/blocks/shared/keyValueControl.js';

/**
 * Render inspector controls for the block.
 *
 * @param {Object}   props Component props.
 * @param {string}   props.tagName The HTML tag name.
 * @param {Function} props.onSelectTagName `onChange` function for the SelectControl.
 * @return {JSX.Element} The control group.
 */
function GroupEditControls({ tagName, onSelectTagName }) {
    return (
        <InspectorControls group="advanced">
            <SelectControl
                __nextHasNoMarginBottom
                label={__('HTML element', 'bbfse-plug')}
                value={tagName}
                onChange={onSelectTagName}
                options={[
                    { label: __('Default (<div>)', 'bbfse-plug'), value: 'div' },
                    { label: '<header>', value: 'header' },
                    { label: '<main>', value: 'main' },
                    { label: '<section>', value: 'section' },
                    { label: '<article>', value: 'article' },
                    { label: '<aside>', value: 'aside' },
                    { label: '<footer>', value: 'footer' },
                ]}
            />
        </InspectorControls>
    );
}


/**
 * Edit component for Bootstrap container block.
 * 
 * @param {Object}   props Block props.
 * @param {Object}   props.attributes Block attributes.
 * @param {Function} props.setAttributes Function to set attributes.
 * @param {string}   props.clientId Block client ID.
 * @return {JSX.Element} The edit component.
 */
function GroupEdit({ attributes, setAttributes, clientId }) {
    const {
        tagName: TagName = 'div',
        className,
        dataAttributes,
        ariaAttributes,
    } = attributes;

    const { hasInnerBlocks } = useSelect(
        (select) => {
            const { getBlock } = select(blockEditorStore);
            const block = getBlock(clientId);
            return {
                hasInnerBlocks: !!(block && block.innerBlocks.length),
            };
        },
        [clientId]
    );

    // Hooks.
    const ref = useRef();

    useEffect(() => {
        if (className === undefined) {
            setAttributes({ className: 'container' });
        }
    }, [className, setAttributes]);

    // Check if valid Bootstrap container class is present. Accepted if value is 'container', 'container-fluid', 'container-[anything]'.
    const hasContainerClass = className && className.toLowerCase().includes('container');

    const isObjectEmpty = (obj) => Object.keys(obj || {}).length === 0;

    const blockProps = useBlockProps({
        ref,
        // No default class enforced.
    });

    // Default to the regular appender being rendered.
    let renderAppender;
    if (!hasInnerBlocks) {
        // When the block is empty, use the larger button appender.
        renderAppender = InnerBlocks.ButtonBlockAppender;
    }

    const innerBlocksProps = useInnerBlocksProps(
        blockProps,
        {
            dropZoneElement: ref.current,
            renderAppender,
        }
    );

    return (
        <>
            <GroupEditControls
                tagName={TagName}
                onSelectTagName={(value) =>
                    setAttributes({ tagName: value })
                }
            />
            {!hasContainerClass && (
                <InspectorControls>
                    <div style={{ padding: '0 16px', marginBottom: '16px' }}>
                        <Notice status="warning" isDismissible={false}>
                            {__('Please add a Bootstrap container class (e.g. "container", "container-fluid") in the "Additional CSS class(es)" field under Advanced settings.', 'bbfse-plug')}
                        </Notice>
                    </div>
                </InspectorControls>
            )}
            <InspectorControls>
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
            <TagName {...innerBlocksProps} />
        </>
    );
}


export default GroupEdit;
