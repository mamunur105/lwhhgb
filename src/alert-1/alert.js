/**
 * BLOCK: lwhhgbd
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const { RichText } = wp.editor;


const STYLES = [
    {
        name: 'primary',
        label: __('Primary'),
        isDefault: true
    },
    {
        name: 'secondary',
        label: __('Secondary'),
    },
    {
        name: 'success',
        label: __('Success'),
    },
    {
        name: 'danger',
        label: __('Danger'),
    },
    {
        name: 'warning',
        label: __('Warning'),
    },
    {
        name: 'info',
        label: __('Info'),
    },
    {
        name: 'light',
        label: __('Light'),
    },
    {
        name: 'dark',
        label: __('Dark'),
    }
];


function getStyleNameFromClasses(styles, classes) {
    let style = (classes && styles.find(style => classes.includes(style.name)));
    return (style ? style.name : 'primary');
}

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'lwhhgbd/block-alert-1', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'lwhhgbd Alert 1' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	
	keywords: [
		__( 'alert ' ),
		__( 'alert Example 1' ),
		__( 'create-guten-block-alert-1' ),
	],
	styles: STYLES,
	attributes: {
		style: {
			type: 'string'
		},
		content: {
            type: 'array',
            source: 'children',
            selector: 'div',
        },
	},
	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */

	edit: ( props ) => {
        const { attributes: { content }, setAttributes, className } = props;
        const onChangeContent = ( newContent ) => {
            setAttributes( { content: newContent } );
        };
		let style = getStyleNameFromClasses(STYLES, className);
        console.log(style);
        return (
            <RichText
                tagName="div"
                multiline={true}
                className={`${className} alert alert-${style}`}
                onChange={ onChangeContent }
                value={ content }
            />
        );
    },
    save: ( props ) => {

        let style = getStyleNameFromClasses(STYLES, props.attributes.className);

        return <RichText.Content tagName="div" className={` alert alert-${style}`} value={props.attributes.content } />;
    
    },



} );


