


// directives.js
export const numberFormatter = {
    bind(el, binding, vnode) {
        const formatNumber = (value) => {
            if (!value) return '';
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        };

        const parseNumber = (value) => {
            return parseFloat(value.replace(/,/g, '')) || 0;
        };

        el.addEventListener('input', function () {
            let value = el.value.replace(/,/g, '');
            const formattedValue = formatNumber(value);
            el.value = formattedValue;

            // Update the model with the parsed numeric value
            vnode.context[binding.expression] = parseNumber(value);
        });

        el.addEventListener('blur', function () {
            let value = el.value.replace(/,/g, '');
            // Ensure the model is updated with the parsed numeric value on blur
            vnode.context[binding.expression] = parseNumber(value);
        });

        // Initialize with formatted value
        el.value = formatNumber(binding.value);
    },
    update(el, binding) {
        el.value = binding.value ? binding.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
    }
};
