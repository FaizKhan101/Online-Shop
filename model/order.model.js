const db = require("../data/database")

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

    save() {
        if (this.id) {
            //Update order
        } else {
            const orderDocument = {
                userData: this.userData,
                productData: this.productData,
                date: new Date(),
                status: this.status
            }
            return db.getDb().collection("orders").insertOne(orderDocument)
        }
    }
}

module.exports = Order