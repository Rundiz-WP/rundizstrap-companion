/**
 * Bootstrap column block save component.
 * 
 * @package rundizstrap-companion
 * @since 0.0.1
 */

import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

import attributesToProps from '../../assets/js/blocks/shared/attributesToProps.js';

/**
 * Save component for Bootstrap column block.
 * Outputs simple wrapper with user chosen tag.
 * 
 * @param {Object} props Block props.
 * @param {Object} props.attributes Block attributes.
 * @return {JSX.Element} The saved element.
 */
export default function save({ attributes: { tagName: Tag = 'div', dataAttributes, ariaAttributes } }) {
    // No hardcoded class. relying on attributes.className which WP handles automatically.
    const blockProps = useBlockProps.save({
        ...attributesToProps(dataAttributes, 'data-'),
        ...attributesToProps(ariaAttributes, 'aria-'),
    });

    const innerBlocksProps = useInnerBlocksProps.save(blockProps);

    return <Tag {...innerBlocksProps} />;
}
