/**
 * Customizable div block save component.
 *
 * @package rundizstrap-companion
 * @since 0.0.1
 */

import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

import rundizstrap_companion_attribute_to_props from '../../assets/js/blocks/shared/rundizstrap-companion-attributes.js';

import rundizstrap_companion_sanitize_text_field from '../../assets/js/blocks/shared/rundizstrap-companion-sanitize.js';

import { rundizstrap_companion_sanitizeTagName } from '../../assets/js/blocks/shared/rundizstrap-companion-tag-block-level.js';


const DEFAULT_TAG_NAME = 'div';


/**
 * Save component for customizable div block.
 *
 * @param {Object} props Block props.
 * @param {Object} props.attributes Block attributes.
 * @return {JSX.Element} The saved element.
 */
export default function Save({ attributes }) {
    const {
        tagName,
        accesskey,
        lang,
        role,
        tabindex,
        title,
        dataAttributes,
        ariaAttributes,
    } = attributes;
    const SanitizedTagName = rundizstrap_companion_sanitizeTagName(tagName, DEFAULT_TAG_NAME);
    const sanitizedAccesskey = rundizstrap_companion_sanitize_text_field(accesskey);
    const sanitizedLang = rundizstrap_companion_sanitize_text_field(lang);
    const sanitizedRole = rundizstrap_companion_sanitize_text_field(role);
    const sanitizedTitle = rundizstrap_companion_sanitize_text_field(title);

    const blockProps = useBlockProps.save({
        ...(sanitizedAccesskey ? { accessKey: sanitizedAccesskey } : {}),
        ...(sanitizedLang ? { lang: sanitizedLang } : {}),
        ...(sanitizedRole ? { role: sanitizedRole } : {}),
        ...(Number.isInteger(tabindex) ? { tabIndex: tabindex } : {}),
        ...(sanitizedTitle ? { title: sanitizedTitle } : {}),
        ...rundizstrap_companion_attribute_to_props(dataAttributes, 'data-'),
        ...rundizstrap_companion_attribute_to_props(ariaAttributes, 'aria-'),
    });

    const innerBlocksProps = useInnerBlocksProps.save(blockProps);

    return <SanitizedTagName {...innerBlocksProps} />;
}// Save
