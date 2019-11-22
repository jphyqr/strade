const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const getPhotosForListing = require("./get_photos_for_listing");

const getAllDealerships = require("./get_all_dealerships.js");

const getInventoryForDealership = require("./get_inventory_for_dealership.js");
const getAveragePriceForYMM = require("./get_average_price_for_ymm.js");
exports.getAllDealerships = functions.https.onRequest(getAllDealerships);
exports.getInventoryForDealership = functions.https.onRequest(getInventoryForDealership);
exports.getAveragePriceForYMM = functions.https.onRequest(getAveragePriceForYMM);
exports.getPhotosForListing = functions.https.onRequest(getPhotosForListing);