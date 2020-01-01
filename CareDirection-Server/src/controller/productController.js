const Joi = require('@hapi/joi')
const productService = require('../service/productService')
const response = require('../lib/response')
const message = require('../lib/responseMessage')
const statusCode = require('../lib/statusCode')

exports.importDose = async (req, res, next) => {
  const { product_idx } = req.params
  try {
    const result = await productService.importDose(req, next)
    response.respondJson(message.SELECT_SUCCESS, result, res, statusCode.CREATED)
  } catch (e) {
    response.respondOnError(message.INTERNAL_SERVER_ERROR, res, statusCode.INTERNAL_SERVER_ERROR)
  }
}

exports.enrollDose = async (req, res, next) => {
  const { dose_daily_quantity, dose_start_date, dose_alarm } = req.body
  const { product_idx } = req.params
  const validationData = { dose_daily_quantity, dose_start_date, dose_alarm }
  const scheme = Joi.object({
    dose_daily_quantity: Joi.number().required(),
    dose_start_date: Joi.string().required(),
    dose_alarm: Joi.string().required(),
  })

  try {
    const { error } = await scheme.validateAsync(validationData)
    if (error) {
      response.respondOnError(message.NULL_VALUE, res, statusCode.FORBIDDEN)
    }
    const result = await productService.enrollDose(req, next)
    // eslint-disable-next-line eqeqeq
    if (result == message.DUPLICATED) {
      response.respondJsonWithoutData(message.DUPLICATED, res, statusCode.FORBIDDEN)
    } else response.respondJsonWithoutData(message.PRODUCT_DOSE_INSERT_SUCCESS, res, statusCode.CREATED)
  } catch (e) {
    response.respondOnError(message.INTERNAL_SERVER_ERROR, res, statusCode.INTERNAL_SERVER_ERROR)
  }
}

exports.modifyDose = async (req, res, next) => {
  const { dose_daily_quantity, dose_start_date, dose_alarm } = req.body
  const { product_idx } = req.params
  const validationData = { dose_daily_quantity, dose_start_date, dose_alarm }
  const scheme = Joi.object({
    dose_daily_quantity: Joi.number().required(),
    dose_start_date: Joi.string().required(),
    dose_alarm: Joi.string().required(),
  })

  try {
    const { error } = await scheme.validateAsync(validationData)
    if (error) {
      response.respondOnError(message.NULL_VALUE, res, statusCode.FORBIDDEN)
    }
    await productService.modifyDose(req, next)
    response.respondJsonWithoutData(message.PRODUCT_DOSE_MODIFY_SUCCESS, res, statusCode.CREATED)
  } catch (e) {
    response.respondOnError(message.INTERNAL_SERVER_ERROR, res, statusCode.INTERNAL_SERVER_ERROR)
  }
}


