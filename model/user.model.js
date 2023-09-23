const bcrypt = require("bcryptjs")

const db = require("../data/database")

class User {
    constructor(email, password, fullname, street, postal, city) {
        this.email = email;
        this.password = password;
        this.name = fullname;
        this.address = {
            street: street,
            postal: postal,
            city: city
        }
    }

    getUserWithSameEmail() {
        return db.getDb().collection("users").findOne({email: this.email})
    }

    async signup() {
        const hashedPassword = await bcrypt.hash(this.password, 12)

        db.getDb().collection('users').insertOne({
            email: this.email,
            password: hashedPassword,
            name: this.name,
            address: this.address
        })
    }

    hasMathchingPassword(hashedPassword) {
        return bcrypt.compare(this.password, hashedPassword)
    }
}

module.exports = User;