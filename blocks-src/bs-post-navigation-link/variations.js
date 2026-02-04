/**
 * Bootstrap post navigation link block variations.
 * 
 * @package bbfse-plugin
 * @since 0.0.1
 */


import { __ } from '@wordpress/i18n';

import { nextIcon, previousIcon } from './icons.js';


const variations = [
    {
        name: 'post-previous',
        title: __('Bootstrap Previous Post', 'bbfse-plugin'),
        description: __('Displays the post link that precedes the current post in Bootstrap style.', 'bbfse-plugin'),
        icon: previousIcon,
        attributes: { 
            type: 'previous',
            className: 'btn btn-secondary',
        },
        scope: ['inserter', 'transform'],
        example: {
            attributes: {
                className: 'btn btn-secondary',
                type: 'previous',
                label: __('Previous post', 'bbfse-plugin'),
            }
        },
    },
    {
        isDefault: true,
        name: 'post-next',
        title: __('Bootstrap Next Post', 'bbfse-plugin'),
        description: __('Displays the post link that follows the current post in Bootstrap style.', 'bbfse-plugin'),
        icon: nextIcon,
        attributes: { 
            type: 'next',
            className: 'btn btn-secondary',
        },
        scope: ['inserter', 'transform'],
        example: {
            attributes: {
                className: 'btn btn-secondary',
                type: 'next',
                label: __('Next post', 'bbfse-plugin'),
            }
        },
    },
];

variations.forEach((variation) => {
    variation.isActive = (blockAttributes, variationAttributes) => blockAttributes.type === variationAttributes.type;
});

export default variations;
