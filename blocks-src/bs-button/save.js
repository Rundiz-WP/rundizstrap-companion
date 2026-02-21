/**
 * Bootstrap button block save component.
 *
 * @package rundizstrap-companion
 * @since 0.0.1
 */

import { useBlockProps } from '@wordpress/block-editor';

import rundizstrap_companion_attribute_to_props from '../../assets/js/blocks/shared/rundizstrap-companion-attributes.js';

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
    const dataProps = rundizstrap_companion_attribute_to_props(dataAttributes, 'data-');
    const ariaProps = rundizstrap_companion_attribute_to_props(ariaAttributes, 'aria-');

    const commonProps = {
        ...blockProps,
        ...dataProps,
        ...ariaProps,
    };

    const linkProps = tagName === 'a'
        ? {
            ...(href ? { href } : {}),
            ...(linkRole ? { role: linkRole } : {}),
            ...(Number.isInteger(linkTabIndex) ? { tabIndex: linkTabIndex } : {}),
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
