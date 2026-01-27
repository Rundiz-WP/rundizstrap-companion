/**
 * Bootstrap column block save component.
 * 
 * @package bbfse-plugin
 * @since 0.0.1
 */

import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

/**
 * Save component for Bootstrap column block.
 * Outputs simple wrapper with user chosen tag.
 * 
 * @param {Object} props Block props.
 * @param {Object} props.attributes Block attributes.
 * @return {JSX.Element} The saved element.
 */
export default function save({ attributes: { tagName: Tag = 'div' } }) {
    // No hardcoded class. relying on attributes.className which WP handles automatically.
    const blockProps = useBlockProps.save({});

    const innerBlocksProps = useInnerBlocksProps.save(blockProps);

    return <Tag {...innerBlocksProps} />;
}
