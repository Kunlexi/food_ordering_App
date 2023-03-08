"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VandorRoute = void 0;
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../controllers");
var middleware_1 = require("../middleware");
var multer_1 = __importDefault(require("multer"));
var router = express_1.default.Router();
exports.VandorRoute = router;
var imageStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images");
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + "_" + file.originalname);
    },
});
var images = (0, multer_1.default)({ storage: imageStorage }).array("images", 10);
router.get("/login", controllers_1.VendorLogin);
router.use(middleware_1.Authenticate);
router.get("/profile", controllers_1.VendorLogin);
router.patch("/profile", controllers_1.UpdateVendorProfile);
router.patch("/coverimage", images, controllers_1.UpdateVendorCoverImage);
router.patch("/service", controllers_1.UpdateVendorService);
router.post("/food", images, controllers_1.AddFood);
router.get("/food", controllers_1.GetFoods);
router.get("/orders", controllers_1.GetOrders);
router.put("/order/:id/process", controllers_1.ProcessOrder);
router.get("/order/:id", controllers_1.GetOrderDetails);
//Offers
router.get("/offers", controllers_1.GetOffers);
router.post("/offer", controllers_1.AddOffer);
router.put("/offer/:id", controllers_1.EditOffer);
router.get("/", function (req, res, next) {
    res.json({ message: "Hello from Vandor" });
});
//# sourceMappingURL=VandorRoute.js.map