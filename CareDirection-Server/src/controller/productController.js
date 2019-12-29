const Joi = require('@hapi/joi')
const productService = require('../service/productService')
const response = require('../lib/response')
const message = require('../lib/responseMessage')
const statusCode = require('../lib/statusCode')

exports.importDose = async (req, res, next) => {
  const { product_idx } = req.params
  try {
    const result = await productService.importDose(req, next)
    response.respondJson('successfully ', result, res, 200)
  } catch (e) {
    response.respondOnError(e.message, res, 500)
  }
}


exports.enrollDose = async (req, res, next) => {
  const { dose_daily_quantity, dose_start_date } = req.body
  const { product_idx } = req.params
  const validationData = { dose_daily_quantity, dose_start_date }
  const scheme = Joi.object({
    dose_daily_quantity: Joi.number().required(),
    dose_start_date: Joi.string().required(),
  })

  try {
    // 입력 값의 유효성 확인 (not null, 유효한 형태)
    const { error } = await scheme.validateAsync(validationData)
    // 유효하지 않은 경우
    if (error) {
      throw new Error(403)
    }
    const result = await productService.enrollDose(req, next)
    response.respondJson('successfully ', result, res, 200)
  } catch (e) {
    response.respondOnError(e.message, res, 500)
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
    product_quantity_count: Joi.number().required(),
    product_quantity_price: Joi.number().required(),
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

  try {
    const { error } = await schema.validateAsync(validationData)

    if (error) {
      response.respondOnError(message.NULL_VALUE, res, statusCode.FORBIDDEN)
    }
    const result = await productService.checkProductDose(req, next)
    if (result === message.SUCCESS) {
      response.respondJsonWithoutData(message.PRODUCT_DOSE_INSERT_SUCCESS, res, statusCode.CREATED)
    } else {
      response.respondJsonWithoutData(message.PRODUCT_DOSE_INSERT_DUPLICATED, res, statusCode.FORBIDDEN)
    }
  } catch (e) {
    response.respondOnError(message.INTERNAL_SERVER_ERROR, res, statusCode.INTERNAL_SERVER_ERROR)
  }
}
