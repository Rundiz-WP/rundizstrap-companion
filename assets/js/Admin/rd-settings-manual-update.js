/**
 * Manual update js.
 * 
 * @package rundizstrap-companion
 */


/**
 * Ajax manual update step by step.
 * 
 * @returns {undefined}
 */
function rundizstrap_companion_manualUpdateAjax()
{
    const formresultPlaceholder = document.querySelector('.form-result-placeholder');
    const actionButtons = document.querySelector('.manual-update-action-button');
    const actionPlaceholders = document.querySelector('.manual-update-action-placeholder');

    // clear any placeholders and disable button.
    if (formresultPlaceholder) {
        formresultPlaceholder.innerHTML = '';
    }

    if (actionButtons) {
        actionButtons.disabled = true;
    }

    if (actionPlaceholders) {
        actionPlaceholders.innerHTML = '<i class="bi bi-hourglass"></i>';
    }
    // end clear any placeholders and disable button.

    if (RundizStrap_companion_settingsManualUpdateObj.completed === 'true') {
        // if manual update process is all completed.
        if (actionButtons) {
            actionButtons.disabled = true;
        }

        if (actionPlaceholders) {
            actionPlaceholders.innerHTML = '';
        }

        return;
    }// endif; manual update process is all completed.

    let runUpdateKey;
    if (RundizStrap_companion_settingsManualUpdateObj.alreadyRunUpdateKey === '') {
        runUpdateKey = 0;
    } else {
        runUpdateKey = (parseInt(RundizStrap_companion_settingsManualUpdateObj.alreadyRunUpdateKey) + 1);
    }

    // prepare to make AJAX call. ========================================================
    const formData = new URLSearchParams();
    formData.append('security', RundizStrap_companion_settingsManualUpdateObj.nonce);
    formData.append('action', 'rundizstrap_companion_manualUpdate');
    formData.append('updateKey', runUpdateKey);

    fetch(ajaxurl, {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        'body': formData.toString(),
    })
    .then(async (rawResponse) => {
        const contentType = rawResponse.headers.get('Content-Type');
        let response = null;
        if (contentType.toLowerCase().includes('application/json')) {
            response = await rawResponse.json();
        } else if (contentType.toLowerCase().includes('text/html')) {
            response = await rawResponse.text();
        }

        // check and handle HTTP response error. -------------------
        RundizstrapCompanionAdminCommon.static_ajaxHandleResponseError(response, rawResponse);
        // end check and handle HTTP response error. ---------------

        if (!rawResponse.ok) {
            return Promise.reject(response);
        }

        return response;
    })
    .then((response) => {
        if (typeof(response) === 'undefined') {
            response = {};
        }

        if (typeof(response) === 'object') {
            if (typeof(response.alreadyRunKey) !== 'undefined') {
                RundizStrap_companion_settingsManualUpdateObj.alreadyRunUpdateKey = parseInt(response.alreadyRunKey);
            }

            RundizStrap_companion_settingsManualUpdateObj.alreadyRunUpdateTotal++;

            const totalActionElements = document.querySelector('.already-run-total-action');
            if (totalActionElements) {
                totalActionElements.textContent = RundizStrap_companion_settingsManualUpdateObj.alreadyRunUpdateTotal;
            }

            if (typeof(response.nextRunKey) !== 'undefined') {
                if (response.nextRunKey !== 'end') {
                    // if not completed, let admin do manual update until completed successfully.
                    if (actionButtons) {
                        actionButtons.textContent = RundizStrap_companion_settingsManualUpdateObj.txtNext;
                    }
                } else {
                    // if completed.
                    if (actionButtons) {
                        actionButtons.textContent = RundizStrap_companion_settingsManualUpdateObj.txtCompleted;
                    }
                    RundizStrap_companion_settingsManualUpdateObj.completed = 'true';
                }

                if (actionPlaceholders) {
                    actionPlaceholders.innerHTML = '<i class="bi bi-check-lg"></i>';
                }
            }// endif; there is `nextRunKey`.

            if (response.formResultClass && response.formResultMsg) {
                const noticeHTML = rundizstrap_companion_GetNoticeElement(response.formResultClass, response.formResultMsg);
                if (formresultPlaceholder) {
                    formresultPlaceholder.innerHTML = noticeHTML;
                }
            }
        } else {
            if (actionPlaceholders) {
                actionPlaceholders.innerHTML = '';
            }
        }
    })
    .catch((err) => {
        if (actionPlaceholders) {
            actionPlaceholders.innerHTML = '';
        }
        console.error(err.message);

        const errorHTML = rundizstrap_companion_GetNoticeElement('notice-error', err.message);
        if (formresultPlaceholder) {
            formresultPlaceholder.innerHTML = errorHTML;
        }
    })
    .finally(() => {
        if (actionButtons) {
            actionButtons.disabled = false;
            actionButtons.removeAttribute('disabled');
        }
    });
    // end prepare to make AJAX call. ====================================================
}// rundizstrap_companion_manualUpdateAjax


/**
 * Get notice html element from class and message specified.
 * 
 * @param {string} notice_class
 * @param {string} notice_message
 * @returns {String}
 */
function rundizstrap_companion_GetNoticeElement(notice_class, notice_message) {
    let output = `<div class="${notice_class} notice is-dismissible">`;

    if (typeof notice_message === 'string') {
        output += `<p><strong>${notice_message}</strong></p>`;
    } else if (notice_message && typeof notice_message === 'object') {
        Object.values(notice_message).forEach((eachMessage) => {
            output += `<p><strong>${eachMessage}</strong></p>`;
        });
    }

    output += '<button type="button" class="notice-dismiss"><span class="screen-reader-text">'
        + RundizStrap_companion_settingsManualUpdateObj.txtDismissNotice
        + '</span></button>'
        + '</div>';

    return output;
}// rundizstrap_companion_GetNoticeElement


// on dom ready --------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (event) => {
        const button = event.target.closest('.manual-update-action-button');
        if (!button) {
            return;
        }

        event.preventDefault();
        rundizstrap_companion_manualUpdateAjax();
    });
});
