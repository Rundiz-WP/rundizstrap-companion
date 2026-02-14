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

import attributesToProps from '../../assets/js/blocks/shared/attributesToProps.js';

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
                label={__('HTML element', 'rundizstrap-companion')}
                value={tagName}
                onChange={onSelectTagName}
                options={[
                    { label: __('Default (<div>)', 'rundizstrap-companion'), value: 'div' },
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
        tagName: TagName = 'div',
        accesskey,
        lang,
        role,
        tabindex,
        title,
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

    const ref = useRef();

    const isObjectEmpty = (obj) => Object.keys(obj || {}).length === 0;

    const blockProps = useBlockProps({
        ref,
        ...(accesskey ? { accessKey: accesskey } : {}),
        ...(lang ? { lang } : {}),
        ...(role ? { role } : {}),
        ...(Number.isInteger(tabindex) ? { tabIndex: tabindex } : {}),
        ...(title ? { title } : {}),
        ...attributesToProps(dataAttributes, 'data-'),
        ...attributesToProps(ariaAttributes, 'aria-'),
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
                    setAttributes({ tagName: value })
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
                            onChange={(value) => setAttributes({ accesskey: value })}
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
                            onChange={(value) => setAttributes({ lang: value })}
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
                            onChange={(value) => setAttributes({ role: value })}
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

                                const parsedValue = Number(value);
                                if (Number.isInteger(parsedValue)) {
                                    setAttributes({ tabindex: parsedValue });
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
                            onChange={(value) => setAttributes({ title: value })}
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
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
            </InspectorControls>
            <TagName {...innerBlocksProps} />
        </>
    );
}