exports.insertProduct = async (req, res, next) => {
  const {
    filter_category_idx,
    main_nutrient_name,
    product_name,
    product_cautions,
    product_package_type,
    product_company_name,
    product_is_import,
    product_daily_dose,
    product_additives,
    product_standard1,
    product_standard2,
    product_standard3,
    product_standard1_value,
    product_standard2_value,
    product_standard3_value,
    product_standard1_description,
    product_standard2_description,
    product_standard3_description,
    product_detail_name,
    product_detail_value,
    product_detail_child_name,
    product_detail_child_value,
    product_quantity_count,
    product_quantity_price,
    product_features_name,
    product_has_nutrients,
  } = req.body

  const validationData = {
    filter_category_idx,
    main_nutrient_name,
    product_name,
    product_cautions,
    product_package_type,
    product_company_name,
    product_is_import,
    product_daily_dose,
    product_additives,
    product_standard1,
    product_standard2,
    product_standard3,
    product_standard1_value,
    product_standard2_value,
    product_standard3_value,
    product_standard1_description,
    product_standard2_description,
    product_standard3_description,
    product_detail_name,
    product_detail_value,
    product_detail_child_name,
    product_detail_child_value,
    product_quantity_count,
    product_quantity_price,
    product_features_name,
    product_has_nutrients,
  }

  const schema = Joi.object({
    filter_category_idx: Joi.number().required(),
    main_nutrient_name: Joi.string().required(),
    product_name: Joi.string().required(),
    product_cautions: Joi.string().required(),
    product_package_type: Joi.number().required(),
    product_company_name: Joi.string().required(),
    product_is_import: Joi.number().required(),
    product_daily_dose: Joi.string().required(),
    product_additives: Joi.string().required(),
    product_standard1: Joi.string().required(),
    product_standard2: Joi.string().required(),
    product_standard3: Joi.string().required(),
    product_standard1_value: Joi.string().required(),
    product_standard2_value: Joi.string().required(),
    product_standard3_value: Joi.string().required(),
    product_standard1_description: Joi.string().required(),
    product_standard2_description: Joi.string().required(),
    product_standard3_description: Joi.string().required(),
    product_detail_name: Joi.string().required(),
    product_detail_value: Joi.string().required(),
    product_detail_child_name: Joi.string().required(),
    product_detail_child_value: Joi.string().required(),
    product_quantity_count: Joi.string().required(),
    product_quantity_price: Joi.string().required(),
    product_features_name: Joi.string().required(),
    product_has_nutrients: Joi.string().required(),
  })

  try {
    const { error } = await schema.validateAsync(validationData)
    if (error) {
      response.respondOnError(message.NULL_VALUE, res, statusCode.FORBIDDEN)
    }
    validationData.file = req.file
    await productService.insertProduct(next, validationData)
    response.respondJsonWithoutData(message.PRODUCT_INSERT_SUCCESS, res, statusCode.CREATED)
  } catch (e) {
    response.respondOnError(e.message, res, statusCode.INTERNAL_SERVER_ERROR)
  }
}

exports.checkProductDose = async (req, res, next) => {
  const { product_idx } = req.params
  const validationData = { product_idx }
  const schema = Joi.object({
    product_idx: Joi.number().required(),
  })
  let result
  try {
    const { error } = await schema.validateAsync(validationData)

    if (error) {
      response.respondOnError(message.NULL_VALUE, res, statusCode.FORBIDDEN)
    }
    if (req.user.type === 'parent') {
      result = await productService.checkParentUserProductDose(req, next)
    } else {
      result = await productService.checkChildUserProductDose(req, next)
    }
    if (result === message.SUCCESS) {
      response.respondJsonWithoutData(message.PRODUCT_DOSE_INSERT_SUCCESS, res, statusCode.CREATED)
    } else {
      response.respondJsonWithoutData(message.PRODUCT_DOSE_INSERT_DUPLICATED, res, statusCode.FORBIDDEN)
    }
  } catch (e) {
    response.respondOnError(message.INTERNAL_SERVER_ERROR, res, statusCode.INTERNAL_SERVER_ERROR)
  }
}

exports.unCheckProductDose = async (req, res, next) => {
  const { product_idx } = req.params
  const validationData = { product_idx }
  const schema = Joi.object({
    product_idx: Joi.number().required(),
  })
  try {
    const { error } = await schema.validateAsync(validationData)

    if (error) {
      response.respondOnError(message.NULL_VALUE, res, statusCode.FORBIDDEN)
    }
    if (req.user.type === 'parent') {
      await productService.uncheckParentUserProductDose(req, next)
    } else {
      await productService.uncheckChildUserProductDose(req, next)
    }
    response.respondJsonWithoutData(message.PRODUCT_DOSE_DELETE_SUCCESS, res, statusCode.OK)
  } catch (e) {
    response.respondOnError(message.INTERNAL_SERVER_ERROR, res, statusCode.INTERNAL_SERVER_ERROR)
  }
}

