const mongoose = require ('mongoose');
const bcrypt = require('bcryptjs'); 
const Card = require ('../models/Card');
const Schema = mongoose.Schema;


//Create Card schema

const  cardSchema = new Schema({
    card_number: {
        type: Number,
        minlength: 16,
        maxlength: 16
    },
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
    },
    card_type : {
        type : String,
        enum: ['credit', 'edinar']
    },
    credit: {
        expiration_date: String,
        cvv: Number
    },
    edinar: {
        password: {
            type: Number,
            minlength: 8,
            maxlength: 8
        }
    }
});
// Create User Schema
const  userSchema = new Schema({
    method : {
        type : String,
        enum: ['local', 'facebook', 'google'],
        required: true
    },
    user_type : {
        type : String,
        enum: ['client', 'fournisseur'],
        required: true
    },
    local: {

        email: {
            type: String,
            lowercase: true
        },
        password: {
            type: String,
            minlength: 4,
        },
        // id_user: Number,
        username: {
            type: String,
            minlength: 4
        },
        nom: {
            type: String,
            minlength: 4
        },
        prenom: {
            type: String,
            minlength: 4
        },
        num_portable: {
            type: Number,
            minlength: 8
        },
        num_fixe: {
            type: Number,
            minlength: 8
        },
        image: String,
        cards: [cardSchema],
        
        horaire_travail: String,
        nb_jours_travail: Number,
        libele: {
            type: String
        },
        siteweb:{
            type: String
        }
    },
    google: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        },
        img: {
            type: String
        }
    },
    facebook: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        },
        img: {
            type: String
        }
    },

});

// Hash password before saving the user
userSchema.pre('save', async function (next){
    try {
        if(this.method !== 'local'){
            next();
        }

        // Generate Salt for the password encryption
        const salt = await bcrypt.genSalt(15);
        // Generate a hashed password using Salt
        const passwordHash = await bcrypt.hash(this.local.password, salt);
        // Re-assign the hashed password to the user's acuatl password
        this.local.password = passwordHash;
        next();
        console.log ('Salt: '+ salt);
        console.log ('Original password: ' + this.local.password);
        console.log ('Hashed Password: ' +passwordHash);
    } catch (error) {
        next(error);
    }
});

// Compare hashedpassword vs password stored in db
userSchema.methods.isValidPassword  = async function(newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.local.password);
    } catch (error) {
        throw new Error (error);
    }
}
 
// Create Module
const User = mongoose.model('user', userSchema);
// Export Module
module.exports = User;