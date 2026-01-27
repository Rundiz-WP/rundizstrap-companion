<?php
/**
 * Render contents for Bootstrap pagination block.
 * 
 * @package bbfse-plugin
 * @since 0.0.1
 * 
 * @link https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/query-pagination-previous/index.php Source code has been copied from here.
 * @link https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/query-pagination-numbers/index.php Source code has been copied from here.
 */


/* @var $attributes array Block attributes. */
/* @var $content string Block default content. */
/* @var $block \WP_Block Block instance. */


if (!function_exists('bbfse_plugin_block_bsPagination_generateOutputHTML')) {
    /**
     * Generate output HTML string.
     * 
     * @since 0.0.1
     * @param array $attributes Block attributes.
     * @param string $content Block default content.
     * @param \WP_Block $block Block instance.
     * @param array $pageResult Rendered array of each page result.
     * @return string
     */
    function bbfse_plugin_block_bsPagination_generateOutputHTML(array $attributes, string $content, \WP_Block $block, array $pageResult): string
    {
        // retrieve setting from block instance.
        $enhanced_pagination = isset($block->context['enhancedPagination']) && $block->context['enhancedPagination'];

        // build pagination classes.
        $alignment = (isset($attributes['alignment']) && is_string($attributes['alignment']) ? trim($attributes['alignment']) : '');
        $additionalClass = (isset($attributes['additionalClass']) && is_string($attributes['additionalClass']) ? trim($attributes['additionalClass']) : '');
        $paginationClasses = 'pagination';
        if (!empty($alignment)) {
            $paginationClasses .= ' ' . esc_attr($alignment);
        }
        if (!empty($additionalClass)) {
            $additionalClass = preg_replace('/(?<![\w-])(pagination)(?![\w-])/i', '', $additionalClass);// remove class name 'pagination' (with word boundary, including dash) from classes.
            $additionalClass = preg_replace('/\s{2,}/', ' ', $additionalClass);// replace more spaces to be one.
            $additionalClass = trim($additionalClass);// trim again
            $paginationClasses .= ' ' . esc_attr($additionalClass);
        }
        unset($additionalClass, $alignment);

        // start output string.
        $output = '<ul class="' . $paginationClasses . '">';
        unset($paginationClasses);

        foreach ($pageResult as $index => $eachLink) {
            $liAdditionalClasses = '';
            $HTMLProcessor = new \WP_HTML_Tag_Processor($eachLink);
            while($HTMLProcessor->next_tag()) {
                if ($HTMLProcessor->has_class('current')) {
                    $liAdditionalClasses .= ' active';
                }
                if ($HTMLProcessor->has_class('dots') || $HTMLProcessor->has_class('disabled')) {
                    $liAdditionalClasses .= ' disabled';
                }
                if ($enhanced_pagination) {
                    if (null === $HTMLProcessor->get_attribute('data-wp-key')) {
                        $HTMLProcessor->set_attribute('data-wp-key', 'index-' . $index);
                    }
                    if ('A' === $HTMLProcessor->get_tag()) {
                        $HTMLProcessor->set_attribute('data-wp-on--click', 'core/query::actions.navigate');
                    }
                }
            }// endwhile;
            $eachLink = $HTMLProcessor->get_updated_html();
            $output .= '<li class="page-item' . $liAdditionalClasses;
            $output .= '">';// finish `<li>` tag.
            $output .= $eachLink;
            $output .= '</li>';
            unset($HTMLProcessor, $liAdditionalClasses);
        }// endforeach;
        unset($eachLink, $index);

        $output .= '</ul>';

        return $output;
    }// bbfse_plugin_block_bsPagination_generateOutputHTML
}// endif;


