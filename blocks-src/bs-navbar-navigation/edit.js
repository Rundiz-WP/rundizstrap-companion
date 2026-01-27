/**
 * Bootstrap navbar navigation block edit component.
 * 
 * @package bbfse-plugin
 * @since 0.0.1
 */


import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
    SelectControl,
    TextControl,
    Button,
    Disabled,
    ExternalLink,
    Notice,
    Spinner,
    __experimentalToolsPanel as ToolsPanel,
    __experimentalToolsPanelItem as ToolsPanelItem
} from '@wordpress/components';
import { addQueryArgs } from '@wordpress/url';
import { useSelect } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';
import { useEffect, useState } from '@wordpress/element';
import { decodeEntities } from '@wordpress/html-entities';
import ServerSideRender from '@wordpress/server-side-render';
import metadata from './block.json';


/**
 * Key-Value input control.
 */
const KeyValueControl = ({ label, value, onChange }) => {
    const attributes = value || {};
    const [localAttributes, setLocalAttributes] = useState([]);

    useEffect(() => {
        const attrsArray = Object.entries(attributes).map(([key, val]) => ({ key, val }));
        setLocalAttributes(attrsArray);
    }, [value]);

    const updateAttribute = (index, field, newValue) => {
        const newAttributes = [...localAttributes];
        newAttributes[index][field] = newValue;
        setLocalAttributes(newAttributes);

        const keys = newAttributes.map(attr => attr.key);
        const hasDuplicates = keys.some((key, i) => keys.indexOf(key) !== i);

        if (!hasDuplicates) {
            const attrObject = newAttributes.reduce((obj, item) => {
                if (item.key) obj[item.key] = item.val;
                return obj;
            }, {});
            onChange(attrObject);
        }
    };

    const addAttribute = () => {
        const newAttributes = [...localAttributes, { key: '', val: '' }];
        setLocalAttributes(newAttributes);
    };

    const removeAttribute = (index) => {
        const newAttributes = localAttributes.filter((_, i) => i !== index);
        setLocalAttributes(newAttributes);
        const attrObject = newAttributes.reduce((obj, item) => {
            if (item.key) obj[item.key] = item.val;
            return obj;
        }, {});
        onChange(attrObject);
    };

    return (
        <div className="components-base-control">
            <label className="components-base-control__label">{label}</label>
            {localAttributes.map((attr, index) => (
                <div key={index} style={{ display: 'flex', marginBottom: '5px', gap: '5px' }}>
                    <TextControl
                        placeholder={__('Key', 'bbfse-plugin')}
                        value={attr.key}
                        onChange={(val) => updateAttribute(index, 'key', val)}
                    />
                    <TextControl
                        placeholder={__('Value', 'bbfse-plugin')}
                        value={attr.val}
                        onChange={(val) => updateAttribute(index, 'val', val)}
                    />
                    <Button
                        isSmall
                        isDestructive
                        variant="secondary"
                        icon="trash"
                        onClick={() => removeAttribute(index)}
                        label={__('Remove', 'bbfse-plugin')}
                    />
                </div>
            ))}
            <Button variant="secondary" onClick={addAttribute} isSmall>
                {__('Add attribute', 'bbfse-plugin')}
            </Button>
        </div>
    );
};