exports.getProductStandard = async (req, res) => {
  const { product_idx } = req.params
  const validationData = { product_idx }
  const schema = Joi.object({
    product_idx: Joi.number().integer().required(),
  })

  try {
    const { error } = await schema.validateAsync(validationData)
    if (error) {
      response.respondOnError(message.NULL_VALUE, res, statusCode.FORBIDDEN)
    }
    const productStandard = await productService.getProductStandard(req)
    response.respondJson(message.SELECT_SUCCESS, productStandard, res, statusCode.OK)
  } catch (e) {
    console.log(e.message)
    response.respondOnError(e.message, res, statusCode.DB_ERROR)
  }
}


exports.deleteDoseProduct = async (req, res) => {
  const { product_idx } = req.params
  const validationData = { product_idx }
  const schema = Joi.object({
    product_idx: Joi.number().required(),
  })
  try {
    const { error } = await schema.validateAsync(validationData)
    if (error) {
      response.respondOnError(message.NULL_VALUE, res, statusCode.FORBIDDEN)
    }
    await productService.deleteDoseProduct(req)
    response.respondJsonWithoutData(message.DOSE_PRODUCT_DELETE_SUCCESS, res, statusCode.OK)
  } catch (e) {
    console.log(e.message)
    response.respondOnError(e.message, res, statusCode.DB_ERROR)
  }
}

exports.getProductDetailInfo = async (req, res, next) => {
  const { product_idx } = req.params
  try {
    const result = await productService.getProductDetailInfo(req, next)
    response.respondJson(message.GET_PRODUCT_DETAIL_INFO_SUCCESS, result, res, statusCode.OK)
  } catch (e) {
    response.respondOnError(message.INTERNAL_SERVER_ERROR, res, statusCode.INTERNAL_SERVER_ERROR)
  }
}

exports.getLowprice = async (req, res, next) => {
  const { product_idx } = req.params
  try {
    const result = await productService.getLowprice(req, next)
    response.respondJson(message.LOWEST_PRICE_SUCCESS, result, res, statusCode.CREATED)
  } catch (e) {
    response.respondOnError(message.INTERNAL_SERVER_ERROR, res, statusCode.INTERNAL_SERVER_ERROR)
  }
}

exports.getProductDetailEfficacy = async (req, res, next) => {
  const { product_idx } = req.params
  try {
    const result = await productService.getProductDetailEfficacy(req, next)
    response.respondJson(message.GET_PRODUCT_DETAIL_EFFICACY_SUCCESS, result, res, statusCode.OK)
  } catch (e) {
    response.respondOnError(message.INTERNAL_SERVER_ERROR, res, statusCode.INTERNAL_SERVER_ERROR)
  }
}

exports.getTabList = async (req, res, next) => {
  try {
    const result = await productService.getTabList(req, next)
    response.respondJson(message.USER_CUSTOM_PRODUCT_TABLIST, result, res, statusCode.OK)
  } catch (e) {
    response.respondOnError(message.INTERNAL_SERVER_ERROR, res, statusCode.INTERNAL_SERVER_ERROR)
  }
}

exports.getDoseinfoPopup = async (req, res, next) => {
  const { product_idx } = req.params
  try {
    const result = await productService.getDoseinfoPopup(req, next)
    response.respondJson(message.DOSE_PRODUCT_POPUP_SUCCESS, result, res, statusCode.OK)
  } catch (e) {
    response.respondOnError(message.INTERNAL_SERVER_ERROR, res, statusCode.INTERNAL_SERVER_ERROR)
  }
}

exports.getCurrentDoseProducts = async (req, res) => {
  const validationChecker = Joi.object({
    // date: Joi.date().format('iso').options({ convert: false }).required(),
    date: Joi.string().required(),
  })
  try {
    const { error } = await validationChecker.validateAsync(req.query)
    if (error) {
      response.respondOnError(error.message, res, statusCode.BAD_REQUEST)
    }
    const result = await productService.getCurrentDoseProducts(req)
    response.respondJson(message.SELECT_SUCCESS, result, res, statusCode.OK)
  } catch (e) {
    console.error(e.message)
    response.respondOnError(message.INTERNAL_SERVER_ERROR, res, statusCode.INTERNAL_SERVER_ERROR)
  }
}
