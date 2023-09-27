class Order {
    constructor(cart, userData, status = "pending", date, orderId){
        this.productData = cart;
        this.userData = userData;
        this.status = status;
        this.date = new Date(date)
        if (this.date) {
            this.formatedDate = this.date.toLocaleDateString('en-US', {
                day: "numeric",
                weekday: "short",
                month: "long",
                year: "numeric"
            })
        }
        this.id = orderId
    }

    
}