export default function Edit({ attributes, setAttributes }) {
    const { navigationRef, dataAttributes, ariaAttributes, dropdownClassName } = attributes;

    const createNavigationUrl = addQueryArgs('post-new.php', { post_type: 'wp_navigation' });
    const manageNavigationUrl = addQueryArgs('site-editor.php', { postType: 'wp_navigation' });

    const navigationQuery = {
        per_page: -1,
        status: 'publish'
    };

    // retrieve posts from DB.
    const navigationPosts = useSelect(
        (select) => select(coreDataStore).getEntityRecords('postType', 'wp_navigation', navigationQuery),
        []
    );

    const navigationOptions = [
        {
            label: __('Auto: first available', 'bbfse-plugin'),
            value: 0
        }
    ];

    if (Array.isArray(navigationPosts)) {
        navigationPosts.forEach((post) => {
            const title = post?.title?.rendered ? decodeEntities(post.title.rendered) : __('(no title)', 'bbfse-plugin');
            navigationOptions.push({
                label: title,
                value: post.id
            });
        });
    }

    const blockProps = useBlockProps({
        className: 'navbar-nav'
    });

    const isObjectEmpty = (obj) => Object.keys(obj || {}).length === 0;

    return (
        <>
            <InspectorControls>
                <ToolsPanel
                    label={__('Navigation Settings', 'bbfse-plugin')}
                    resetAll={() => setAttributes({
                        navigationRef: 0,
                        dataAttributes: {},
                        ariaAttributes: {},
                        dropdownClassName: ''
                    })}
                >
                    <ToolsPanelItem
                        hasValue={() => navigationRef !== 0}
                        label={__('Navigation', 'bbfse-plugin')}
                        onDeselect={() => setAttributes({ navigationRef: 0 })}
                        isShownByDefault
                    >
                        {navigationPosts === null && (
                            <Spinner />
                        )}
                        {navigationPosts !== null && (
                            <SelectControl
                                label={__('Navigation', 'bbfse-plugin')}
                                value={navigationRef}
                                options={navigationOptions}
                                onChange={(value) => setAttributes({ navigationRef: parseInt(value, 10) || 0 })}
                                help={__('Select a Navigation post or leave auto to use the first available.', 'bbfse-plugin')}
                            />
                        )}
                        <div>
                            <ExternalLink href={createNavigationUrl}>
                                {__('Create a new navigation', 'bbfse-plugin')}
                            </ExternalLink>
                        </div>
                        <div>
                            <ExternalLink href={manageNavigationUrl}>
                                {__('Manage all navigations', 'bbfse-plugin')}
                            </ExternalLink>
                        </div>
                        {Array.isArray(navigationPosts) && navigationPosts.length === 0 && (
                            <Notice status="warning" isDismissible={false}>
                                {__('No Navigation posts found. Create one in the Site Editor > Navigation.', 'bbfse-plugin')}
                            </Notice>
                        )}
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !isObjectEmpty(dataAttributes)}
                        label={__('Data attributes', 'bbfse-plugin')}
                        onDeselect={() => setAttributes({ dataAttributes: {} })}
                        isShownByDefault
                    >
                        <KeyValueControl
                            label={__('Data attributes', 'bbfse-plugin') + ' '}
                            value={dataAttributes}
                            onChange={(value) => setAttributes({ dataAttributes: value })}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !isObjectEmpty(ariaAttributes)}
                        label={__('Aria attributes', 'bbfse-plugin')}
                        onDeselect={() => setAttributes({ ariaAttributes: {} })}
                        isShownByDefault
                    >
                        <KeyValueControl
                            label={__('Aria attributes', 'bbfse-plugin') + ' '}
                            value={ariaAttributes}
                            onChange={(value) => setAttributes({ ariaAttributes: value })}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !!dropdownClassName}
                        label={__('Dropdown menu class', 'bbfse-plugin')}
                        onDeselect={() => setAttributes({ dropdownClassName: '' })}
                        isShownByDefault
                    >
                        <TextControl
                            label={__('Dropdown menu class', 'bbfse-plugin')}
                            value={dropdownClassName}
                            onChange={(value) => setAttributes({ dropdownClassName: value })}
                            help={__('Additional classes for dropdown menu. The base class `dropdown-menu` is always applied.', 'bbfse-plugin')}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
            </InspectorControls>

            <div {...blockProps}>
                {Array.isArray(navigationPosts) && navigationPosts.length === 0 ? (
                    <div className="nav-item">
                        <span className="nav-link">
                            {__('No Navigation posts found to preview.', 'bbfse-plugin')}
                        </span>
                    </div>
                ) : (
                    <Disabled>
                        <ServerSideRender
                            block={metadata.name}
                            attributes={attributes}
                        />
                    </Disabled>
                )}
            </div>
        </>
    );
}
