<?php
/**
 * Render contents for Bootstrap comment form block.
 * 
 * @package rundizstrap-companion
 * @since 0.0.1
 * 
 * phpcs:disable Squiz.Commenting.BlockComment.NoNewLine
 * phpcs:disable WordPress.NamingConventions.ValidFunctionName.FunctionNameInvalid
 */


if (!defined('ABSPATH')) {
    exit();
}


if (!function_exists('bbfse_plug_block_bsCommentForm_render')) {
    /**
     * Render contents for Bootstrap comment form block.
     *
     * @since 0.0.1
     * @param array  $attributes Block attributes.
     * @param string $content Block default content.
     * @param mixed  $block Block instance.
     * @return string
     */
    function bbfse_plug_block_bsCommentForm_render(array $attributes, string $content = '', $block = null): string
    {
        if (!isset($block->context['postId'])) {
            return '';
        }

        $postId = (int) $block->context['postId'];
        if ($postId <= 0) {
            return '';
        }

        if (post_password_required($postId)) {
            return '';
        }

        $buttonClassName = 'btn btn-primary';
        if (isset($attributes['buttonClassName']) && is_string($attributes['buttonClassName'])) {
            $buttonClassName = trim(preg_replace('/[^A-Za-z0-9_\-\s]/', '', $attributes['buttonClassName']));
            if ('' === $buttonClassName) {
                $buttonClassName = 'btn btn-primary';
            }
        }

        $classes = ['comment-respond'];
        $wrapperAttributes = get_block_wrapper_attributes(['class' => implode(' ', $classes)]);
        unset($classes);

        $commenter = wp_get_current_commenter();
        $requireNameEmail = get_option('require_name_email');
        $ariaRequired = ($requireNameEmail ? ' aria-required="true" required' : '');

        $fields = [
            'author' => '<div class="mb-3 comment-form-author">'
                . '<label class="form-label" for="author">' . esc_html__('Name', 'rundizstrap-companion') . ($requireNameEmail ? ' <span class="required">*</span>' : '') . '</label>'
                . '<input id="author" class="form-control" type="text" name="author" value="' . esc_attr($commenter['comment_author']) . '" size="30"' . $ariaRequired . ' />'
                . '</div>',
            'email' => '<div class="mb-3 comment-form-email">'
                . '<label class="form-label" for="email">' . esc_html__('Email', 'rundizstrap-companion') . ($requireNameEmail ? ' <span class="required">*</span>' : '') . '</label>'
                . '<input id="email" class="form-control" type="email" name="email" value="' . esc_attr($commenter['comment_author_email']) . '" size="30"' . $ariaRequired . ' />'
                . '</div>',
            'url' => '<div class="mb-3 comment-form-url">'
                . '<label class="form-label" for="url">' . esc_html__('Website', 'rundizstrap-companion') . '</label>'
                . '<input id="url" class="form-control" type="url" name="url" value="' . esc_attr($commenter['comment_author_url']) . '" size="30" />'
                . '</div>',
        ];
        unset($ariaRequired, $requireNameEmail);

        if (has_action('set_comment_cookies', 'wp_set_comment_cookies') && get_option('show_comments_cookies_opt_in')) {
            $consent = (!empty($commenter['comment_author_email']) ? ' checked="checked"' : '');
            $fields['cookies'] = '<div class="mb-3 comment-form-cookies-consent form-check">'
                . '<input id="wp-comment-cookies-consent" class="form-check-input" type="checkbox" name="wp-comment-cookies-consent" value="yes"' . $consent . ' />'
                . '<label class="form-check-label" for="wp-comment-cookies-consent">' . esc_html__('Save my name, email, and website in this browser for the next time I comment.', 'rundizstrap-companion') . '</label>'
                . '</div>';
            unset($consent);
        }
        unset($commenter);

        $commentFormArgs = [
            'class_submit' => $buttonClassName,
            'fields' => $fields,
            'comment_field' => '<div class="mb-3 comment-form-comment">'
                . '<label class="form-label" for="comment">' . esc_html__('Comment', 'rundizstrap-companion') . '</label>'
                . '<textarea id="comment" class="form-control" name="comment" cols="45" rows="8" aria-required="true" required></textarea>'
                . '</div>',
            'comment_notes_before' => sprintf(
                '<div class="form-text text-body-secondary mb-3">%s%s</div>',
                sprintf(
                    '<span id="email-notes">%s</span>',
                    esc_html__('Your email address will not be published.', 'rundizstrap-companion')
                ),
                ' ' . wp_required_field_message()
            ),
            'comment_notes_after' => '',
            'submit_field' => '<div class="mb-3">%1$s %2$s</div>',
        ];
        unset($buttonClassName, $fields);

        ob_start();
        comment_form($commentFormArgs, $postId);
        $form = ob_get_clean();
        unset($commentFormArgs, $postId);

        // Keep core behavior: apply wrapper block classes to the root `#respond`.
        $form = str_replace('class="comment-respond"', $wrapperAttributes, $form);
        unset($wrapperAttributes);

        wp_enqueue_script('comment-reply');

        return $form;
    }// bbfse_plug_block_bsCommentForm_render
}

// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
echo bbfse_plug_block_bsCommentForm_render(
    ($attributes ?? []),
    ((isset($content) && is_string($content)) ? $content : ''),
    ($block ?? null)
);
