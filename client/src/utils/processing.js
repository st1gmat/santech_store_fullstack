export const sortProducts = (sortOrder, sortParam) => (a, b) => {
    const aValue = a[sortParam];
    const bValue = b[sortParam];

    if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
    } else {
        return aValue < bValue ? 1 : -1;
    }
};