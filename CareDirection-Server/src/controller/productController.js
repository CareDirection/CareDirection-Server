const Joi = require('@hapi/joi')
const productService = require('../service/productService')
const response = require('../lib/response')


// 사용자가 최초로 채팅방에 들어올 때 키보드 영역에 표시될 자동 응답 명령어 목록 호출
exports.dose = async (req, res, next) => {
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
    //
    const result = await productService.dose(req, next)
    response.respondJson('successfully ', result, res, 200)
  } catch (e) {
    response.respondOnError(e.message, res, 500)
  }
}
