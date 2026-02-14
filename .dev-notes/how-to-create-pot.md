Use this command:
```
wp i18n make-pot . --exclude="assets/vendor,App/vendor,blocks-src,languages,node_modules,node_tasks,*.css,*.svg,*.eot,*.woff,*.woff2,*.ttf,*.txt,*.pot"
```
Or via command `npm run langPot`  
And check the result.

Convert to JSON to make block i18n supported.
* Translate text and save into .po (+.mo)
* Run this command:
    ```
    wp i18n make-json languages/rundizstrap-companion-th.po --no-purge --pretty-print
    ```
    Or via comment `npm run langJson`
