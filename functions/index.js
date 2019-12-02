const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const getPhotosForListing = require("./get_photos_for_listing");

const getAllDealerships = require("./get_all_dealerships.js");
const getSimilarInventory = require("./get_similar_inventory.js");

const getInitialInventoryAndMakeFacet = require("./get_initial_inventory_for_dealership_make_facet.js");
const getAveragePriceForYMM = require("./get_average_price_for_ymm.js");
const getMarketYMMTFacet = require("./get_market_ymmt_facet.js");

const getListingCountsForMarket = require("./get_dealer_listing_counts_for_market.js");
const getTradeSmartForListing = require("./get_tradesmart_for_listing.js");

const getMDSForListing = require("./get_mds_for_listing.js");



const getModelFacetForDealer = require("./get_model_facet_for_dealership");

const getAPageOfInventory = require("./get_page_of_inventory.js");

const getCopyVins = require("./get_copy_vins");

const getDealerInfo = require("./get_dealer_info.js");




exports.getAllDealerships = functions.https.onRequest(getAllDealerships);
exports.getInitialInventoryAndMakeFacet = functions.https.onRequest(getInitialInventoryAndMakeFacet);
exports.getAveragePriceForYMM = functions.https.onRequest(getAveragePriceForYMM);
exports.getPhotosForListing = functions.https.onRequest(getPhotosForListing);
exports.getSimilarInventory = functions.https.onRequest(getSimilarInventory);
exports.getMarketYMMTFacet = functions.https.onRequest(getMarketYMMTFacet);
exports.getListingCountsForMarket = functions.https.onRequest(getListingCountsForMarket);
exports.getTradeSmartForListing = functions.https.onRequest(getTradeSmartForListing);
exports.getMDSForListing = functions.https.onRequest(getMDSForListing);
exports.getModelFacetForDealer = functions.https.onRequest(getModelFacetForDealer);

exports.getCopyVins = functions.https.onRequest(getCopyVins);

exports.getAPageOfInventory = functions.https.onRequest(getAPageOfInventory);

exports.getDealerInfo = functions.https.onRequest(getDealerInfo);


exports.helloHttp = (req, res) => {
    res.send(`Hello  'World')}!`);
  };