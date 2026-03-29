# Change log

## v0.x

### 0.0.7
2026-03-20
* Update App/Views/admin/settings_v.php to use `wp_kses`.
* Update App/Libraries/RundizSettings.php to escape all values.
* Update all blocks*/render.php to use custom kses to support modern HTML elements and attributes but excluded danger attributes.

### 0.0.6
2026-03-10

* Fix supports `anchor` not working with dynamic block. ( See bug https://github.com/WordPress/gutenberg/issues/6356 )
* Update object prefix in App/Controllers/Admin/Plugins/Upgrader.php and its assets/js/Admin/rd-settings-manual-update.js.


### 0.0.5
2026-02-23

* Fix deprecated in blocks.
* Update all blocks to sanitize and escape.
* Fix incorrect register Bootstrap JS.

### 0.0.4
2026-02-21

* Include GitHub link to show original source code in readme.txt.
* Fix include JS without using built-in functions.
* Update sanitize callback for config.
* Fix escape and comments what cannot be escape.
* Rename handle from dash(-) to underscore(_) as suggest by WP plugin reviewer.

### 0.0.3
2026-02-15

* Renamed from BBFSE Plug -> RundizStrap Companion.

### 0.0.1
2026-02-06

* The beginning.
* Renamed from BBFSE Plugin (Bootstrap Basic FSE Plugin) -> BBFSE Plug.