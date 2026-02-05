<?php
/**
 * Bootstrap navbar navigation walker.
 * 
 * @package bbfse-plug
 * @since 0.0.1
 * @license http://opensource.org/licenses/MIT MIT
 */


namespace BBFSEPlug\App\Libraries;


if (!class_exists('\\BBFSEPlug\\App\\Libraries\\BootstrapNavbarNavigationWalker')) {
    /**
     * Build Bootstrap navbar navigation HTML from Navigation blocks.
     * 
     * @since 0.0.1
     */
    class BootstrapNavbarNavigationWalker
    {

        /**
         * @var string Additional dropdown menu class name.
         */
        private string $dropdownClassName = '';


        /**
         * Convert attribute objects to HTML attributes string.
         * 
         * @since 0.0.1
         * @param array $attributes Key-value pairs.
         * @param string $prefix Attribute prefix.
         * @return string
         */
        public static function attributesToString(array $attributes, string $prefix): string
        {
            $output = '';
            if (!empty($attributes)) {
                foreach ($attributes as $key => $value) {
                    $key = sanitize_key($key);
                    if ('' === $key) {
                        continue;
                    }
                    $output .= ' ' . $prefix . $key . '="' . esc_attr($value) . '"';
                }
            }
            return $output;
        }// attributesToString


        /**
         * Build a single item from a navigation block.
         * 
         * @since 0.0.1
         * @param array $block Block array.
         * @param bool $hasChildren True if block is a submenu.
         * @return array
         */
        private static function buildItemFromBlock(array $block, bool $hasChildren = false): array
        {
            $attrs = ($block['attrs'] ?? []);
            $label = ($attrs['label'] ?? '');
            $url = ($attrs['url'] ?? '');
            $id = (isset($attrs['id']) && is_numeric($attrs['id']) ? (int) $attrs['id'] : 0);
            $kind = (isset($attrs['kind']) && is_string($attrs['kind']) ? $attrs['kind'] : '');
            $type = (isset($attrs['type']) && is_string($attrs['type']) ? $attrs['type'] : '');

            if ('' === trim($url) && !empty($attrs['id']) && is_numeric($attrs['id'])) {
                $resolvedUrl = get_permalink((int) $attrs['id']);
                if (is_string($resolvedUrl) && '' !== $resolvedUrl) {
                    $url = $resolvedUrl;
                }
                unset($resolvedUrl);
            }

            if ('' === trim($label) && !empty($attrs['id']) && is_numeric($attrs['id'])) {
                $resolvedLabel = get_the_title((int) $attrs['id']);
                if (is_string($resolvedLabel) && '' !== $resolvedLabel) {
                    $label = $resolvedLabel;
                }
                unset($resolvedLabel);
            }

            $item = [
                'label' => $label,
                'url' => $url,
                'title' => ($attrs['title'] ?? ''),
                'opensInNewTab' => (!empty($attrs['opensInNewTab'])),
                'rel' => ($attrs['rel'] ?? ''),
                'className' => ($attrs['className'] ?? ''),
                'id' => $id,
                'kind' => $kind,
                'type' => $type,
                'children' => [],
            ];

            if ($hasChildren) {
                $item['children'] = static::buildItemsFromBlocks($block['innerBlocks'] ?? []);
            }

            unset($attrs);
            return $item;
        }// buildItemFromBlock


        /**
         * Build item from core/home-link block.
         *
         * @since 0.0.1
         * @param array $block Block array.
         * @return array
         */
        private static function buildItemFromHomeLinkBlock(array $block): array
        {
            $attrs = ($block['attrs'] ?? []);
            $label = ($attrs['label'] ?? '');
            if ('' === trim($label)) {
                $label = __('Home', 'bbfse-plug');
            }

            $item = [
                'label' => $label,
                'url' => home_url('/'),
                'title' => ($attrs['title'] ?? ''),
                'opensInNewTab' => (!empty($attrs['opensInNewTab'])),
                'rel' => ($attrs['rel'] ?? ''),
                'className' => ($attrs['className'] ?? ''),
                'id' => 0,
                'kind' => 'custom',
                'type' => '',
                'children' => [],
            ];

            unset($attrs, $label);
            return $item;
        }// buildItemFromHomeLinkBlock


        /**
         * Build items from parsed block array.
         * 
         * @since 0.0.1
         * @param array $blocks Parsed blocks.
         * @param array $visitedRefs Reference for check visited.
         * @return array
         */
        public static function buildItemsFromBlocks(array $blocks, array $visitedRefs = []): array
        {
            $items = [];

            foreach ($blocks as $block) {
                $blockName = ($block['blockName'] ?? '');

                if ('core/navigation-link' === $blockName) {
                    $item = static::buildItemFromBlock($block);
                    if (!empty($item)) {
                        $items[] = $item;
                    }
                } elseif ('core/home-link' === $blockName) {
                    $item = static::buildItemFromHomeLinkBlock($block);
                    if (!empty($item)) {
                        $items[] = $item;
                    }
                } elseif ('core/navigation-submenu' === $blockName) {
                    $item = static::buildItemFromBlock($block, true);
                    if (!empty($item)) {
                        $items[] = $item;
                    }
                } elseif ('core/page-list' === $blockName) {
                    $pageItems = static::buildItemsFromPageListBlock($block);
                    if (!empty($pageItems)) {
                        $items = array_merge($items, $pageItems);
                    }
                } elseif ('core/navigation' === $blockName) {
                    if (!empty($block['innerBlocks'])) {
                        $items = array_merge($items, static::buildItemsFromBlocks($block['innerBlocks'], $visitedRefs));
                    }
                    $ref = (int) ($block['attrs']['ref'] ?? 0);
                    if ($ref > 0 && !in_array($ref, $visitedRefs, true)) {
                        $visitedRefs[] = $ref;
                        $refPost = get_post($ref);
                        if ($refPost && 'wp_navigation' === $refPost->post_type) {
                            $refBlocks = parse_blocks($refPost->post_content);
                            $items = array_merge($items, static::buildItemsFromBlocks($refBlocks, $visitedRefs));
                            unset($refBlocks);
                        }
                        unset($refPost);
                    }
                    unset($ref);
                } elseif (!empty($block['innerBlocks'])) {
                    $items = array_merge($items, static::buildItemsFromBlocks($block['innerBlocks'], $visitedRefs));
                }
                unset($blockName);
            }// endforeach;

            return $items;
        }// buildItemsFromBlocks


        /**
         * Build items from core/page-list block.
         * 
         * @since 0.0.1
         * @param array $block Block array.
         * @return array
         */
        private static function buildItemsFromPageListBlock(array $block): array
        {
            if (!function_exists('render_block')) {
                return [];
            }

            $html = render_block($block);
            if (!is_string($html) || '' === trim($html)) {
                return [];
            }

            $doc = new \DOMDocument();
            libxml_use_internal_errors(true);
            $doc->loadHTML('<div>' . $html . '</div>', LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
            libxml_clear_errors();

            $container = $doc->getElementsByTagName('div')->item(0);
            if (!$container) {
                return [];
            }

            $items = [];
            foreach ($container->childNodes as $child) {
                if ($child instanceof \DOMElement && 'ul' === strtolower($child->tagName)) {
                    $items = array_merge($items, static::parseListElement($child));
                }
            }

            return $items;
        }// buildItemsFromPageListBlock


        /**
         * Flatten descendants into a single second level list.
         * 
         * @since 0.0.1
         * @param array $children Children list.
         * @return array
         */
        private static function flattenChildren(array $children): array
        {
            $levelTwo = [];

            $walker = function (array $nodes) use (&$levelTwo, &$walker) {
                foreach ($nodes as $node) {
                    $nodeChildren = ($node['children'] ?? []);
                    $node['children'] = [];
                    $levelTwo[] = $node;
                    if (!empty($nodeChildren)) {
                        $walker($nodeChildren);
                    }
                }// endforeach;
            };

            $walker($children);

            return $levelTwo;
        }// flattenChildren


        /**
         * Flatten items to two levels maximum.
         * 
         * @since 0.0.1
         * @param array $items Items list.
         * @return array
         */
        public static function flattenToTwoLevels(array $items): array
        {
            $result = [];

            foreach ($items as $item) {
                $children = ($item['children'] ?? []);
                $item['children'] = static::flattenChildren($children);
                $result[] = $item;
            }// endforeach;

            return $result;
        }// flattenToTwoLevels


        /**
         * Get current request URL.
         *
         * @since 0.0.1
         * @return string
         */
        private static function getCurrentUrl(): string
        {
            $scheme = (is_ssl() ? 'https' : 'http');
            $host = (isset($_SERVER['HTTP_HOST']) ? sanitize_text_field(wp_unslash($_SERVER['HTTP_HOST'])) : wp_parse_url(home_url(), PHP_URL_HOST));
            $requestUri = (isset($_SERVER['REQUEST_URI']) ? sanitize_text_field(wp_unslash($_SERVER['REQUEST_URI'])) : '/');

            if (!is_string($host) || '' === $host) {
                return '';
            }

            return $scheme . '://' . $host . $requestUri;
        }// getCurrentUrl


        /**
         * Determine if item is active.
         *
         * @since 0.0.1
         * @param array $item Item data.
         * @return bool
         */
        private static function isItemActive(array $item): bool
        {
            $id = (isset($item['id']) ? (int) $item['id'] : 0);
            $kind = (isset($item['kind']) && is_string($item['kind']) ? $item['kind'] : '');
            $type = (isset($item['type']) && is_string($item['type']) ? $item['type'] : '');

            if ($id > 0 && 'post-type' === $kind) {
                if (is_singular() && get_queried_object_id() === $id) {
                    return true;
                }
                if (is_front_page() && (int) get_option('page_on_front') === $id) {
                    return true;
                }
                if (is_home() && !is_front_page() && (int) get_option('page_for_posts') === $id) {
                    return true;
                }
            }

            if ($id > 0 && 'taxonomy' === $kind && '' !== $type) {
                if (is_tax($type, $id) || is_category($id) || is_tag($id)) {
                    return true;
                }
            }

            $url = (isset($item['url']) && is_string($item['url']) ? $item['url'] : '');
            if ('' !== $url && static::isUrlCurrent($url)) {
                return true;
            }

            return false;
        }// isItemActive


        /**
         * Check if URL matches current request URL.
         *
         * @since 0.0.1
         * @param string $url URL to check.
         * @return bool
         */
        private static function isUrlCurrent(string $url): bool
        {
            $currentUrl = static::getCurrentUrl();
            if ('' === $currentUrl) {
                return false;
            }

            $currentParts = wp_parse_url($currentUrl);
            $targetParts = wp_parse_url($url);
            if (false === $targetParts || false === $currentParts) {
                return false;
            }

            $currentPath = static::normalizePath($currentParts['path'] ?? '/');
            $targetPath = static::normalizePath($targetParts['path'] ?? '/');

            if (empty($targetParts['host'])) {
                return ('' !== $targetPath && $targetPath === $currentPath);
            }

            $currentHost = ($currentParts['host'] ?? '');
            $targetHost = ($targetParts['host'] ?? '');
            if ('' !== $currentHost && '' !== $targetHost && strcasecmp($currentHost, $targetHost) !== 0) {
                return false;
            }

            return ('' !== $targetPath && $targetPath === $currentPath);
        }// isUrlCurrent


        /**
         * Mark active state on items and parents.
         *
         * @since 0.0.1
         * @param array $items Items list.
         * @return array
         */
        public static function markActive(array $items): array
        {
            foreach ($items as &$item) {
                $children = ($item['children'] ?? []);
                $children = static::markActive($children);
                $item['children'] = $children;

                $isActive = static::isItemActive($item);
                $hasActiveChild = false;

                foreach ($children as $child) {
                    if (!empty($child['isActive'])) {
                        $hasActiveChild = true;
                        break;
                    }
                }

                $item['isActive'] = ($isActive || $hasActiveChild);
            }
            unset($item);

            return $items;
        }// markActive


        /**
         * Normalize URL path for comparison.
         *
         * @since 0.0.1
         * @param string $path URL path.
         * @return string
         */
        private static function normalizePath(string $path): string
        {
            $path = trim($path);
            if ('' === $path) {
                return '';
            }
            return untrailingslashit($path);
        }// normalizePath


        /**
         * Parse a UL element into items.
         * 
         * @since 0.0.1
         * @param \DOMElement $ul UL element.
         * @return array
         */
        private static function parseListElement(\DOMElement $ul): array
        {
            $items = [];
            foreach ($ul->childNodes as $child) {
                if ($child instanceof \DOMElement && 'li' === strtolower($child->tagName)) {
                    $item = static::parseListItem($child);
                    if (!empty($item)) {
                        $items[] = $item;
                    }
                }
            }
            return $items;
        }// parseListElement


        /**
         * Parse a LI element into an item.
         * 
         * @since 0.0.1
         * @param \DOMElement $li LI element.
         * @return array
         */
        private static function parseListItem(\DOMElement $li): array
        {
            $label = '';
            $url = '';
            $className = '';
            $children = [];

            $links = $li->getElementsByTagName('a');
            if ($links->length > 0) {
                $link = $links->item(0);
                $label = trim($link->textContent);
                $url = $link->getAttribute('href');
                $className = $link->getAttribute('class');
            } else {
                $label = trim($li->textContent);
            }

            foreach ($li->childNodes as $child) {
                if ($child instanceof \DOMElement && 'ul' === strtolower($child->tagName)) {
                    $children = static::parseListElement($child);
                    break;
                }
            }

            return [
                'label' => $label,
                'url' => $url,
                'title' => '',
                'opensInNewTab' => false,
                'rel' => '',
                'className' => $className,
                'id' => 0,
                'kind' => '',
                'type' => '',
                'children' => $children,
            ];
        }// parseListItem


        /**
         * Build HTML for navigation items.
         * 
         * @since 0.0.1
         * @param array $items Items list.
         * @param int $depth Current depth.
         * @return string
         */
        public function render(array $items, int $depth = 0): string
        {
            $output = '';

            foreach ($items as $item) {
                $label = (isset($item['label']) && '' !== trim($item['label']) ? $item['label'] : __('(Untitled)', 'bbfse-plug'));
                $label = wp_kses_post($label);

                $url = (isset($item['url']) && '' !== trim($item['url']) ? $item['url'] : '#');
                $href = esc_url($url);

                $title = (isset($item['title']) && '' !== trim($item['title']) ? $item['title'] : '');
                $titleAttr = (!empty($title) ? ' title="' . esc_attr($title) . '"' : '');

                $opensInNewTab = (!empty($item['opensInNewTab']));
                $targetAttr = ($opensInNewTab ? ' target="_blank"' : '');

                $rel = (isset($item['rel']) && is_string($item['rel']) ? trim($item['rel']) : '');
                if ($opensInNewTab && !empty($rel)) {
                    if (false === strpos($rel, 'noopener')) {
                        $rel = trim($rel . ' noopener');
                    }
                    if (false === strpos($rel, 'noreferrer')) {
                        $rel = trim($rel . ' noreferrer');
                    }
                } elseif ($opensInNewTab && empty($rel)) {
                    $rel = 'noopener noreferrer';
                }
                $relAttr = (!empty($rel) ? ' rel="' . esc_attr($rel) . '"' : '');

                $itemClassName = (isset($item['className']) && is_string($item['className']) ? trim($item['className']) : '');

                if (0 === $depth) {
                    $hasChildren = (!empty($item['children']));
                    $liClass = 'nav-item' . ($hasChildren ? ' dropdown' : '');
                    $linkClass = 'nav-link' . ($hasChildren ? ' dropdown-toggle' : '');
                    if (!empty($item['isActive'])) {
                        $linkClass .= ' active';
                    }
                    if (!empty($itemClassName)) {
                        $linkClass .= ' ' . $itemClassName;
                    }
                    $toggleAttributes = ($hasChildren ? ' data-bs-toggle="dropdown" role="button" aria-expanded="false"' : '');

                    $output .= '<li class="' . esc_attr($liClass) . '">';
                    $output .= '<a class="' . esc_attr($linkClass) . '" href="' . $href . '"' . $titleAttr . $targetAttr . $relAttr . $toggleAttributes . '>';
                    $output .= $label;
                    $output .= '</a>';

                    if ($hasChildren) {
                        $dropdownMenuClass = 'dropdown-menu';
                        if ('' !== $this->dropdownClassName) {
                            $dropdownMenuClass .= ' ' . $this->dropdownClassName;
                        }
                        $output .= '<ul class="' . esc_attr($dropdownMenuClass) . '">' . PHP_EOL;
                        $output .= $this->render($item['children'], $depth + 1);
                        $output .= '</ul>' . PHP_EOL;
                    }

                    $output .= '</li>' . PHP_EOL;
                } else {
                    $linkClass = 'dropdown-item';
                    if (!empty($item['isActive'])) {
                        $linkClass .= ' active';
                    }
                    if (!empty($itemClassName)) {
                        $linkClass .= ' ' . $itemClassName;
                    }

                    if (!empty($itemClassName) && preg_match('/(?<![\w\-%\^\$])(dropdown-divider)(?![\w\-%\^\$])/i', $itemClassName)) {
                        $dividerClass = preg_replace('/(?<![\w\-%\^\$])(dropdown-divider)(?![\w\-%\^\$])/i', '', $itemClassName);
                        $dividerClass = preg_replace('/\s{2,}/', ' ', $dividerClass);
                        $dividerClass = trim($dividerClass);
                        $dividerClass = 'dropdown-divider' . (!empty($dividerClass) ? ' ' . $dividerClass : '');
                        $output .= '<li><hr class="' . esc_attr($dividerClass) . '"></li>' . PHP_EOL;
                    } elseif (!empty($itemClassName) && preg_match('/(?<![\w\-%\^\$])(dropdown-header)(?![\w\-%\^\$])/i', $itemClassName)) {
                        $headerClass = preg_replace('/(?<![\w\-%\^\$])(dropdown-header)(?![\w\-%\^\$])/i', '', $itemClassName);
                        $headerClass = preg_replace('/\s{2,}/', ' ', $headerClass);
                        $headerClass = trim($headerClass);
                        $headerClass = 'dropdown-header' . (!empty($headerClass) ? ' ' . $headerClass : '');
                        $output .= '<li><h6 class="' . esc_attr($headerClass) . '">' . $label . '</h6></li>' . PHP_EOL;
                    } else {
                        $output .= '<li>';
                        $output .= '<a class="' . esc_attr($linkClass) . '" href="' . $href . '"' . $titleAttr . $targetAttr . $relAttr . '>';
                        $output .= $label;
                        $output .= '</a>';
                        $output .= '</li>' . PHP_EOL;
                    }
                }
            }// endforeach;

            return $output;
        }// render


        /**
         * Set additional dropdown menu class name.
         *
         * @since 0.0.1
         * @param string $className Class name.
         * @return void
         */
        public function setDropdownClassName(string $className): void
        {
            $className = trim($className);
            if ('' !== $className) {
                $className = preg_replace('/(?<![\w-])(dropdown-menu)(?![\w-])/i', '', $className);
                $className = preg_replace('/\s{2,}/', ' ', $className);
                $className = trim($className);
            }
            $this->dropdownClassName = $className;
        }// setDropdownClassName


    }// BootstrapNavbarNavigationWalker
}
