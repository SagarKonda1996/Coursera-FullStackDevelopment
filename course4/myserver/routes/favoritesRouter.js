const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const authenticate = require('../authenticate');
const cors = require('./cors');
const Dishes = require('../models/dishes');
const User = require('../models/users');
const lodash = require('lodash')

const Favorites = require('../models/favorites');

const favoritesRouter = express.Router();


favoritesRouter.use(bodyParser.json());

const isValidDish = async (dishId) => {
    return new Promise((resolve, reject) => {
        Dishes.findById(dishId, (err, dish) => {
            if (!dish) {
                err = new Error(`Dish with ${dishId} Not Exists`)
                err.status = 403
                resolve([err, null])
            }
            else {
                resolve([null, dish._id])
            }
        })

    })

}
const createFavoriteIfNotExists = async (userId) => {
    return new Promise((resolve, reject) => {
        Favorites.findOne({ user: userId }, (err, favorite) => {
            if (!favorite) {
                Favorites.create({ user: userId }, (err, createdFavorite) => {
                    if (createdFavorite) {
                        resolve([null, createdFavorite])
                    }
                    else {
                        resolve([err, null])
                    }
                })
            }
            else if (favorite) {
                resolve([null, favorite])
            }
            else {
                resolve([err, null])
            }
        })
    })

}
const removeDuplicatesandAdd = async (favorite, dishesList) => {
    return new Promise(async (resolve, reject) => {
// Removing Invalid Dishes references
        dishesList = await Promise.all(dishesList.map(async (item) => {
            const [err, dishId] = await isValidDish(item)
            if (dishId)
                return dishId
        }))
            .then((dishList) => dishList.filter(dishId => dishId != undefined))
//Converting Mongoose ObjectId to String for DishList
        dishesList = dishesList.map(item => item._id.toString())
//Converting Mongoose ObjectId to String for dishes already in Favorites
        var updatedDishes = favorite.dishes.map(item => item._id.toString())
//Creating Unique List of Current Favorite List and DishesList Passed
        updatedDishes = [...new Set([...updatedDishes, ...dishesList])]
//Converting back the updated Dishes List to ObjectIDs
        updatedDishes = updatedDishes.map(item => mongoose.Types.ObjectId(item))
        favorite.dishes = updatedDishes
        favorite.save((err, updatedFavorite) => {
            if (err) {
                resolve([err, null]);
            }
            else {
                resolve([null, updatedFavorite])
            }
        })
    })
}

favoritesRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .get(cors.corsWithOptions, authenticate.verifyUser, async (req, res, next) => {
        Favorites.findOne({ user: req.user._id }).populate('user').populate('dishes')
            .then((favorite) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.json(favorite)


            }, (err) => next(err))
            .catch((err) => next(err));

    })
    .post(cors.corsWithOptions, authenticate.verifyUser, async (req, res, next) => {
//Check If Favorite for User Exits if Not Create New Document for that User
        const [err, favorite] = await createFavoriteIfNotExists(req.user._id);
        if (err) {
            next(err)
        }
        else if (favorite) {
//Remove Duplicate DishIDs and invalid DishIds from Request Body and Update Favorites
            const [err, updatedFavorite] = await removeDuplicatesandAdd(favorite, req.body.map(item => mongoose.Types.ObjectId(item._id)))
            if (err) {
                next(err)
            }
            else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.json(updatedFavorite)
            }
        }
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, async (req, res, next) => {
        Favorites.findOneAndDelete({ user: req.user._id })
            .then((favorite) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(favorite)
            }, (err) => next(err))
            .catch((err) => next(err));
    })

favoritesRouter.route('/:dishId')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, async (req, res, next) => {
//Check If Favorite for User Exits if Not Create New Document for that User

        const [err, favorite] = await createFavoriteIfNotExists(req.user._id);
        if (err) {
            next(err)
        }
        else if (favorite) {
//Check if the DishId passed from the parameters is valid
            const [err, validDish] = await isValidDish(req.params.dishId)
            if (err) {
                next(err)
            }
            else {
//Check If Dish Already Exists in Favorites
                if (favorite.dishes.indexOf(req.params.dishId) == -1) {
                    const [err, updatedFavorite] = await removeDuplicatesandAdd(favorite, [mongoose.Types.ObjectId(req.params.dishId)])
                    if (err) {
                        next(err)
                    }
                    else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json')
                        res.json(updatedFavorite)
                    }
                }
                else {
                    var newerr = new Error(`Dish with ${req.params.dishId} Already in favorites`)
                    newerr.status = 403
                    next(newerr)
                }
            }

        }
    })

    .delete(cors.corsWithOptions, authenticate.verifyUser, async (req, res, next) => {
        Favorites.findOne({user:req.user._id},async(err,favorite)=>{
        if (err) {
            next(err)
        }
        else if (favorite) {
//Check if the DishId passed from the parameters References valid Dish in DB
            const [err, validDish] = await isValidDish(req.params.dishId)
            if (err) {
                next(err)
            }
            else {
//Check if Dish is in Favorite Before Deleting
                if (favorite.dishes.indexOf(req.params.dishId) == -1) {
                    var newerr = new Error(`Dish ${req.params.dishId} is not in Favorite `)
                    newerr.status = 403
                    next(newerr)
                }
                else {
                    favorite.dishes = favorite.dishes.filter(dishId => dishId._id.toString() != req.params.dishId)
                    
                    favorite.save()
                        .then((updatedFavorite) => {
//Check if the Dishes List for a user is Empty after delete
                            if(updatedFavorite.dishes.length>0)
                            {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json')
                                res.json(updatedFavorite)
                            }
                            else
                            {
//If dishes list for user is empty delete the Document
                                Favorites.findOneAndDelete({ user: req.user._id })
                                .then((updatedFavorite)=>{
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json')
                                    res.json(updatedFavorite)
                                }, (err) => next(err))
                                .catch((err) => next(err))
                            }    
                        }, (err) => next(err))
                        .catch((err) => next(err))
                }
            }
        }
    })
    })


module.exports = favoritesRouter