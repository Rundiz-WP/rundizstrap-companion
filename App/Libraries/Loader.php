<?php
/**
 * Loader class. This class will load anything for example: views, template, configuration file.
 *
 * @package rundizstrap-companion
 * @since 0.0.1
 */


namespace BBFSEPlug\App\Libraries;


if (!class_exists('\\BBFSEPlug\\App\\Libraries\\Loader')) {
    /**
     * Loader class for load template, view file, etc.
     * 
     * @since 0.0.1
     */
    class Loader
    {


        use \BBFSEPlug\App\AppTrait;


        /**
         * @var array The manual update classes that will be run. Detected by `haveManualUpdate()` method.
         */
        protected $manualUpdateClasses = [];


        /**
         * Automatic look into those controllers and register to the main App class to make it works.<br>
         * The controllers that will be register must implement BBFSEPlug\App\Controllers\ControllerInterface to have registerHooks() method in it, otherwise it will be skipped.
         * 
         * @since 0.0.1
         */
        public function autoRegisterControllers()
        {
            $this_plugin_dir = dirname(BBFSEPLUG_FILE);
            $file_list = $this->getClassFileList($this_plugin_dir . DIRECTORY_SEPARATOR . 'App' . DIRECTORY_SEPARATOR . 'Controllers');

            if (is_array($file_list)) {
                foreach ($file_list as $file) {
                    $this_file_classname = '\\BBFSEPlug' . str_replace([$this_plugin_dir, '.php', '/'], ['', '', '\\'], $file);
                    if (class_exists($this_file_classname)) {
                        $TestClass = new \ReflectionClass($this_file_classname);
                        if (
                            !$TestClass->isAbstract() && 
                            !$TestClass->isTrait() && 
                            $TestClass->implementsInterface('\\BBFSEPlug\\App\\Controllers\\ControllerInterface')
                        ) {
                            $ControllerClass = new $this_file_classname();
                            if (method_exists($ControllerClass, 'registerHooks')) {
                                $ControllerClass->registerHooks();
                            }
                            unset($ControllerClass);
                        }
                        unset($TestClass);
                    }
                    unset($this_file_classname);
                }// endforeach;
                unset($file);
            }

            unset($file_list, $this_plugin_dir);
        }// autoRegisterControllers


        /**
         * Get file list that may contain class in specific path.
         *
         * @since 0.0.1
         * @param string $path The full path without trailing slash.
         * @return array Return indexed array of file list.
         */
        protected function getClassFileList(string $path): array
        {
            $Di = new \RecursiveDirectoryIterator($path, \RecursiveDirectoryIterator::SKIP_DOTS);
            $It = new \RecursiveIteratorIterator($Di);
            unset($Di);

            $file_list = [];
            foreach ($It as $file) {
                $file_list[] = $file;
            }// endforeach;
            unset($file, $It);
            natsort($file_list);

            return $file_list;
        }// getClassFileList


        /**
         * Get manual update PHP classes.
         * 
         * @since 0.0.1
         * @return array Return indexed array of manual update PHP classes.
         */
        public function getManualUpdateClasses(): array
        {
            if (empty($this->manualUpdateClasses)) {
                $this->haveManualUpdate();
            }

            return $this->manualUpdateClasses;
        }// getManualUpdateClasses


        /**
         * Check that is this version of app have manual update code?
         *
         * @since 0.0.1
         * @return bool Return `true` if there is manual update, `false` for otherwise.
         */
        public function haveManualUpdate(): bool
        {
            $config_values = $this->getOptions();
            if (is_array($config_values) && array_key_exists('rdsfw_manual_update_version', $config_values)) {
                $current_manual_update_version = $config_values['rdsfw_manual_update_version'];
            } else {
                $current_manual_update_version = '';
            }
            unset($config_values);

            $this_plugin_dir = dirname(BBFSEPLUG_FILE);
            $file_list = $this->getClassFileList($this_plugin_dir . DIRECTORY_SEPARATOR . 'App' . DIRECTORY_SEPARATOR . 'Update' . DIRECTORY_SEPARATOR . 'Manual');

            if (is_array($file_list) && !empty($file_list)) {
                foreach ($file_list as $file) {
                    $this_file_classname = '\\BBFSEPlug' . str_replace([$this_plugin_dir, '.php', '/'], ['', '', '\\'], $file);
                    if (class_exists($this_file_classname)) {
                        $TestClass = new \ReflectionClass($this_file_classname);
                        if (
                            !$TestClass->isAbstract() && 
                            !$TestClass->isTrait() && 
                            !$TestClass->isInterface() &&
                            $TestClass->implementsInterface('\\BBFSEPlug\\App\\Update\\Manual\\ManualUpdateInterface') &&
                            $TestClass->hasProperty('manual_update_version') &&
                            $TestClass->hasMethod('run')
                        ) {
                            // If contain all requirements.
                            $UpdateClass = new $this_file_classname();
                            if (
                                '' === $current_manual_update_version || 
                                version_compare($current_manual_update_version, $UpdateClass->manual_update_version, '<')
                            ) {
                                $this->manualUpdateClasses[] = $this_file_classname;
                            }
                            unset($UpdateClass);
                        }// endif; contain all required property, method, interface.
                        unset($TestClass);
                    }// endif; `class_exists()`.
                    unset($this_file_classname);
                }// endforeach;
                unset($file);
            }

            unset($current_manual_update_version, $file_list, $this_plugin_dir);

            if (empty($this->manualUpdateClasses)) {
                return false;
            } else {
                return true;
            }
        }// haveManualUpdate


        /**
         * Load config file and return its values.
         *
         * @since 0.0.1
         * @param string $config_file_name The configuration file name only without extension.
         * @param bool $require_once Mark as `true` to use `require_once`, otherwise use `require`.
         * @return mixed Return config file content if success. Return `false` if failed.
         */
        public function loadConfig(string $config_file_name = 'config', bool $require_once = false)
        {
            $config_dir = dirname(__DIR__) . '/config/';

            if (file_exists($config_dir) && is_file($config_dir . $config_file_name . '.php')) {
                if (true === $require_once) {
                    $config_values = require_once $config_dir . $config_file_name . '.php';
                } else {
                    $config_values = require $config_dir . $config_file_name . '.php';
                }
            }

            unset($config_dir);
            if (isset($config_values)) {
                return $config_values;
            }
            return false;
        }// loadConfig


        /**
         * Load views.
         *
         * @since 0.0.1
         * @param string $view_name View file name, refer from app/Views folder.
         * @param array $data For send data variable to view.
         * @param bool $require_once Set to `true` to use `include_once`, `false` to use `include`. Default is `false`.
         * @return bool Return `true` if success loading.
         * @throws \Exception Throws the error if views file was not found.
         */
        public function loadView(string $view_name, array $data = [], bool $require_once = false): bool
        {
            $view_dir = dirname(__DIR__) . '/Views/';
            $templateFile = $view_dir . $view_name . '.php';
            unset($view_dir);

            if ('' !== $view_name && file_exists($templateFile) && is_file($templateFile)) {
                // if views file was found.
                if (is_array($data)) {
                    extract($data, EXTR_PREFIX_SAME, 'dupvar_');// phpcs:ignore WordPress.PHP.DontExtract.extract_extract
                }

                if (true === $require_once) {
                    include_once $templateFile;
                } else {
                    include $templateFile;
                }

                unset($templateFile);
                return true;
            } else {
                // if views file was not found.
                // throw the exception to notice the developers.
                throw new \Exception(
                    sprintf(
                        // translators: %s: Template path.
                        esc_html(__('The views file was not found (%s).', 'rundizstrap-companion')), 
                        str_replace(['\\', '/'], '/', $templateFile)// phpcs:ignore WordPress.Security.EscapeOutput
                    )
                );
            }
        }// loadView


    }// Loader
}
