/**
 * Bootstrap button block save component.
 *
 * @package bbfse-plugin
 * @since 0.0.1
 */

import { useBlockProps } from '@wordpress/block-editor';

/**
 * Helper to convert attribute objects to props with prefixes.
 *
 * @param {Object} attributes Key-value pairs.
 * @param {string} prefix Prefix like 'data-' or 'aria-'.
 * @returns {Object} Props object.
 */
const attributesToProps = (attributes, prefix) => {
    const props = {};
    if (attributes) {
        Object.entries(attributes).forEach(([key, value]) => {
            if (key) {
                props[`${prefix}${key}`] = value;
            }
        });
    }
    return props;
};

export default function Save({ attributes }) {
    const {
        tagName,
        textHtml,
        href,
        linkRole,
        linkTabIndex,
        dataAttributes,
        ariaAttributes,
        autofocus,
        disabled,
        form,
        formenctype,
        formmethod,
        formnovalidate,
        formtarget,
        name,
        type,
        value,
    } = attributes;

    const TagName = tagName === 'a' ? 'a' : 'button';

    const blockProps = useBlockProps.save();
    const dataProps = attributesToProps(dataAttributes, 'data-');
    const ariaProps = attributesToProps(ariaAttributes, 'aria-');

    const commonProps = {
        ...blockProps,
        ...dataProps,
        ...ariaProps,
    };

    const linkProps = tagName === 'a'
        ? {
            ...(href ? { href } : {}),
            ...(linkRole ? { role: linkRole } : {}),
            ...(linkTabIndex ? { tabIndex: linkTabIndex } : {}),
        }
        : {};

    const buttonProps = tagName === 'button'
        ? {
            ...(autofocus ? { autoFocus: true } : {}),
            ...(disabled ? { disabled: true } : {}),
            ...(form ? { form } : {}),
            ...(formenctype ? { formEncType: formenctype } : {}),
            ...(formmethod ? { formMethod: formmethod } : {}),
            ...(formnovalidate ? { formNoValidate: true } : {}),
            ...(formtarget ? { formTarget: formtarget } : {}),
            ...(name ? { name } : {}),
            ...(type ? { type } : {}),
            ...(value ? { value } : {}),
        }
        : {};

    const elementProps = {
        ...commonProps,
        ...linkProps,
        ...buttonProps,
    };

    if (textHtml) {
        return (
            <TagName {...elementProps} dangerouslySetInnerHTML={{ __html: textHtml }} />
        );
    }

    return (
        <TagName {...elementProps} />
    );
}
