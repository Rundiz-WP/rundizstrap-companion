/**
 * Customizable div block save component.
 *
 * @package rundizstrap-companion
 * @since 0.0.1
 */

import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

import attributesToProps from '../../assets/js/blocks/shared/attributesToProps.js';

/**
 * Save component for customizable div block.
 *
 * @param {Object} props Block props.
 * @param {Object} props.attributes Block attributes.
 * @return {JSX.Element} The saved element.
 */
export default function Save({ attributes }) {
    const {
        tagName: Tag = 'div',
        accesskey,
        lang,
        role,
        tabindex,
        title,
        dataAttributes,
        ariaAttributes,
    } = attributes;

    const blockProps = useBlockProps.save({
        ...(accesskey ? { accessKey: accesskey } : {}),
        ...(lang ? { lang } : {}),
        ...(role ? { role } : {}),
        ...(Number.isInteger(tabindex) ? { tabIndex: tabindex } : {}),
        ...(title ? { title } : {}),
        ...attributesToProps(dataAttributes, 'data-'),
        ...attributesToProps(ariaAttributes, 'aria-'),
    });

    const innerBlocksProps = useInnerBlocksProps.save(blockProps);

    return <Tag {...innerBlocksProps} />;
}