if (!function_exists('bbfse_plugin_block_bsPagination_renderPageNext')) {
    /**
     * Render pagination next page.
     * 
     * @since 0.0.1
     * @param array $attributes Block attributes.
     * @param string $content Block default content.
     * @param \WP_Block $block Block instance.
     * @return array
     */
    function bbfse_plugin_block_bsPagination_renderPageNext(array $attributes, string $content, \WP_Block $block): array
    {
        $page_key = (isset($block->context['queryId']) ? 'query-' . $block->context['queryId'] . '-page' : 'query-page');
        $enhanced_pagination = isset($block->context['enhancedPagination']) && $block->context['enhancedPagination'];
        $max_page = (isset($block->context['query']['pages']) ? (int) $block->context['query']['pages'] : 0);
        $page = (empty($_GET[$page_key]) ? 1 : (int) $_GET[$page_key]);
        $wrapper_attributes = 'class="wp-block-bbfse-plugin-blocks-bs-pagination page-link"';
        $default_label = __('Next »', 'bbfse-plugin');
        $label_text = (isset($attributes['nextText']) && !empty($attributes['nextText']) ? wp_kses_post($attributes['nextText']) : $default_label);
        $label = $label_text;
        $wrapper_attributes .= ' aria-label="' . __('Next', 'bbfse-plugin') . '"';

        /* @var $wp_query \WP_Query */
        global $wp_query;
        $total = (!$max_page || $max_page > $wp_query->max_num_pages ? $wp_query->max_num_pages : $max_page);
        if ($total <= 1) {
            unset($default_label, $enhanced_pagination, $label, $label_text, $max_page, $page, $page_key, $total, $wrapper_attributes);
            return [];
        }

        $content = '';
        // Check if the pagination is for Query that inherits the global context
        // and handle appropriately.
        if (isset($block->context['query']['inherit']) && $block->context['query']['inherit']) {
            $filter_link_attributes = static function () use ($wrapper_attributes) {
                return $wrapper_attributes;
            };

            add_filter('next_posts_link_attributes', $filter_link_attributes);
            // Take into account if we have set a bigger `max page`
            // than what the query has.
            if ($max_page > $wp_query->max_num_pages) {
                $max_page = $wp_query->max_num_pages;
            }
            $content = get_next_posts_link($label, $max_page);
            remove_filter('next_posts_link_attributes', $filter_link_attributes);
            if ('' === $content || !is_scalar($content)) {
                $content = sprintf(
                    '<a class="wp-block-bbfse-plugin-blocks-bs-pagination page-link disabled" %1$s>%2$s</a>',
                    $wrapper_attributes,
                    $label
                );
            }
        } else {
            $block_query = new \WP_Query(build_query_vars_from_query_block($block, $page));
            $block_max_pages = $block_query->max_num_pages;

            if ($block_query && $block_max_pages !== $page) {
                $content = sprintf(
                    '<a class="wp-block-bbfse-plugin-blocks-bs-pagination page-link" href="%1$s" %2$s>%3$s</a>',
                    esc_url(add_query_arg($page_key, $page + 1)),
                    $wrapper_attributes,
                    $label
                );
            } else {
                $content = sprintf(
                    '<a class="wp-block-bbfse-plugin-blocks-bs-pagination page-link disabled" %1$s>%2$s</a>',
                    $wrapper_attributes,
                    $label
                );
            }
            wp_reset_postdata();
        }// endif;

        if ($enhanced_pagination && isset($content)) {
            $p = new \WP_HTML_Tag_Processor($content);
            if ($p->next_tag(
                [
                    'tag_name' => 'a',
                    'class_name' => 'wp-block-bbfse-plugin-blocks-bs-pagination',
                ]
            )) {
                $p->set_attribute('data-wp-key', 'query-pagination-next');
                $p->set_attribute('data-wp-on--click', 'core/query::actions.navigate');
                $p->set_attribute('data-wp-on--mouseenter', 'core/query::actions.prefetch');
                $p->set_attribute('data-wp-watch', 'core/query::callbacks.prefetch');
                $content = $p->get_updated_html();
            }
        }

        return [$content];
    }// bbfse_plugin_block_bsPagination_renderPageNext
}// endif;


