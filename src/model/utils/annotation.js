import DOM from '../../constants/domSelectors';

/**
 * @param {string} content - what shall be included in the <p> tag.
 * @param {string} [type=alert] - type of annotation. Available types are: 'success', 'alert' (default), 'error', 'light-info'.
 */

export const annotation = (content, type = 'alert') => `
  <div class="${DOM.DOMAIN_CHECKER.CLASSNAME.WYKOP_ITEM_ANNOTATION} type-${type} space clearfix">
		<p>${content}</p>
	</div>
`;