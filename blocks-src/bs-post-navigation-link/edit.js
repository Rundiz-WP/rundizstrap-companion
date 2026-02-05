/**
 * Bootstrap post navigation link block edit component.
 * 
 * @package bbfse-plug
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

import attributesToProps from '../../assets/js/blocks/shared/attributesToProps.js';


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
    const defaultLabel = (isNext ? __('Next', 'bbfse-plug') : __('Previous', 'bbfse-plug'));
    const isObjectEmpty = (obj) => Object.keys(obj || {}).length === 0;
    const previewTitle = __('An example title', 'bbfse-plug');

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
        { label: __('Unfiltered (default)', 'bbfse-plug'), value: '' },
        ...((taxonomies ?? [])
            .filter(({ visibility }) => !!visibility?.publicly_queryable)
            .map((item) => ({ label: item.name, value: item.slug }))),
    ];

    const blockProps = useBlockProps({
        className: 'post-navigation-link-' + type,
        rel: (rel ? rel : defaultRel),
        ...(tabindex !== '' ? { tabIndex: tabindex } : {}),
        ...attributesToProps(dataAttributes, 'data-'),
        ...attributesToProps(ariaAttributes, 'aria-'),
        onClick: (event) => event.preventDefault(),
    });

    return (
        <>
            <InspectorControls>
                <ToolsPanel
                    label={__('Settings', 'bbfse-plug')}
                    resetAll={() => {
                        setAttributes({
                            showTitle: false,
                            prependTextHtml: '',
                            appendTextHtml: '',
                        });
                    }}
                >
                    <ToolsPanelItem
                        label={__('Display the title as a link', 'bbfse-plug')}
                        isShownByDefault
                        hasValue={() => !!showTitle}
                        onDeselect={() => setAttributes({ showTitle: false })}
                    >
                        <ToggleControl
                            __nextHasNoMarginBottom
                            label={__('Display the title as a link', 'bbfse-plug')}
                            help={__('This will be replace custom label.', 'bbfse-plug')}
                            checked={!!showTitle}
                            onChange={() => setAttributes({ showTitle: !showTitle })}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        label={__('Prepend text/HTML', 'bbfse-plug')}
                        isShownByDefault
                        hasValue={() => prependTextHtml !== ''}
                        onDeselect={() => setAttributes({ prependTextHtml: '' })}
                    >
                        <TextControl
                            label={__('Prepend text/HTML', 'bbfse-plug')}
                            value={prependTextHtml}
                            onChange={(value) => setAttributes({ prependTextHtml: value })}
                            help={__('Text or HTML to prepend before the link text.', 'bbfse-plug')}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        label={__('Append text/HTML', 'bbfse-plug')}
                        isShownByDefault
                        hasValue={() => appendTextHtml !== ''}
                        onDeselect={() => setAttributes({ appendTextHtml: '' })}
                    >
                        <TextControl
                            label={__('Append text/HTML', 'bbfse-plug')}
                            value={appendTextHtml}
                            onChange={(value) => setAttributes({ appendTextHtml: value })}
                            help={__('Text or HTML to append after the link text.', 'bbfse-plug')}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>

                <ToolsPanel
                    label={__('Link Attributes', 'bbfse-plug')}
                    resetAll={() => {
                        setAttributes({
                            rel: '',
                            tabindex: '',
                        });
                    }}
                >
                    <ToolsPanelItem
                        label={__('Rel', 'bbfse-plug')}
                        isShownByDefault
                        hasValue={() => rel !== ''}
                        onDeselect={() => setAttributes({ rel: '' })}
                    >
                        <TextControl
                            label={__('Rel', 'bbfse-plug')}
                            value={rel}
                            onChange={(value) => setAttributes({ rel: value })}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        label={__('Tab index', 'bbfse-plug')}
                        isShownByDefault
                        hasValue={() => tabindex !== ''}
                        onDeselect={() => setAttributes({ tabindex: '' })}
                    >
                        <TextControl
                            label={__('Tab index', 'bbfse-plug')}
                            value={tabindex}
                            onChange={(value) => setAttributes({ tabindex: value })}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>

                <ToolsPanel
                    label={__('Data and Aria Attributes', 'bbfse-plug')}
                    resetAll={() => setAttributes({
                        dataAttributes: {},
                        ariaAttributes: {},
                    })}
                >
                    <ToolsPanelItem
                        hasValue={() => !isObjectEmpty(dataAttributes)}
                        label={__('Data attributes', 'bbfse-plug')}
                        onDeselect={() => setAttributes({ dataAttributes: {} })}
                        isShownByDefault
                    >
                        <KeyValueControl
                            label={__('Data attributes', 'bbfse-plug') + ' '}
                            value={dataAttributes}
                            onChange={(value) => setAttributes({ dataAttributes: value })}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() => !isObjectEmpty(ariaAttributes)}
                        label={__('Aria attributes', 'bbfse-plug')}
                        onDeselect={() => setAttributes({ ariaAttributes: {} })}
                        isShownByDefault
                    >
                        <KeyValueControl
                            label={__('Aria attributes', 'bbfse-plug') + ' '}
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
                    label={__('Filter by taxonomy', 'bbfse-plug')}
                    value={taxonomy}
                    options={taxonomyOptions}
                    onChange={(value) => setAttributes({ taxonomy: value })}
                    help={__('Only link to posts that have the same taxonomy terms as the current post. For example the same tags or categories.', 'bbfse-plug')}
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
                        aria-label={(isNext ? __('Next post', 'bbfse-plug') : __('Previous post', 'bbfse-plug'))}
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
