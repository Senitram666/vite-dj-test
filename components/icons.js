export default function (Alpine) {
    // examples:
    // <div x-icon:icon></div>
    // <div x-icon="iconVar"></div>
    // requires icon.svg in the /icons/ folder
    Alpine.directive('icon', (el, { value, expression }, { evaluate }) => {
        let icon = null;

        // Check if value is provided and valid
        if (typeof value === 'string' && value.trim() !== '') {
            icon = value;
        }
        // Check if expression is provided and evaluates to a valid string
        else if (typeof expression === 'string' && expression.trim() !== '') {
            try {
                const result = evaluate(expression);
                if (typeof result === 'string' && result.trim() !== '') {
                    icon = result;
                } else {
                    console.error("Expression did not evaluate to a valid string");
                }
            } catch (error) {
                console.error(`Failed to evaluate expression: ${expression}`, error);
            }
        }

        // Fetch and load the icon if valid
        if (icon !== null) {
            fetch(`/icons/${icon}.svg`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Icon not found: ${icon}`);
                    }
                    return response.text();
                })
                .then((html) => {
                    el.innerHTML = html;
                })
                .catch((error) => {
                    console.error(`Failed to load icon: ${icon}`, error);
                });
        } else {
            console.error("Invalid icon provided or could not determine an icon");
        }
    });
}
