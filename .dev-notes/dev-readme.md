# Developer's readme

## References
* Dashicon [https://developer.wordpress.org/resource/dashicons/](https://developer.wordpress.org/resource/dashicons/)
* Sample of block search [https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src/search](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src/search)
* Sample of block pagination numbers [https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src/query-pagination-numbers](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src/query-pagination-numbers)
* Block development [https://developer.wordpress.org/block-editor/getting-started/fundamentals/](https://developer.wordpress.org/block-editor/getting-started/fundamentals/)
* Block development examples [https://github.com/WordPress/block-development-examples/tree/trunk/plugins](https://github.com/WordPress/block-development-examples/tree/trunk/plugins)

## First dev/First install
* Run command `npm install` if there is no **node_modules** folder.

## After first install

### Node packages
* Run command `npm outdated` to check if Node packages is outdated.
* To update, run command `npm update`.
    * To update package version in code, run command `wpdev writeVersions` and check that all PHP files are still valid syntax by compare to files in folder **.backup**.
    * To build files into folder **assets** that is ready for publish, run command `npm run build`.

### Before commit
* Update plugin's version number in **readme.txt**, plugin's file **.php**.
* Run command `npm run pack` to pack files into zip and store in folder **.dist**. The plugin version will also write into package.json.
