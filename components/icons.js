export default function (Alpine) {
  const iconCache = new Map();

  Alpine.directive('icon', async (el, { value, expression }, { evaluate }) => {
    // examples:
    // <div x-icon:icon></div>
    // <div x-icon="iconVar"></div>
    // requires icon.svg in the /icons/ folder
    let iconName = null;

    // Step 1: Determine the icon name
    // This block handles two ways of specifying the icon name:
    // 1. Direct value attribute: x-icon:home
    // 2. Dynamic expression: x-icon="iconName"
    if (typeof value === 'string' && value.trim() !== '') {
      iconName = value;
    } else if (typeof expression === 'string' && expression.trim() !== '') {
      try {
        const result = evaluate(expression);
        if (typeof result === 'string' && result.trim() !== '') {
          iconName = result;
        }
      } catch (error) {
        console.error(`Failed to evaluate expression: ${expression}`, error);
        return;
      }
    }

    // Validate icon name is not empty
    if (!iconName) {
      console.error('Invalid icon name provided');
      return;
    }

    try {
      // Step 2: Check icon cache to avoid redundant fetching
      if (iconCache.has(iconName)) {
        el.innerHTML = iconCache.get(iconName);
        return;
      }

      // Step 3: Fetch the SVG icon
      const response = await fetch(`/icons/${iconName}.svg`);
      if (!response.ok) {
        throw new Error(`Icon not found: ${iconName}`);
      }

      // Step 4: Get SVG content as text
      const svgContent = await response.text();

      // Step 5: Validate SVG content
      const isValidSVG = validateSVG(svgContent);
      if (!isValidSVG) {
        throw new Error(
          `Invalid SVG icon: ${iconName} at /icons/${iconName}.svg`
        );
      }

      // Cache and display the SVG
      iconCache.set(iconName, svgContent);
      el.innerHTML = svgContent;
    } catch (error) {
      console.error(`Failed to load icon: ${iconName}`, error);
      // Display default placeholder icon
      el.innerHTML = getDefaultIcon();
    }
  });

  // SVG Validation Function
  function validateSVG(svgContent) {
    // Remove XML declaration if present
    const cleanedContent = svgContent.replace(/<\?xml[^>]*\?>/, '').trim();

    // Create a temporary DOM parser
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(cleanedContent, 'image/svg+xml');

    // Check for parsing errors
    const parserErrors = xmlDoc.getElementsByTagName('parsererror');
    if (parserErrors.length > 0) {
      return false;
    }

    // Validate that only <svg> tag exists at root level
    if (xmlDoc.documentElement.tagName.toLowerCase() !== 'svg') {
      return false;
    }

    return true;
  }

  // Default Icon Placeholder Function
  function getDefaultIcon() {
    return `<svg height="1em" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
    </svg>`;
  }
}