if (!function_exists('bbfse_plugin_block_bsPagination_renderPageNumbers')) {
    /**
     * Render pagination numbers.
     * 
     * @since 0.0.1
     * @param array $attributes Block attributes.
     * @param string $content Block default content.
     * @param \WP_Block $block Block instance.
     * @return array
     */
    function bbfse_plugin_block_bsPagination_renderPageNumbers(array $attributes, string $content, \WP_Block $block): array
    {
        // setting pagination query values (not settings from admin page). ------------------------------------
        $page_key = (isset($block->context['queryId']) ? 'query-' . $block->context['queryId'] . '-page' : 'query-page');
        $page = (empty($_GET[$page_key]) ? 1 : (int) $_GET[$page_key]);
        $max_page = (isset($block->context['query']['pages']) ? (int) $block->context['query']['pages'] : 0);

        /* @var $wp_query \WP_Query */
        global $wp_query;
        $current = intval(max(1, $page));
        $total = (!$max_page || $max_page > $wp_query->max_num_pages ? $wp_query->max_num_pages : $max_page);
        $paginate_args = [
            'prev_next' => false,
            'type' => 'array',
            'mid_size' => (isset($attributes['numberOfPages']) && is_numeric($attributes['numberOfPages']) ? $attributes['numberOfPages'] : 2),
        ];

        if (!isset($block->context['query']['inherit']) || !$block->context['query']['inherit']) {
            $block_query = new \WP_Query(build_query_vars_from_query_block($block, $page));
            // Temporarily switch `$wp_query` with our custom query.
            $prev_wp_query = $wp_query;
            $wp_query = $block_query;
            $total = (!$max_page || $max_page > $wp_query->max_num_pages ? $wp_query->max_num_pages : $max_page);
            $paginate_args['base'] = '%_%';
            $paginate_args['format'] = "?$page_key=%#%";
            $paginate_args['current'] = max(1, $page);
            if (1 !== $page) {
                $paginate_args['add_args'] = ['cst' => ''];
            }
            // We still need to preserve `paged` query param if exists, as is used
            // for Queries that inherit from global context.
            $paged = empty( $_GET['paged'] ) ? null : (int) $_GET['paged'];
            if ($paged) {
                $paginate_args['add_args'] = ['paged' => $paged];
            }
            wp_reset_postdata(); // Restore original Post Data.
            $wp_query = $prev_wp_query;
            unset($block_query, $paged, $prev_wp_query);
        }

        if ($total <= 1) {
            unset($max_page, $page, $page_key);
            unset($current, $paginate_args, $total);
            return [];
        }

        $paginate_args['total'] = $total;
        // end setting pagination query values (not settings from admin page). --------------------------------

        return BBFSEPlugin\App\Libraries\WPOverride\GeneralTemplate::paginate_links($paginate_args);
    }// bbfse_plugin_block_bsPagination_render_pageNumbers
}// endif;


