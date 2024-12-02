document.addEventListener('DOMContentLoaded', function () {
    const resourceName = window.location.pathname.split('/').pop();

    // Load filters from localStorage
    const savedFilters = JSON.parse(localStorage.getItem(`nova-filters-${resourceName}`));
    if (savedFilters) {
        Nova.$emit('filter-changed', savedFilters);
    }

    // Save filters to localStorage on change
    Nova.$on('nova.filters-changed', (filters) => {
        localStorage.setItem(`nova-filters-${resourceName}`, JSON.stringify(filters));
    });
});
