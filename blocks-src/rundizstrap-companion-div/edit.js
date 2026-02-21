/**
 * Customizable div block edit component.
 *
 * @package rundizstrap-companion
 * @since 0.0.1
 */

import { __, _x } from '@wordpress/i18n';

import {
    InnerBlocks,
    useBlockProps,
    InspectorControls,
    useInnerBlocksProps,
    store as blockEditorStore,
} from '@wordpress/block-editor';

import {
    SelectControl,
    TextControl,
    __experimentalToolsPanel as ToolsPanel,
    __experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { useRef } from '@wordpress/element';

import { useSelect } from '@wordpress/data';

import KeyValueControl from '../../assets/js/blocks/shared/keyValueControl.js';

import rundizstrap_companion_attribute_to_props from '../../assets/js/blocks/shared/rundizstrap-companion-attributes.js';
import rundizstrap_companion_sanitize_text_field from '../../assets/js/blocks/shared/rundizstrap-companion-sanitize.js';
import { BLOCKLV_TAG_NAME_OPTIONS, rundizstrap_companion_sanitizeTagName } from '../../assets/js/blocks/shared/rundizstrap-companion-tag-block-level.js';

const DEFAULT_TAG_NAME = 'div';

/**
 * Render inspector controls for the block.
 *
 * @param {Object}   props Component props.
 * @param {string}   props.tagName The HTML tag name.
 * @param {Function} props.onSelectTagName `onChange` function for the SelectControl.
 * @return {JSX.Element} The control group.
 */
function GroupEditControls({ tagName, onSelectTagName }) {
    const tagNameOptions = BLOCKLV_TAG_NAME_OPTIONS.map((item) => ({
        label: (item === DEFAULT_TAG_NAME ? __('Default (<div>)', 'rundizstrap-companion') : '<' + item + '>'),
        value: item,
    }));

    return (
        <InspectorControls group="advanced">
            <SelectControl
                __nextHasNoMarginBottom
                label={__('HTML element', 'rundizstrap-companion')}
                value={tagName}
                onChange={onSelectTagName}
                options={tagNameOptions}
            />
        </InspectorControls>
    );
}


/**
 * Edit component for customizable div block.
 *
 * @param {Object}   props Block props.
 * @param {Object}   props.attributes Block attributes.
 * @param {Function} props.setAttributes Function to set attributes.
 * @param {string}   props.clientId Block client ID.
 * @return {JSX.Element} The edit component.
 */
export default function Edit({ attributes, setAttributes, clientId }) {
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
    const TagName = rundizstrap_companion_sanitizeTagName(tagName, DEFAULT_TAG_NAME);
    const sanitizedAccesskey = rundizstrap_companion_sanitize_text_field(accesskey);
    const sanitizedLang = rundizstrap_companion_sanitize_text_field(lang);
    const sanitizedRole = rundizstrap_companion_sanitize_text_field(role);
    const sanitizedTitle = rundizstrap_companion_sanitize_text_field(title);

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

    const ref = useRef();

    const isObjectEmpty = (obj) => Object.keys(obj || {}).length === 0;

    const blockProps = useBlockProps({
        ref,
        ...(sanitizedAccesskey ? { accessKey: sanitizedAccesskey } : {}),
        ...(sanitizedLang ? { lang: sanitizedLang } : {}),
        ...(sanitizedRole ? { role: sanitizedRole } : {}),
        ...(Number.isInteger(tabindex) ? { tabIndex: tabindex } : {}),
        ...(sanitizedTitle ? { title: sanitizedTitle } : {}),
        ...rundizstrap_companion_attribute_to_props(dataAttributes, 'data-'),
        ...rundizstrap_companion_attribute_to_props(ariaAttributes, 'aria-'),
    });

    let renderAppender;
    if (!hasInnerBlocks) {
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
                    setAttributes({ tagName: rundizstrap_companion_sanitizeTagName(value, DEFAULT_TAG_NAME) })
                }
            />
            <InspectorControls>
                <ToolsPanel
                    label={__('HTML Attributes', 'rundizstrap-companion')}
                    resetAll={() => setAttributes({
                        accesskey: '',
                        lang: '',
                        role: '',
                        tabindex: undefined,
                        title: '',
                    })}
                >
                    <ToolsPanelItem
                        hasValue={() => accesskey !== ''}
                        label={_x('Accesskey', 'HTML attribute', 'rundizstrap-companion')}
                        onDeselect={() => setAttributes({ accesskey: '' })}
                        isShownByDefault
                    >
                        <TextControl
                            label={_x('Accesskey', 'HTML attribute', 'rundizstrap-companion')}
                            value={accesskey}
                            onChange={(value) => setAttributes({ accesskey: rundizstrap_companion_sanitize_text_field(value) })}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() => lang !== ''}
                        label={_x('Lang', 'HTML attribute', 'rundizstrap-companion')}
                        onDeselect={() => setAttributes({ lang: '' })}
                        isShownByDefault
                    >
                        <TextControl
                            label={_x('Lang', 'HTML attribute', 'rundizstrap-companion')}
                            value={lang}
                            onChange={(value) => setAttributes({ lang: rundizstrap_companion_sanitize_text_field(value) })}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() => role !== ''}
                        label={_x('Role', 'HTML attribute', 'rundizstrap-companion')}
                        onDeselect={() => setAttributes({ role: '' })}
                        isShownByDefault
                    >
                        <TextControl
                            label={_x('Role', 'HTML attribute', 'rundizstrap-companion')}
                            value={role}
                            onChange={(value) => setAttributes({ role: rundizstrap_companion_sanitize_text_field(value) })}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() => Number.isInteger(tabindex)}
                        label={__('Tab index', 'rundizstrap-companion')}
                        onDeselect={() => setAttributes({ tabindex: undefined })}
                        isShownByDefault
                    >
                        <TextControl
                            type="number"
                            label={__('Tab index', 'rundizstrap-companion')}
                            value={Number.isInteger(tabindex) ? tabindex : ''}
                            onChange={(value) => {
                                if (value === '') {
                                    setAttributes({ tabindex: undefined });
                                    return;
                                }

                                if (/^-?\d+$/.test(value)) {
                                    setAttributes({ tabindex: parseInt(value, 10) });
                                }
                            }}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() => title !== ''}
                        label={_x('Title', 'HTML attribute', 'rundizstrap-companion')}
                        onDeselect={() => setAttributes({ title: '' })}
                        isShownByDefault
                    >
                        <TextControl
                            label={_x('Title', 'HTML attribute', 'rundizstrap-companion')}
                            value={title}
                            onChange={(value) => setAttributes({ title: rundizstrap_companion_sanitize_text_field(value) })}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
            </InspectorControls>
            <InspectorControls>
                <ToolsPanel
                    label={__('Data and Aria Attributes', 'rundizstrap-companion')}
                    resetAll={() => setAttributes({
                        dataAttributes: {},
                        ariaAttributes: {},
                    })}
                >
                    <ToolsPanelItem
                        hasValue={() => !isObjectEmpty(dataAttributes)}
                        label={__('Data attributes', 'rundizstrap-companion')}
                        onDeselect={() => setAttributes({ dataAttributes: {} })}
                        isShownByDefault
                    >
                        <KeyValueControl
                            label={__('Data attributes', 'rundizstrap-companion') + ' '}
                            value={dataAttributes}
                            onChange={(value) => setAttributes({ dataAttributes: value })}
                            prefix="data-"
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() => !isObjectEmpty(ariaAttributes)}
                        label={__('Aria attributes', 'rundizstrap-companion')}
                        onDeselect={() => setAttributes({ ariaAttributes: {} })}
                        isShownByDefault
                    >
                        <KeyValueControl
                            label={__('Aria attributes', 'rundizstrap-companion') + ' '}
                            value={ariaAttributes}
                            onChange={(value) => setAttributes({ ariaAttributes: value })}
                            prefix="aria-"
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
            </InspectorControls>
            <TagName {...innerBlocksProps} />
        </>
    );
}