if (!function_exists('bbfse_plugin_block_bsPagination_renderPagePrevious')) {
    /**
     * Render pagination previous page.
     * 
     * @since 0.0.1
     * @param array $attributes Block attributes.
     * @param string $content Block default content.
     * @param \WP_Block $block Block instance.
     * @return array
     */
    function bbfse_plugin_block_bsPagination_renderPagePrevious(array $attributes, string $content, \WP_Block $block): array
    {
        $page_key = (isset($block->context['queryId']) ? 'query-' . $block->context['queryId'] . '-page' : 'query-page');
        $enhanced_pagination = isset($block->context['enhancedPagination']) && $block->context['enhancedPagination'];
        $max_page = (isset($block->context['query']['pages']) ? (int) $block->context['query']['pages'] : 0);
        $page = (empty($_GET[$page_key]) ? 1 : (int) $_GET[$page_key]);
        $wrapper_attributes = 'class="wp-block-bbfse-plugin-blocks-bs-pagination  page-link"';
        $default_label = __('« Previous', 'bbfse-plugin');
        $label_text = (isset($attributes['previousText']) && !empty($attributes['previousText']) ? wp_kses_post($attributes['previousText']) : $default_label);
        $label = $label_text;
        $wrapper_attributes .= ' aria-label="' . __('Previous', 'bbfse-plugin') . '"';

        /* @var $wp_query \WP_Query */
        global $wp_query;
        $total = (!$max_page || $max_page > $wp_query->max_num_pages ? $wp_query->max_num_pages : $max_page);
        if ($total <= 1) {
            unset($default_label, $enhanced_pagination, $label, $label_text, $max_page, $page, $page_key, $total, $wrapper_attributes);
            return [];
        }

        $content = '';
        // Check if the pagination is for Query that inherits the global context
        // and handle appropriately.
        if (isset($block->context['query']['inherit']) && $block->context['query']['inherit']) {
            $filter_link_attributes = static function () use ($wrapper_attributes) {
                return $wrapper_attributes;
            };

            add_filter('previous_posts_link_attributes', $filter_link_attributes);
            $content = get_previous_posts_link($label);
            remove_filter('previous_posts_link_attributes', $filter_link_attributes);
            if ('' === $content || !is_scalar($content)) {
                $content = sprintf(
                    '<a class="wp-block-bbfse-plugin-blocks-bs-pagination page-link disabled" %1$s>%2$s</a>',
                    $wrapper_attributes,
                    $label
                );
            }
        } else {
            $block_query = new \WP_Query(build_query_vars_from_query_block($block, $page));
            $block_max_pages = $block_query->max_num_pages;
            $total = (!$max_page || $max_page > $block_max_pages ? $block_max_pages : $max_page);
            wp_reset_postdata();

            if (1 < $page && $page <= $total) {
                $content = sprintf(
                    '<a class="wp-block-bbfse-plugin-blocks-bs-pagination page-link" href="%1$s" %2$s>%3$s</a>',
                    esc_url(add_query_arg($page_key, $page - 1)),
                    $wrapper_attributes,
                    $label
                );
            } else {
                $content = sprintf(
                    '<a class="wp-block-bbfse-plugin-blocks-bs-pagination page-link disabled" %1$s>%2$s</a>',
                    $wrapper_attributes,
                    $label
                );
            }
        }// endif;

        if ($enhanced_pagination && isset($content)) {
            $p = new \WP_HTML_Tag_Processor($content);
            if ($p->next_tag(
                [
                    'tag_name' => 'a',
                    'class_name' => 'wp-block-bbfse-plugin-blocks-bs-pagination',
                ]
            )) {
                $p->set_attribute('data-wp-key', 'query-pagination-previous');
                $p->set_attribute('data-wp-on--click', 'core/query::actions.navigate');
                $p->set_attribute('data-wp-on--mouseenter', 'core/query::actions.prefetch');
                $p->set_attribute('data-wp-watch', 'core/query::callbacks.prefetch');
                $content = $p->get_updated_html();
            }
        }

        return [$content];
    }// bbfse_plugin_block_bsPagination_renderPagePrevious
}// endif;


// call to create pagination result in array format. -------------------------------------------------------------
$showPreviousNext = (isset($attributes['showPreviousNext']) && is_bool($attributes['showPreviousNext']) ? $attributes['showPreviousNext'] : true);
$pageResult = [];
if (true === $showPreviousNext) {
    $pageResult = array_merge(
        $pageResult, 
        bbfse_plugin_block_bsPagination_renderPagePrevious(($attributes ?? []), ($content ?? ''), ($block ?? new \WP_Block))
    );
}// endif; $showPreviousNext previous page.

if (isset($attributes['showPageNumbers']) && true === $attributes['showPageNumbers']) {
    $pageResult = array_merge(
        $pageResult, 
        bbfse_plugin_block_bsPagination_renderPageNumbers(($attributes ?? []), ($content ?? ''), ($block ?? new \WP_Block))
    );
}// endif; $showPageNumbers

if (true === $showPreviousNext) {
    $pageResult = array_merge(
        $pageResult, 
        bbfse_plugin_block_bsPagination_renderPageNext(($attributes ?? []), ($content ?? ''), ($block ?? new \WP_Block))
    );
}// endif; $showPreviousNext next page.
unset($showPreviousNext);
// end call to create pagination result in array format. --------------------------------------------------------

if (empty($pageResult)) {
    // if page result is empty.
    // do nothing here.
    unset($pageResult);
    return;
} else {
    // if page result is not empty.
    // starting to build pagination HTML.
    $output = bbfse_plugin_block_bsPagination_generateOutputHTML(($attributes ?? []), ($content ?? ''), ($block ?? new \WP_Block), $pageResult);
    unset($pageResult);

    // get wrapper attributes.
    $wrapper_attributes = get_block_wrapper_attributes();

    printf(
        '<nav %1$s aria-label="' . esc_attr__('Pagination', 'bbfse-plugin') . '">%2$s</nav>',
        $wrapper_attributes,
        $output
    );
    unset($output, $wrapper_attributes);
}
