<?php
/**
 * Loader class. This class will load anything for example: views, template, configuration file.
 *
 * @package bbfse-plugin
 * @since 0.0.1
 */


namespace BBFSEPlugin\App\Libraries;

if (!class_exists('\\BBFSEPlugin\\App\\Libraries\\Loader')) {
    /**
     * Loader class for load template, view file, etc.
     * 
     * @since 0.0.1
     */
    class Loader
    {


        /**
         * Automatic look into those controllers and register to the main App class to make it works.<br>
         * The controllers that will be register must implement BBFSEPlugin\App\Controllers\ControllerInterface to have registerHooks() method in it, otherwise it will be skipped.
         * 
         * @since 0.0.1
         */
        public function autoRegisterControllers()
        {
            $this_plugin_dir = dirname(BBFSEPLUGIN_FILE);
            $file_list = $this->getClassFileList($this_plugin_dir . DIRECTORY_SEPARATOR . 'App' . DIRECTORY_SEPARATOR . 'Controllers');

            if (is_array($file_list)) {
                foreach ($file_list as $file) {
                    $this_file_classname = '\\BBFSEPlugin' . str_replace([$this_plugin_dir, '.php', '/'], ['', '', '\\'], $file);
                    if (class_exists($this_file_classname)) {
                        $TestClass = new \ReflectionClass($this_file_classname);
                        if (
                            !$TestClass->isAbstract() && 
                            !$TestClass->isTrait() && 
                            $TestClass->implementsInterface('\\BBFSEPlugin\\App\\Controllers\\ControllerInterface')
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
                throw new Exception(
                    sprintf(
                        // translators: %s: Template path.
                        esc_html(__('The views file was not found (%s).', 'bbfse-plugin')), 
                        str_replace(['\\', '/'], '/', $templateFile)// phpcs:ignore WordPress.Security.EscapeOutput
                    )
                );
            }
        }// loadView


    }// Loader
}
