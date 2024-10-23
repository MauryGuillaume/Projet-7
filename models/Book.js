const mongoose = require('mongoose')

const bookSchema = mongoose.Schema ({
    userId: { type: String, required: true },
    title: { type: String, required:true },
    author: { type: String, required:true },
    year: { type: Number, required:true },
    genre: { type: String, required:true },
    ratings: [{
        userId: { type: String, required: true },
        grade: { type: Number, required: true }
    }],
    imageUrl: { type: String, required:true },
    averageRating: { type: Number, default: 0 },
})

bookSchema.methods.updateAverageRating = function() {
    if (this.ratings.length === 0) {
        this.averageRating = 0;
    } else {
        const sum = this.ratings.reduce((acc, rating) => acc + rating.grade, 0);
        this.averageRating = sum / this.ratings.length;
    }
    return this.save();  // Sauvegarde du livre avec la moyenne mise à jour
};

module.exports = mongoose.model('Book', bookSchema);