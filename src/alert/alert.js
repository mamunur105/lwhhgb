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

const { PlainText } = wp.editor;


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
registerBlockType( 'lwhhgbd/block-alert', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'lwhhgbd Alert Block' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	
	keywords: [
		__( 'alert' ),
		__( 'alert Example' ),
		__( 'create-guten-block-alert' ),
	],
	styles: STYLES,
	attributes: {
		style: {
			type: 'string'
		},
		content: {
			type: 'string',
			default: __('This is an alert block.')
		}
	},
	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit({ className, setAttributes, attributes, isSelected }) {
		let style = getStyleNameFromClasses(STYLES, className);
		// console.log(style);
		setAttributes({ style });
		return (
			<div className={`${className} alert alert-${style}`}>
				{
					isSelected ?
						<PlainText
							className='alert-content'
							value={attributes.content}
							onChange={(content) => setAttributes({ content })}
						/> :
						attributes.content
				}
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save({ attributes }) {
		return (
			<div className={`alert alert-${attributes.style}`}>{attributes.content}</div>
		);
	},
} );
