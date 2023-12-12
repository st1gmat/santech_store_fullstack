export const calculateTotalSum = (ordersList) => {
    let totalSum = 0;

    for (const orderProduct of ordersList) {
        totalSum += orderProduct.product.price;
    }

    return totalSum;
};