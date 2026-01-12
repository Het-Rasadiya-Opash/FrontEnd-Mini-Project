var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var API_KEY = "f91d1a6e5c9498e2e6f34603336c6e7e";
var cityInput = document.querySelector("#cityInput");
var searchBtn = document.querySelector("#searchBtn");
var weatherInfo = document.querySelector("#weatherInfo");
var cityName = document.querySelector("#cityName");
var temperature = document.querySelector("#temperature");
var humidity = document.querySelector("#humidity");
var wind = document.querySelector("#wind");
var weatherIcon = document.querySelector("#weatherIcon");
if (!cityInput ||
    !searchBtn ||
    !weatherInfo ||
    !cityName ||
    !temperature ||
    !humidity ||
    !wind ||
    !weatherIcon) {
    throw new Error("One or more DOM elements not found");
}
searchBtn.addEventListener("click", function () {
    var city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});
function fetchWeather(city) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response_1, text, data, error_1, msg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    url = "https://api.openweathermap.org/data/2.5/weather?q=".concat(encodeURIComponent(city), "&units=metric&appid=").concat(API_KEY);
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response_1 = _a.sent();
                    if (!!response_1.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response_1.text().catch(function () { return response_1.statusText || ""; })];
                case 2:
                    text = _a.sent();
                    throw new Error("API error ".concat(response_1.status, ": ").concat(text || response_1.statusText));
                case 3: return [4 /*yield*/, response_1.json()];
                case 4:
                    data = (_a.sent());
                    displayWeather(data);
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.error("fetchWeather error:", error_1);
                    msg = error_1 instanceof Error ? error_1.message : String(error_1);
                    alert("Unable to fetch weather data: ".concat(msg));
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function displayWeather(data) {
    if (!cityInput ||
        !searchBtn ||
        !weatherInfo ||
        !cityName ||
        !temperature ||
        !humidity ||
        !wind ||
        !weatherIcon) {
        throw new Error("One or more DOM elements not found");
    }
    weatherInfo.style.display = "block";
    cityName.textContent = data.name;
    temperature.textContent = "\uD83C\uDF21 Temperature: ".concat(data.main.temp, " \u00B0C");
    humidity.textContent = "\uD83D\uDCA7 Humidity: ".concat(data.main.humidity, "%");
    wind.textContent = "\uD83C\uDF2C Wind Speed: ".concat(data.wind.speed, " m/s");
    var iconCode = data.weather[0].icon;
    weatherIcon.src = "https://openweathermap.org/img/wn/".concat(iconCode, "@2x.png");
}
