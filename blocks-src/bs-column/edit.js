/**
 * Bootstrap column block edit component.
 * 
 * @package bbfse-plugin
 * @since 0.0.1
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
    SelectControl
} from '@wordpress/components';

import { useRef, useEffect } from '@wordpress/element';

import { useSelect } from '@wordpress/data';


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
                label={__('HTML element', 'bbfse-plugin')}
                value={tagName}
                onChange={onSelectTagName}
                options={[
                    { label: __('Default (<div>)', 'bbfse-plugin'), value: 'div' },
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
 * Edit component for Bootstrap column block.
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
            setAttributes({ className: 'col' });
        }
    }, [className, setAttributes]);

    // Check if valid Bootstrap column class is present.
    const hasColumnClass = className && className.toLowerCase().includes('col');

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
            {!hasColumnClass && (
                <InspectorControls>
                    <div style={{ padding: '0 16px', marginBottom: '16px' }}>
                        <Notice status="warning" isDismissible={false}>
                            {__('Please add a Bootstrap column class (e.g. "col", "col-md-6") in the "Additional CSS class(es)" field under Advanced settings.', 'bbfse-plugin')}
                        </Notice>
                    </div>
                </InspectorControls>
            )}
            <TagName {...innerBlocksProps} />
        </>
    );
}


export default GroupEdit;
