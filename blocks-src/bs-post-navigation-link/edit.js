/**
 * Bootstrap post navigation link block edit component.
 * 
 * @package rundizstrap-companion
 * @since 0.0.1
 */


import { __ } from '@wordpress/i18n';

import {
    InspectorControls,
    RichText,
    useBlockProps,
} from '@wordpress/block-editor';

import {
    SelectControl,
    TextControl,
    ToggleControl,
    __experimentalToolsPanel as ToolsPanel,
    __experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';

import { store as coreDataStore } from '@wordpress/core-data';

import KeyValueControl from '../../assets/js/blocks/shared/keyValueControl.js';

import rundizstrap_companion_attribute_to_props from '../../assets/js/blocks/shared/rundizstrap-companion-attributes.js';


export default function Edit({ context: { postType }, attributes, setAttributes }) {
    const {
        type,
        label,
        showTitle,
        taxonomy,
        prependTextHtml,
        appendTextHtml,
        rel,
        tabindex,
        dataAttributes,
        ariaAttributes,
    } = attributes;

    const isNext = type === 'next';
    const defaultRel = (isNext ? 'next' : 'prev');
    const defaultLabel = (isNext ? __('Next', 'rundizstrap-companion') : __('Previous', 'rundizstrap-companion'));
    const isObjectEmpty = (obj) => Object.keys(obj || {}).length === 0;
    const previewTitle = __('An example title', 'rundizstrap-companion');

    const taxonomies = useSelect(
        (select) => {
            return select(coreDataStore).getTaxonomies({
                type: postType,
                per_page: -1,
            });
        },
        [postType]
    );

    const taxonomyOptions = [
        { label: __('Unfiltered (default)', 'rundizstrap-companion'), value: '' },
        ...((taxonomies ?? [])
            .filter(({ visibility }) => !!visibility?.publicly_queryable)
            .map((item) => ({ label: item.name, value: item.slug }))),
    ];

    const blockProps = useBlockProps({
        className: 'post-navigation-link-' + type,
        rel: (rel ? rel : defaultRel),
        ...(Number.isInteger(tabindex) ? { tabIndex: tabindex } : {}),
        ...rundizstrap_companion_attribute_to_props(dataAttributes, 'data-'),
        ...rundizstrap_companion_attribute_to_props(ariaAttributes, 'aria-'),
        onClick: (event) => event.preventDefault(),
    });

    return (
        <>
            <InspectorControls>
                <ToolsPanel
                    label={__('Settings', 'rundizstrap-companion')}
                    resetAll={() => {
                        setAttributes({
                            showTitle: false,
                            prependTextHtml: '',
                            appendTextHtml: '',
                        });
                    }}
                >
                    <ToolsPanelItem
                        label={__('Display the title as a link', 'rundizstrap-companion')}
                        isShownByDefault
                        hasValue={() => !!showTitle}
                        onDeselect={() => setAttributes({ showTitle: false })}
                    >
                        <ToggleControl
                            __nextHasNoMarginBottom
                            label={__('Display the title as a link', 'rundizstrap-companion')}
                            help={__('This will be replace custom label.', 'rundizstrap-companion')}
                            checked={!!showTitle}
                            onChange={() => setAttributes({ showTitle: !showTitle })}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        label={__('Prepend text/HTML', 'rundizstrap-companion')}
                        isShownByDefault
                        hasValue={() => prependTextHtml !== ''}
                        onDeselect={() => setAttributes({ prependTextHtml: '' })}
                    >
                        <TextControl
                            label={__('Prepend text/HTML', 'rundizstrap-companion')}
                            value={prependTextHtml}
                            onChange={(value) => setAttributes({ prependTextHtml: value })}
                            help={__('Text or HTML to prepend before the link text.', 'rundizstrap-companion')}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        label={__('Append text/HTML', 'rundizstrap-companion')}
                        isShownByDefault
                        hasValue={() => appendTextHtml !== ''}
                        onDeselect={() => setAttributes({ appendTextHtml: '' })}
                    >
                        <TextControl
                            label={__('Append text/HTML', 'rundizstrap-companion')}
                            value={appendTextHtml}
                            onChange={(value) => setAttributes({ appendTextHtml: value })}
                            help={__('Text or HTML to append after the link text.', 'rundizstrap-companion')}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>

                <ToolsPanel
                    label={__('Link Attributes', 'rundizstrap-companion')}
                    resetAll={() => {
                        setAttributes({
                            rel: '',
                            tabindex: undefined,
                        });
                    }}
                >
                    <ToolsPanelItem
                        label={__('Rel', 'rundizstrap-companion')}
                        isShownByDefault
                        hasValue={() => rel !== ''}
                        onDeselect={() => setAttributes({ rel: '' })}
                    >
                        <TextControl
                            label={__('Rel', 'rundizstrap-companion')}
                            value={rel}
                            onChange={(value) => setAttributes({ rel: value })}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        label={__('Tab index', 'rundizstrap-companion')}
                        isShownByDefault
                        hasValue={() => Number.isInteger(tabindex)}
                        onDeselect={() => setAttributes({ tabindex: undefined })}
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
                </ToolsPanel>

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

            <InspectorControls group="advanced">
                <SelectControl
                    __next40pxDefaultSize
                    __nextHasNoMarginBottom
                    label={__('Filter by taxonomy', 'rundizstrap-companion')}
                    value={taxonomy}
                    options={taxonomyOptions}
                    onChange={(value) => setAttributes({ taxonomy: value })}
                    help={__('Only link to posts that have the same taxonomy terms as the current post. For example the same tags or categories.', 'rundizstrap-companion')}
                />
            </InspectorControls>

            <a {...blockProps}>
                {!!prependTextHtml && (
                    <span dangerouslySetInnerHTML={{ __html: prependTextHtml }} />
                )}
                {showTitle ? (
                    <>{previewTitle}</>
                ) : (
                    <RichText
                        tagName="span"
                        identifier="label"
                        aria-label={(isNext ? __('Next post', 'rundizstrap-companion') : __('Previous post', 'rundizstrap-companion'))}
                        placeholder={defaultLabel}
                        value={label}
                        withoutInteractiveFormatting
                        onChange={(newLabel) => setAttributes({ label: newLabel })}
                    />
                )}
                {!!appendTextHtml && (
                    <span dangerouslySetInnerHTML={{ __html: appendTextHtml }} />
                )}
            </a>
        </>
    );
}
