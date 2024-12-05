import fs from 'fs';
import path from 'path';

export default function alpineIncludePlugin() {
  /**
   * Recursively resolve `x-include` in the content.
   * @param {string} content - The HTML content to process.
   * @returns {string} - The content with all `x-include` directives resolved.
   */
  function resolveIncludes(content) {
    const includeRegex = /<([a-zA-Z0-9\-]+)([^>]*)x-include="([^"]+)"([^>]*)>(.*?)<\/\1>/gs;

    return content.replace(includeRegex, (match, tagName, beforeAttrs, fileName, afterAttrs) => {
      const templatePath = path.resolve('templates', fileName);
      let includedContent = `<!-- Failed to load ${fileName} -->`;

      try {
        if (fs.existsSync(templatePath)) {
          // Read and recursively resolve includes in the template file
          includedContent = resolveIncludes(fs.readFileSync(templatePath, 'utf8'));
        } else {
          console.error(`Template not found: ${templatePath}`);
        }
      } catch (err) {
        console.error(`Error loading template: ${templatePath}`, err);
      }

      // Rebuild the tag without the `x-include` attribute and replace its inner content
      return `<${tagName}${beforeAttrs}${afterAttrs}>${includedContent}</${tagName}>`;
    });
  }

  return {
    name: 'alpine-include',
    order: 'pre',
    transformIndexHtml: {
      order: 'pre', 
      handler(html) { 
        return resolveIncludes(html); 
      },
    },
  };
}
