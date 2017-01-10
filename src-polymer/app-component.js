/**
 * ======================================================================
 * Polymer Constructor
 * ======================================================================
 */
Polymer({

    is: `app-component`,

    behaviors: [
        Polymer.Behaviors.Loader,
        Polymer.Behaviors.DebugBehavior,
        Polymer.Behaviors.Resource
    ],

    listeners: {
        'on-start': `_onStart`,
        'on-about': `_onAbout`,
        'on-usage-category': `_onUsageCategory`,
        'on-postcode': `_onPostcode`,
        'on-area': `_onArea`,
        'on-duration': `_onDuration`,
        'on-contract-start-date-selection': `_onContractStartDateSelection`,
        'on-usage': `_onUsage`,
        'on-contract-type': `_onContractType`,
        'on-contract-selection': `_onContractSelection`,
        'on-personal-number': `_onPersonalNumber`,
        'on-electricity-address': `_onElectricityAddress`,
        'on-billing-address': `_onBillingAddress`,
        'on-customer-info-confirm': `_onCustomerInfoConfirm`,
        'on-contact-info-confirmed': `_onContactInfoConfirmed`,
        'on-submit-contract': `_onSubmitContract`,
        'on-analytics-event': `_onAnalyticsEvent`,
        'on-resettle-event': `_onResettleEvent`,
        'on-resettle-info-event': `_onResettleInfoEvent`,
        'on-proxy-process-event': `_onProxyProcessEvent`,
        'on-notify-event': `_onNotifyEvent`
    },

    observers: [
        `_createContractStartDateList(contractListFiltedredByTypeByUsageByDuration)`,
        `_contractListRequest(area, taxType, namespaceId)`,
        `_createContractDurationList(contractListFiltedredByTypeByUsage)`,
        `_aboutAndAboutListChanged(about, aboutList)`,
        `_calculateAboutFee(about, aboutList)`,
        `_usageChanged(usage)`,
        `_usageCategoryAndContractListFiltedredByTypeChanged(usageCategory, contractListFiltedredByType)`,
        `_durationChanged(duration)`,
        `_durationAndContractListFiltedredByTypeByUsageChanged(duration, contractListFiltedredByTypeByUsage)`,
        `_contractStartDateSelectionChanged(contractStartDateSelected)`,
        `_contractStartDateSelectedAndContractListFiltedredByTypeByUsageByDurationChanged(contractStartDateSelected, contractListFiltedredByTypeByUsageByDuration)`,
        `_contractListChanged(contractList)`,
        `_contractTypeListChanged(contractTypeList)`,
        `_contractTypeChanged(contractType, contractTypeList)`,
        `_calculateMonthlyCost(usage, contractElPriceTotal, contractFixedFee, aboutFee, addons)`
    ],

    properties: {
        loadingStatus: { type: String },
        api: { type: Object, value: { endpoints: {} } },
        stages: { type: Array },
        about: { type: String },
        aboutFee: { type: Number },
        aboutList: { type: Array },
        selectedAbout: { type: Object },
        usage: { type: Number },
        usageCategory: { type: String },
        usageCategoryList: { type: Array },
        video: { type: String, value: `vatten` },
        postcode: { type: String },
        personalNumber: { type: String },
        customerInfoRequestState: { type: String },
        area: { type: String },
        areaList: { type: Array },
        areaRequestState: { type: String },
        taxType: { type: String },
        contactEmailAddress: { type: String },
        contactPhoneNumber: { type: String },
        addons: { type: Number },
        duration: { type: Number },
        durationList: { type: Array },
        contract: { type: Object },
        contractId: { type: String },
        contractList: { type: Array },
        contractType: { type: String },
        contractTypeList: { type: Array },
        contractFixedFee: { type: Number },
        contractFixedFeeUnit: { type: String },
        contractElPriceTotal: { type: Number },
        contractElPriceUnit: { type: String },
        contractElPriceRaw: { type: Number },
        contractElPriceAddOn: { type: Number },
        contractElPriceVat: { type: Number },
        contractElPriceTax: { type: Number },
        contractStartDateSelected: { type: String },
        contractEndDateSelected: { type: String },
        contractStartDateList: { type: Array },
        contractListFiltedredByType: { type: Array },
        contractListFiltedredByTypeByUsage: { type: Array },
        contractListFiltedredByTypeByUsageByDuration: { type: Array },
        contractListFiltedredByTypeByUsageByDurationByStartDate: { type: Array },
        submitContractRequestState: { type: String },
        resettleStartDatesRequestState: { type: String },
        analyticsEvent: { type: Object },
        proxyProcessEnabled: { type: Boolean, value: true },
        notification: { type: Object },
        resettle: {type: Boolean, value: false},
        resettlePreviousOwner: {type: String, value: null},
        resettleApartmentNumber: {type: String, value: null},
        resettleStartDates: {type: String, value: null},
        meterPoint: {type: String, value: null},
        gridCode: {type: String, value: null},
        namespace: {type: Object, value: null},
        namespaceId: {type: String}
    },



    /**
     * ======================================================================
     * Polymer Lifecycle
     * ======================================================================
     */

    attached() {
        console.timeEnd(`App initialized`);

        this.async(() => {

            let namespaceName = (this.namespaceRouter.namespace) ? this.namespaceRouter.namespace : `privat`;
            let stage = (this.router.stage) ? this.router.stage : `start`;
            this.set(`route.path`, `${namespaceName}/${stage}`);
            this._aboutListRequest(namespaceName);

            typeof this.queryParams.area !== `undefined` && this.set(`area`, this.queryParams.area);
            typeof this.queryParams.taxType !== `undefined` && this.set(`taxType`, this.queryParams.taxType);
            typeof this.queryParams.postcode !== `undefined` && this.set(`postcode`, this.queryParams.postcode);
            typeof this.queryParams.about !== `undefined` && this.set(`about`, this.queryParams.about);
            typeof this.queryParams.usageCategory !== `undefined` && this.set(`usageCategory`, this.queryParams.usageCategory);
            typeof this.queryParams.usage !== `undefined` && this.set(`usage`, this.queryParams.usage);

            this.lazyLoad();

            this.set(`stages`, [
                `start`,
                `ursprung`,
                `forbrukning`,
                `postnummer`,
                `pris`,
                `kunduppgifter`,
                `kontaktuppgifter`,
                `sammanfattning`,
                `tack`
            ]);
        });

    },

    /**
     * ======================================================================
     * LISTENERS
     * ======================================================================
     */

    _onStart() {
        this.set(`router.stage`, `ursprung`);
    },

    _onAbout(event) {
        let aboutType = event.detail.about.type;
        this.set(`about`, aboutType);
        this.set(`video`, aboutType);
        this.router.stage === `ursprung` && this.set(`router.stage`, `forbrukning`);
        this.set(`queryParams.about`, aboutType);
    },

    _onUsageCategory(event) {
        this.set(`usageCategory`, event.detail.usageCategory);
        this.set(`queryParams.usageCategory`, event.detail.usageCategory);
        this.set(`usage`, event.detail.usage);
        this.set(`router.stage`, `postnummer`);
    },

    _onPostcode(event) {
        this._areaRequest(event.detail.postcode);
    },

    _onArea(event) {
        this.router.stage === `postnummer` && this.set(`router.stage`, `pris`);
        this.set(`area`, event.detail.area);
        this.set(`taxType`, this.notConfirmedTaxType);
        this.set(`postcode`, this.notConfirmedPostcode);
        this.set(`queryParams.area`, event.detail.area);
        this.set(`queryParams.postcode`, this.notConfirmedPostcode);
        this.set(`queryParams.taxType`, this.notConfirmedTaxType);
    },

    _onDuration(event) {
        this.set(`duration`, event.detail.duration);
        this.set(`queryParams.duration`, event.detail.duration);
    },

    _onContractStartDateSelection(event) {
        this.set(`contractStartDateSelected`, event.detail.contractStartDateSelected);
        this.set(`queryParams.contractStartDateSelected`, event.detail.contractStartDateSelected);
    },

    _onUsage(event) {
        this.set(`usage`, event.detail.usage);
        let usageCategory = event.detail.usage > 8000 ? `HOUSE` : `APARTMENT`;
        this.set(`usageCategory`, usageCategory);
        this.set(`queryParams.usageCategory`, usageCategory);
        this.set(`queryParams.usage`, event.detail.usage);
    },

    _onContractType(event) {
        this.set(`contractType`, event.detail.contractType);
    },

    _onContractSelection() {
        this.set(`router.stage`, `kunduppgifter`);
    },

    _onPersonalNumber(event) {
        this._customerInfoRequest(event.detail.postcode, event.detail.personalNumber);
    },

    _onElectricityAddress(event) {
        this.electricityAddress = event.detail;
    },

    _onBillingAddress(event) {
        this.billingAddress = event.detail;
    },

    _onCustomerInfoConfirm(event) {
        this.set(`router.stage`, `kontaktuppgifter`);
        this.set(`personalNumber`, event.detail.personalNumber);
    },

    _onContactInfoConfirmed(event) {
        this.contactEmailAddress = event.detail.contactEmailAddress;
        this.contactPhoneNumber = event.detail.contactPhoneNumber;
        this.set(`router.stage`, `sammanfattning`);
    },

    _onSubmitContract(event) {
        this._submitContractRequest(event.detail.contract);
    },

    _onAnalyticsEvent(event) {
        this.set(`analyticsEvent`, event.detail);
    },

    _onResettleEvent(event) {
        this.set(`resettle`, event.detail.resettle);
        this._resettleStartDateRequest(event.detail.resettle);
    },

    _onResettleInfoEvent(event) {
        this.set(`resettlePreviousOwner`, event.detail.previousOwner);
        this.set(`resettleApartmentNumber`, event.detail.apartmentNumber);
    },

    _onProxyProcessEvent(event) {
        this.set(`proxyProcessEnabled`, event.detail.enabled);
        this.set(`meterPoint`, event.detail.meterPoint);
        this.set(`gridCode`, event.detail.gridCode);
    },

    _onNotifyEvent(event) {
        this.set(`notification`, event.detail);
    },

    /**
     * ======================================================================
     * Request and Responses
     * ======================================================================
     */

    _aboutListRequest(namespaceName) {
        this.aboutListRequest = `${CONFIG.API_BASE}/${CONFIG.API_VERSION}/${CONFIG.API_ENDPOINTS_ABOUTLIST}/${namespaceName}`;
    },

    aboutListResponse(data) {
        this.set(`aboutList`, data.detail.response.aboutList);

        this.set(`loadingStatus`, `loaded`);
    },

    aboutListError(data) {
        this.set(`router.stage`, `error`);
        this.error(`aboutListError: ${data.detail.request.parseResponse().error.message}`);
        this.set(`loadingStatus`, `loaded`);
    },

    _areaRequest(postcode) {
        if (postcode === this.notConfirmedPostcode) {
            this.set(`areaRequestState`, `success`);
        } else if (postcode) {
            this.set(`notConfirmedPostcode`, postcode);
            this.areaRequest = `${CONFIG.API_BASE}/${CONFIG.API_VERSION}/${CONFIG.API_ENDPOINTS_AREALIST}/${postcode}`;
            this.set(`areaRequestState`, `indeterminate`);
        } else {
            this.set(`areaRequestState`, `active`);
            this.areaRequest = null;
        }
    },

    areaResponse(data) {
        this.areaRequest = null;
        this.set(`areaList`, data.detail.response.electricityAreas);
        this.set(`notConfirmedTaxType`, data.detail.response.taxType);
        this.set(`areaRequestState`, `success`);
        this.fire(`on-notify-event`, { message: this.localize(`notification.price-based-on-postcode`, `value`, data.detail.response.postalCode)});
    },

    areaError(data) {
        this.areaRequest = null;
        let tempError = data.detail.request.parseResponse().error;
        let tempMessage = JSON.parse(tempError.message);
        let error = {};
        error.code = tempError.code;
        error.locale = tempMessage.errorString;
        error.message = tempMessage;
        this.set(`areaRequestError`, error);
        this.set(`areaRequestState`, `error`);
        this.error(`areaError: ${data.detail.request.parseResponse().error.message}`);
    },

    _contractListRequest(area, taxType, namespaceId) {
        this.contractListRequest = `${CONFIG.API_BASE}/${CONFIG.API_VERSION}/${CONFIG.API_ENDPOINTS_CONTRACTLIST}/${area}/${taxType}/${namespaceId}`;
    },

    contractListResponse(data) {
        this.set(`contractList`, data.detail.response.items);
    },

    contractListError(data) {
        this.set(`router.stage`, `error`);
        this.error(`contractListError: ${data.detail.request.parseResponse().error.message}`);
    },

    _customerInfoRequest(postcode, personalNumber) {
        if(personalNumber && postcode){
            this.set(`customerInfoRequest`, `${CONFIG.API_BASE}/${CONFIG.API_VERSION}/${CONFIG.API_ENDPOINTS_CUSTOMERINFO}/${personalNumber}/${postcode}`);
            this.set(`customerInfoRequestState`, `indeterminate`);
            this.set(`postcodeState`, `indeterminate`);
            this.set(`personalNumberState`, `indeterminate`);
        } else {
            this.set(`customerInfoRequest`, null);
            this.set(`customerInfoRequestState`, `active`);
            this.set(`postcodeState`, `active`);
            this.set(`personalNumberState`, `active`);
            this.set(`customerInfo`, null);
        }
    },

    customerInfoResponse(data) {
        this.set(`postcodeState`, `success`);
        this.set(`personalNumberState`, `success`);
        this.set(`customerInfoRequestState`, `success`);
        this.set(`customerInfo`, data.detail.response);
        this.set(`customerInfoRequestError`, null);
        this.set(`customerInfoRequest`, null);
    },

    customerInfoError(data) {
        let tempError = data.detail.request.parseResponse().error;
        let tempMessage = JSON.parse(tempError.message);
        tempError.code === 200 && this.set(`personalNumberState`, `success`);
        tempError.code === 200 && this.set(`postcodeState`, `success`);
        tempError.code === 400 && this.set(`personalNumberState`, `error`);
        tempError.code === 400 && this.set(`postcodeState`, `success`);
        tempError.code === 404 && this.set(`personalNumberState`, `success`);
        tempError.code === 404 && this.set(`postcodeState`, `success`);
        tempError.code === 412 && this.set(`personalNumberState`, `success`);
        tempError.code === 412 && this.set(`postcodeState`, `error`);
        this.set(`customerInfoRequest`, null);
        this.set(`customerInfoRequestError`, {
            code: tempError.code,
            message: tempMessage,
            locale: tempMessage.errorString,
            success: tempError.code === 200,
            hiddenIdentity: data.detail.request.status === 404,
            mismatched: tempError.code === 412
        });
        this.error(`contractListError: ${data.detail.request.parseResponse().error.message}`);
    },

    _resettleStartDateRequest(resettle) {
        if (resettle) {
            this.set(`resettleStartDatesRequest`, `${CONFIG.API_BASE}/${CONFIG.API_VERSION}/${CONFIG.API_ENDPOINTS_RESETTLE_STARTDATES}`);
            this.set(`resettleStartDatesRequestState`, `indeterminate`);
        } else {
            this.set(`resettleStartDatesRequest`, null);
            this.set(`resettleStartDates`, null);
            this.set(`resettleStartDatesRequestState`, `ready`);
        }
    },

    resettleStartDateResponse(data) {
        this.set(`resettleStartDates`, data.detail.response);
        this.set(`resettleStartDatesRequest`, null);
        this.set(`resettleStartDatesRequestState`, `success`);
    },

    resettleStartDateError(data) {
        this.set(`resettleStartDatesRequest`, null);
        this.set(`resettleStartDatesRequestState`, `error`);
        this.set(`router.stage`, `error`);
        this.error(`resettleStartDateError: ${data.detail.request.parseResponse().error.message}`);
    },

    _submitContractRequest(contract) {
        if (this.submitContractRequestState !== `indeterminate`) {
            this.submitContractBody = contract;
            this.submitContractRequest = `${CONFIG.API_BASE}/${CONFIG.API_VERSION}/${CONFIG.API_ENDPOINTS_SUBMITCONTRACT}`;
            this.set(`submitContractRequestState`, `indeterminate`);
        }
    },

    submitContractResponse() {
        this.set(`router.stage`, `tack`);
        this.set(`queryParams`, {});
        this.set(`submitContractRequestState`, `success`);
    },

    submitContractError(data) {
        this.set(`submitContractRequestState`, `error`);
        this.set(`router.stage`, `error`);
        this.error(`submitContractError: ${data.detail.request.parseResponse().error.message}`);
    },

    /**
     * ======================================================================
     * Observers
     * ======================================================================
     */

    _aboutAndAboutListChanged(aboutType, aboutList) {
        let aboutListFilteredByType = aboutList.filter((about) => {
            return about.type === aboutType;
        });
        this.set(`selectedAbout`, aboutListFilteredByType.length ? aboutListFilteredByType[0] : null);
    },

    _contractListChanged(contractList) {
        this.set(`contractTypeList`, this._createContractTypeList(contractList));
    },

    _createContractDurationList(contractListFiltedredByTypeByUsage) {
        if (typeof contractListFiltedredByTypeByUsage[0].duration !== `undefined`) {
            let durationList = contractListFiltedredByTypeByUsage.map((contract) => {
                return contract.duration;
            });
            this.set(`durationList`, durationList);
            this.set(`duration`, typeof this.queryParams.duration === `undefined` ? durationList[0] : this.queryParams.duration);
        } else {
            this.set(`durationList`, null);
            this.set(`duration`, null);
        }
    },

    _createContractStartDateList(contractListFiltedredByTypeByUsageByDuration) {
        if (contractListFiltedredByTypeByUsageByDuration[0].pricePeriods) {
            let contractStartDateList = contractListFiltedredByTypeByUsageByDuration[0].pricePeriods.filter((pricePeriod) => {
                return pricePeriod.visible;
            });
            this.set(`contractStartDateList`, contractStartDateList);
            this.set(`contractStartDateSelected`, typeof this.queryParams.contractStartDateSelected === `undefined` ? contractStartDateList[0].startDate : this.queryParams.contractStartDateSelected);
        } else {
            this.set(`contractStartDateList`, null);
            this.set(`contractStartDateSelected`, null);
            this.set(`contractEndDateSelected`, null);
            this.error(`_createContractStartDateList: No price periods found on contract`);
        }
    },

    _contractTypeListChanged(contractTypeList) {
        this.set(`contractType`, typeof this.queryParams.contractType === `undefined` ? contractTypeList[0] : this.queryParams.contractType);
    },

    _contractTypeChanged(contractType) {
        this.set(`queryParams.contractType`, contractType);
        let contractListFiltedredByType = this.contractList.filter((contract) => {
            return contract.type === contractType;
        });
        this.set(`contractListFiltedredByType`, contractListFiltedredByType);
    },

    _usageChanged(usage) {
        this.set(`queryParams.usage`, usage);
        this.set(`usage`, usage);
    },

    _usageCategoryAndContractListFiltedredByTypeChanged(usageCategory, contractListFiltedredByType) {
        let contractListFiltedredByTypeByUsage = contractListFiltedredByType.filter((contract) => {
            return contract.area === usageCategory;
        });
        this.set(`contractListFiltedredByTypeByUsage`, contractListFiltedredByTypeByUsage);
    },

    _contractStartDateSelectedAndContractListFiltedredByTypeByUsageByDurationChanged(contractStartDateSelected, contractListFiltedredByTypeByUsageByDuration) {
        let contractListFiltedredByTypeByUsageByDurationByStartDate = contractListFiltedredByTypeByUsageByDuration;
        let matchingPricePeriods = [];

        if (typeof contractListFiltedredByTypeByUsageByDuration[0].pricePeriods !== `undefined`) {

            // filter matching periods based on exact match of date
            matchingPricePeriods = contractListFiltedredByTypeByUsageByDuration[0].pricePeriods.filter((contract) => {
                return contract.startDate === contractStartDateSelected;
            });

            // if a matching period found use pricePeriod.contractEndDate as contractEndDateSelected
            if (matchingPricePeriods.length === 1) {
                this.set(`contractEndDateSelected`, (typeof matchingPricePeriods[0].contractEndDate === `undefined`) ? null : matchingPricePeriods[0].contractEndDate);
            } else {
                // if NOT a matching period found - filter pricePeriods by year and month
                const startDateSelected = new Date(contractStartDateSelected);
                matchingPricePeriods = contractListFiltedredByTypeByUsageByDuration[0].pricePeriods.filter((contract) => {
                    const contractStartDate = new Date(contract.startDate);
                    return contractStartDate.getFullYear() === startDateSelected.getFullYear() && contractStartDate.getMonth() === startDateSelected.getMonth();
                });
                // use pricePeriod.alternativeContractEndDate as contractEndDateSelected
                this.set(`contractEndDateSelected`, (typeof matchingPricePeriods[0].alternativeContractEndDate) === `undefined` ? null : matchingPricePeriods[0].alternativeContractEndDate);
            }
        } else {
            this.error(`_contractStartDateSelectedAndContractListFiltedredByTypeByUsageByDurationChanged: No price periods found on contract`);
        }

        if (matchingPricePeriods.length === 1) {
            contractListFiltedredByTypeByUsageByDurationByStartDate[0].price = matchingPricePeriods[0].price;
            this.set(`contractListFiltedredByTypeByUsageByDurationByStartDate`, contractListFiltedredByTypeByUsageByDurationByStartDate);
            this._createNewContract(contractListFiltedredByTypeByUsageByDurationByStartDate);
        } else {
            this.error(`_contractStartDateSelectedAndContractListFiltedredByTypeByUsageByDurationChanged: Could not find a matchingPricePeriod`);
        }
    },

    _durationChanged(duration) {
        this.set(`queryParams.duration`, duration);
    },

    _contractStartDateSelectionChanged(contractStartDateSelected) {
        this.set(`queryParams.contractStartDateSelected`, contractStartDateSelected);
    },

    _durationAndContractListFiltedredByTypeByUsageChanged(duration, contractListFiltedredByTypeByUsage) {
        let contractListFiltedredByTypeByUsageByDuration = contractListFiltedredByTypeByUsage.filter((contract) => {
            return typeof contract.duration === `undefined` || contract.duration == duration;
        });
        this.set(`contractListFiltedredByTypeByUsageByDuration`, contractListFiltedredByTypeByUsageByDuration);
    },

    _calculateAboutFee(aboutType, aboutList) {
        let about = aboutList.filter((about) => {
            return about.type === aboutType;
        });
        this.set(`aboutFee`, about[0].price);
    },

    _calculateMonthlyCost(usage, contractElPriceTotal, contractFixedFee, aboutFee, addons) {
        let monthlyCost = ((usage * contractElPriceTotal) / (12 * 100)) + contractFixedFee + aboutFee + addons;
        let elUnitPriceComparisonList = [
            {
                usage: 2000,
                unitPrice: null
            },
            {
                usage: 5000,
                unitPrice: null
            },
            {
                usage: 20000,
                unitPrice: null
            }
        ];
        let elUnit = this.localize(`unit.currency.swedishOrePerKwh`);
        let elUnitPrice = this._calculateElUnitPrice(monthlyCost, usage);
        this.set(`elUnitPriceComparisonList`, elUnitPriceComparisonList);
        this.set(`elUnit`, elUnit);

        elUnitPriceComparisonList.map((elUnitPriceComparison) => {
            elUnitPriceComparison.unitPrice = this._newElectricityPrice(elUnitPriceComparison.usage, contractElPriceTotal, contractFixedFee, aboutFee, addons);
        });

        this.set(`elUnitPrice`, elUnitPrice);
        this.set(`monthlyCost`, monthlyCost);
    },

    /**
     * ======================================================================
     * Methods Expressions & Declarations
     * ======================================================================
     */

    goBack() {
        let currentStageIndex = this.stages.indexOf(this.router.stage);
        let previousStage = this.stages[currentStageIndex - 1];
        this.set(`router.stage`, typeof previousStage === `undefined` ? this.stages[0] : previousStage);
    },

    _createNewContract(contractListFiltedredByTypeByUsageByDurationByStartDate) {
        let contract = contractListFiltedredByTypeByUsageByDurationByStartDate[0];

        this.set(`contract`, contract);
        this.set(`contractId`, contract.id);
        this.set(`contractFixedFee`, contract.price.feeInclVat);
        this.set(`contractFixedFeeUnit`, contract.price.feeUnit);
        this.set(`contractElPriceTotal`, contract.price.total);
        this.set(`contractElPriceUnit`, contract.price.unit);
        this.set(`contractElPriceRaw`, contract.price.raw);
        this.set(`contractElPriceAddOn`, contract.price.addOn);
        this.set(`contractElPriceVat`, contract.price.vat);
        this.set(`contractElPriceTax`, contract.price.tax);
        this.set(`productAddOnList`, contract.products);
        this._calculateAddons(contract);
    },

    _calculateAddons(contract) {
        if (typeof contract.products !== `undefined`) {
            let addon = contract.products.filter((product) => {
                return product.required && product;
            }).map((product) => {
                if (typeof product.duration !== `undefined` && typeof contract.duration !== `undefined`) {
                    let productDuration = (product.duration > contract.duration) ? contract.duration : product.duration;
                    return product.priceInclVat * (productDuration / contract.duration);
                }
                return product.priceInclVat;
            }).reduce((prev, curr) => {
                return prev + curr;
            });
            this.set(`addons`, addon);
        } else {
            this.set(`addons`, null);
        }
    },

    _electricityExpenditures(electricityConsumption, electricityPrice, subunit = 100) {
        let electricityExpenditures = electricityConsumption * electricityPrice / subunit;
        return electricityExpenditures;
    },

    _electricityExpenses(subscriptionFee, aboutFee, productsAddOn, yearLength = 12) {
        let electricityExpenses = (subscriptionFee + aboutFee + productsAddOn) * yearLength;
        return electricityExpenses;
    },

    _totalCostsOfElectricityPerYear(electricityExpenditures, electricityExpenses) {
        let totalCostsOfElectricityPerYear = electricityExpenditures + electricityExpenses;
        return totalCostsOfElectricityPerYear;
    },

    _averageElectricityPrice(totalCostsOfElectricityPerYear, electricityConsumption, subunit = 100) {
        let averageElectricityPrice = totalCostsOfElectricityPerYear / electricityConsumption * subunit;
        return averageElectricityPrice;
    },

    _newElectricityPrice(usage, contractElPriceTotal, contractFixedFee, aboutFee, addons) {
        let electricityExpenditures = this._electricityExpenditures(usage, contractElPriceTotal);
        let electricityExpenses = this._electricityExpenses(contractFixedFee, aboutFee, addons);
        let totalCostsOfElectricityPerYear = this._totalCostsOfElectricityPerYear(electricityExpenditures, electricityExpenses);
        let averageElectricityPrice = this._averageElectricityPrice(totalCostsOfElectricityPerYear, usage);
        return averageElectricityPrice;
    },

    _createContractTypeList() {
        return [`VARIABLE`, `FIXED`];
    },

    _calculateElUnitPrice(monthlyCost, usage) {
        return (monthlyCost * 12 * 100) / usage;
    },

    lazyLoad() {
        Polymer.RenderStatus.afterNextRender(this, function() {
            this.importHref(`/shared/lazy/lazy.html`, function() {
                this.debug(`Lazy elements loaded`);
            });
        });
    }

});