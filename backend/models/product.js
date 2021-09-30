const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Entrer le nom du produit SVP'],
        trim:true,
        maxLength: [100, 'Le nom du produit ne peut excéder 100 caractères']
    },
    
    price: {
        type: Number,
        required: [true, 'Entrer le prix du produit SVP'],
        maxLength: [12, 'Le nom du produit ne peut excéder 12 caractères'],
        default: 0.0
    },

    description: {
        type: String,
        required: [true, 'Entrer la description du produit SVP'],
    },
    
    ratings:{
        type: Number,
        default: 0
    },

    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Selectionner la catégorie pour ce produit'],
        enum: {
            values: [
                'Electronique',
                'Cameras',
                'PC',
                'Accessoires',
                'Casque-audio',
                'Restauration',
                'Livres',
                'Habillement/chaussure',
                'Beauté/Santé',
                'Sport',
                'Extérieur-maison',
                'Maison'

            ],
            message: 'Selectionner correctement la catégorie du produit'
        }
    },
    seller: {
        type: String,
        required: [true, 'Entrer le vendeur du produit SVP']
    },
    stock: {
        type: Number,
        required: [true, 'Entrer le stock du produit SVP'],
        maxLength: [5, 'Le produit ne doit pas excéder 5 caractères'],
        default: 0
    },
    numOfRewiews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },        
            name:{
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema);