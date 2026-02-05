/**
 * Bootstrap row block save component.
 * 
 * @package bbfse-plug
 * @since 0.0.1
 */

import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

import attributesToProps from '../../assets/js/blocks/shared/attributesToProps.js';

/**
 * Save component for Bootstrap row block.
 * Outputs single-level HTML with 'row' class merged with WordPress auto-generated classes.
 * 
 * @param {Object} props Block props.
 * @param {Object} props.attributes Block attributes.
 * @return {JSX.Element} The saved element.
 */
export default function save({ attributes: { tagName: Tag = 'div', dataAttributes, ariaAttributes } }) {
    // Merge 'row' class with WordPress auto-generated classes.
    const blockProps = useBlockProps.save({
        className: 'row',
        ...attributesToProps(dataAttributes, 'data-'),
        ...attributesToProps(ariaAttributes, 'aria-'),
    });

    // Single-level output: apply innerBlocksProps to the same element.
    const innerBlocksProps = useInnerBlocksProps.save(blockProps);

    return <Tag {...innerBlocksProps} />;
}
