<?php
/**
 * Block 1 definition and functions
 *
 * @package LWHH Gutenberg Development
 * @since 0.0.1
 */
defined( 'ABSPATH' ) || exit;

/**
 * Register block 1
 *
 * @return void
 */

function register_first_block(){

    wp_register_script(
        'lwhh-block-1',
        plugins_url('index.js',__FILE__),
        array('wp-blocks','wp-i18n','wp-element')
    );

    register_block_type('lwhh/hello-world',array(
        'editor_script' 	=> 'lwhh-block-1',
    )); 

}

add_action('init','register_first_block');